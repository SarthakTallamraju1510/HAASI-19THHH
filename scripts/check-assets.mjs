/**
 * Checks that every asset referenced by content.js and index.html exists.
 *
 *   npm run check
 *
 * Run this after swapping placeholders for real photos or videos — it catches
 * typos in file names before Haasini ever opens the page.
 */

import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { content } from "../assets/js/content.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const referenced = new Set();
const stillPending = [];

function walk(value) {
  if (typeof value === "string") {
    if (/^assets\//.test(value)) referenced.add(value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach(walk);
    return;
  }

  if (value && typeof value === "object") {
    if (value.placeholder === true && value.src) stillPending.push(value.src);
    Object.values(value).forEach(walk);
  }
}

walk(content);

// Anything marked `placeholder: true` (a video, the song) is expected to be
// absent — it is listed separately below instead of counting as a broken path.
for (const src of stillPending) referenced.delete(src);

const html = await readFile(resolve(root, "index.html"), "utf8");
for (const match of html.matchAll(/(?:href|src)="(assets\/[^"]+)"/g)) {
  referenced.add(match[1]);
}

const missing = [];

for (const path of [...referenced].sort()) {
  try {
    await access(resolve(root, path));
  } catch {
    missing.push(path);
  }
}

console.log(`Checked ${referenced.size} asset paths.`);

if (stillPending.length) {
  console.log(
    `Still marked as placeholders (add the file, then delete placeholder: true):`
  );
  stillPending.forEach((src) => console.log(`  · ${src}`));
}

if (missing.length) {
  console.error(`\nMissing ${missing.length} file(s):`);
  missing.forEach((path) => console.error(`  ✗ ${path}`));
  process.exitCode = 1;
} else {
  console.log("Every referenced file exists. ♡");
}
