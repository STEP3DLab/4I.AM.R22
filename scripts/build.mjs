import { mkdir, readdir, stat, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { generateSitemap } from './generate-sitemap.mjs';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

async function copyDirRecursive(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDirRecursive(srcPath, destPath);
      } else if (entry.isFile()) {
        await mkdir(path.dirname(destPath), { recursive: true });
        await copyFile(srcPath, destPath);
      }
    }),
  );
}

async function copyIfExists(relativePath, options = {}) {
  const { destination = path.join(distDir, relativePath) } = options;
  const src = path.join(rootDir, relativePath);
  try {
    const stats = await stat(src);
    if (stats.isDirectory()) {
      await copyDirRecursive(src, destination);
    } else if (stats.isFile()) {
      await mkdir(path.dirname(destination), { recursive: true });
      await copyFile(src, destination);
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: rootDir, stdio: 'inherit' });
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
      }
    });
    child.on('error', reject);
  });
}

async function build() {
  console.info('[build] generating sitemap...');
  await generateSitemap({ outputDir: path.join(rootDir, 'public') });

  console.info('[build] running Vite bundler...');
  await runCommand(npmCommand, ['exec', 'vite', 'build']);

  console.info('[build] copying static assets...');
  const assetsToCopy = [
    { source: 'assets', destination: path.join(distDir, 'assets') },
    { source: 'images', destination: path.join(distDir, 'images') },
    { source: 'public', destination: distDir },
  ];
  for (const asset of assetsToCopy) {
    await copyIfExists(asset.source, { destination: asset.destination });
  }

  console.info('[build] completed successfully');
}

build().catch((error) => {
  console.error('[build] failed', error);
  process.exitCode = 1;
});
