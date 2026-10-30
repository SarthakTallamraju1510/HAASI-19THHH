/**
 * Local preview server — no dependencies, no build step.
 *
 *   npm start            → http://127.0.0.1:4173
 *   node scripts/serve.mjs 5000
 */

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const port = Number(process.argv[2] || process.env.PORT || 4173);
const host = "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4",
  ".aac": "audio/aac",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);
  let pathname;

  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad request");
    return;
  }

  if (pathname.endsWith("/")) pathname += "index.html";

  const filePath = resolve(join(root, normalize(pathname)));
  const insideRoot = filePath === root || filePath.startsWith(root + sep);

  if (!insideRoot) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    const type = types[extname(filePath).toLowerCase()] || "application/octet-stream";
    const total = body.length;

    // Byte ranges, so audio and video can stream and seek instead of being
    // pulled down whole on every loop.
    const range = request.headers.range;
    const match = range && /^bytes=(\d*)-(\d*)$/.exec(String(range).trim());

    if (match) {
      let start = match[1] === "" ? null : Number(match[1]);
      let end = match[2] === "" ? null : Number(match[2]);

      if (start === null && end !== null) {
        start = Math.max(0, total - end);
        end = total - 1;
      } else {
        start = start ?? 0;
        end = end === null ? total - 1 : Math.min(end, total - 1);
      }

      if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= total) {
        response.writeHead(416, { "Content-Range": `bytes */${total}` });
        response.end();
        return;
      }

      const chunk = body.subarray(start, end + 1);
      response.writeHead(206, {
        "Content-Type": type,
        "Content-Length": chunk.length,
        "Content-Range": `bytes ${start}-${end}/${total}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-cache",
      });

      if (request.method === "HEAD") response.end();
      else response.end(chunk);
      return;
    }

    response.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": "no-cache",
      "Content-Length": total,
      "Accept-Ranges": "bytes",
    });

    if (request.method === "HEAD") response.end();
    else response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, host, () => {
  console.log(`Haasini's birthday scrapbook → http://${host}:${port}`);
});
