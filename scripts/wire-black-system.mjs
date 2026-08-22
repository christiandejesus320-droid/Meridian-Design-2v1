import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url);
const files = (await readdir(root)).filter((file) => file.endsWith('.html'));
const stylesheet = '<link rel="stylesheet" href="meridian-system.css?black-system-v2">';

for (const file of files) {
  const path = join(root.pathname, file);
  const source = await readFile(path, 'utf8');
  if (source.includes('meridian-system.css?black-system-v2')) continue;
  if (!source.includes('</head>')) continue;
  const updated = source.replace('</head>', `${stylesheet}</head>`);
  await writeFile(path, updated);
}

console.log(`Wired Meridian Black System into ${files.length} HTML routes.`);
