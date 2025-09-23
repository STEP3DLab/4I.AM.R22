import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function createMatchMediaStub() {
  const listeners = new Set();
  return Object.assign(
    (query) => ({
      matches: false,
      media: query,
      addEventListener: (_, cb) => {
        if (typeof cb === 'function') listeners.add(cb);
      },
      removeEventListener: (_, cb) => {
        listeners.delete(cb);
      },
      addListener: (cb) => {
        if (typeof cb === 'function') listeners.add(cb);
      },
      removeListener: (cb) => {
        listeners.delete(cb);
      },
      dispatch: (event = { matches: false }) => {
        listeners.forEach((cb) => {
          try {
            cb(event);
          } catch (error) {
            console.error('[prebuild] matchMedia listener failed', error);
          }
        });
      },
    }),
    { listeners },
  );
}

function createImageStub() {
  return class ImageStub {
    constructor() {
      this.onload = null;
      this.onerror = null;
    }

    set src(value) {
      this._src = value;
      queueMicrotask(() => {
        if (typeof this.onload === 'function') {
          this.onload();
        }
      });
    }

    get src() {
      return this._src;
    }
  };
}

async function readJsonFromProject(relative) {
  const clean = relative.replace(/^[./]+/, '').split('?')[0];
  const abs = path.resolve(rootDir, clean);
  const buf = await readFile(abs);
  return JSON.parse(buf.toString());
}

export async function prebuildHtml({ input = 'index.html', output = 'dist/index.html' } = {}) {
  const sourcePath = path.resolve(rootDir, input);
  const html = await readFile(sourcePath, 'utf8');
  const dom = new JSDOM(html, {
    url: 'https://example.com/',
    pretendToBeVisual: true,
    runScripts: 'outside-only',
  });
  const { window } = dom;
  const { document } = window;

  document.documentElement.setAttribute('data-prerendered', 'true');

  Object.assign(window, {
    scrollTo: () => {},
    requestAnimationFrame: (cb) => setTimeout(() => cb(Date.now()), 0),
    cancelAnimationFrame: (id) => clearTimeout(id),
  });
  window.setInterval = (fn, _delay, ...args) => {
    queueMicrotask(() => {
      try {
        fn(...args);
      } catch (error) {
        console.error('[prebuild] setInterval callback failed', error);
      }
    });
    return 0;
  };
  window.clearInterval = () => {};
  const matchMediaStub = createMatchMediaStub();
  window.matchMedia = matchMediaStub;

  global.window = window;
  global.document = document;
  global.navigator = window.navigator;
  global.HTMLElement = window.HTMLElement;
  global.HTMLFormElement = window.HTMLFormElement;
  global.HTMLButtonElement = window.HTMLButtonElement;
  global.Image = createImageStub();
  const storage = new Map();
  const storageApi = {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key),
    clear: () => storage.clear(),
  };
  global.localStorage = storageApi;
  Object.defineProperty(window, 'localStorage', { value: storageApi });
  global.requestAnimationFrame = window.requestAnimationFrame.bind(window);
  global.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
  global.setInterval = window.setInterval.bind(window);
  global.clearInterval = window.clearInterval.bind(window);
  global.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  global.IS_SSR = true;
  global.fetch = async (url) => {
    try {
      const data = await readJsonFromProject(String(url));
      return {
        ok: true,
        status: 200,
        json: async () => data,
      };
    } catch (error) {
      return {
        ok: false,
        status: 404,
        json: async () => {
          throw error;
        },
      };
    }
  };

  const entry = path.resolve(rootDir, 'src/main.js');
  await import(pathToFileURL(entry));
  await new Promise((resolve) => setTimeout(resolve, 200));

  const outputPath = path.resolve(rootDir, output);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, dom.serialize(), 'utf8');
}

const cliEntry = process.argv[1];
if (cliEntry) {
  const entryUrl = pathToFileURL(cliEntry).href;
  if (import.meta.url === entryUrl) {
    prebuildHtml().catch((error) => {
      console.error('[prebuild] failed', error);
      process.exitCode = 1;
    });
  }
}
