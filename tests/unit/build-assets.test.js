import { beforeAll, describe, expect, it } from 'vitest';
import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');

beforeAll(async () => {
  await execFileAsync('node', ['scripts/build.mjs'], { cwd: rootDir });
});

describe('build assets', () => {
  it('copies accessibility stylesheet to dist', async () => {
    const filePath = path.join(rootDir, 'dist/assets/css/a11y.css');
    await expect(access(filePath)).resolves.toBeUndefined();
  });
});
