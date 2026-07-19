import { copyFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = "dist";
const publicFiles = [
  "index.html",
  ".nojekyll",
  "meridian-system.css",
  "meridian-system.js",
  "ecosystem.html",
  "planes.html",
  "contacto.html",
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of publicFiles) {
  await copyFile(file, join(outputDirectory, file));
}

console.log(`Netlify bundle ready: ${publicFiles.length} public files copied without modifying index.html.`);

