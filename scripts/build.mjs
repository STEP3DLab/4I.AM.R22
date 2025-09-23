import { mkdir, rm, stat, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { validateContent } from '../src/utils/content.js';
import { generateSitemap } from './generate-sitemap.mjs';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else if (entry.isFile()) {
        await copyFile(srcPath, destPath);
      }
    }),
  );
}

async function copyIfExists(relativePath) {
  const src = path.join(rootDir, relativePath);
  try {
    const stats = await stat(src);
    if (stats.isDirectory()) {
      if (relativePath === 'public') {
        const entries = await readdir(src, { withFileTypes: true });
        await Promise.all(
          entries.map(async (entry) => {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(distDir, entry.name);
            if (entry.isDirectory()) {
              await copyDir(srcPath, destPath);
            } else if (entry.isFile()) {
              await mkdir(path.dirname(destPath), { recursive: true });
              await copyFile(srcPath, destPath);
            }
          }),
        );
      } else {
        await copyDir(src, path.join(distDir, relativePath));
      }
    } else if (stats.isFile()) {
      await mkdir(path.dirname(path.join(distDir, relativePath)), { recursive: true });
      await copyFile(src, path.join(distDir, relativePath));
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function build() {
  validateContent();
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  await generateSitemap();
  const assetsToCopy = ['index.html', 'src', 'images', 'public', 'assets'];
  for (const asset of assetsToCopy) {
    await copyIfExists(asset);
  }
  console.info('[build] static assets prepared in dist');
}

build().catch((error) => {
  console.error('[build] failed', error);
  process.exitCode = 1;
});
