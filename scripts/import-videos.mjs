/**
 * Turns the raw video messages into web-sized files.
 *
 *   node scripts/import-videos.mjs ["D:/Haasini Birthday/VIDEOS"]
 *
 * Every file in that folder is named after the person who sent it, so the file
 * name becomes the id used everywhere else. Each clip is re-encoded down to
 * something a phone can stream (H.264, max 960px on the long edge, faststart so
 * playback starts before the file finishes downloading), and a poster frame is
 * pulled out for the Polaroid that holds it.
 *
 * Re-run it whenever a new video lands in the folder: files already imported are
 * skipped unless you pass --force.
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const SOURCE =
  process.argv[2] && !process.argv[2].startsWith("--")
    ? process.argv[2]
    : "D:/Haasini Birthday/VIDEOS";

const FORCE = process.argv.includes("--force");

const LOCAL_FFMPEG = ".freebuff/tools/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe";
const FFMPEG =
  process.env.FFMPEG || (fs.existsSync(LOCAL_FFMPEG) ? LOCAL_FFMPEG : "ffmpeg");

try {
  execFileSync(FFMPEG, ["-version"], { stdio: "ignore" });
} catch {
  console.error(
    "\nffmpeg not found.\n\n" +
      "Either put ffmpeg on your PATH, or point the script at it:\n" +
      "  FFMPEG=C:/path/to/ffmpeg.exe node scripts/import-videos.mjs\n"
  );
  process.exit(1);
}

const VIDEO_DIR = "assets/videos";
const POSTER_DIR = "assets/images/decor/video-posters";
const MANIFEST = ".freebuff/video-manifest.json";

const VIDEO_EXT = new Set([".mp4", ".mov", ".m4v", ".webm"]);

fs.mkdirSync(VIDEO_DIR, { recursive: true });
fs.mkdirSync(POSTER_DIR, { recursive: true });

function probe(file) {
  // The essentials build ships without ffprobe, so read ffmpeg's banner instead.
  let banner = "";
  try {
    execFileSync(FFMPEG, ["-hide_banner", "-i", file], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    banner = String(error.stderr || "");
  }

  const duration = /Duration:\s*(\d+):(\d+):(\d+\.\d+)/.exec(banner);
  const video = /Stream #0:\d+.*?: Video: (\w+).*?, (\d+)x(\d+)/.exec(banner);
  const rotation = /rotation of (-?\d+(?:\.\d+)?) degrees/.exec(banner);
  const audio = /Stream #0:\d+.*?: Audio: (\w+)/.exec(banner);

  if (!video) return null;

  const seconds = duration
    ? Number(duration[1]) * 3600 + Number(duration[2]) * 60 + Number(duration[3])
    : 0;

  const turn = Math.abs(Number(rotation ? rotation[1] : 0)) % 180 === 90;
  const rawW = Number(video[2]);
  const rawH = Number(video[3]);

  return {
    seconds,
    codec: video[1],
    width: turn ? rawH : rawW,
    height: turn ? rawW : rawH,
    hasAudio: Boolean(audio),
  };
}

const files = fs
  .readdirSync(SOURCE)
  .filter((name) => VIDEO_EXT.has(path.extname(name).toLowerCase()))
  .sort();

const manifest = [];
const skipped = [];
let index = 0;

for (const name of files) {
  const id = path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  const source = path.join(SOURCE, name);
  const target = path.join(VIDEO_DIR, id + ".mp4");
  const poster = path.join(POSTER_DIR, id + ".jpg");

  const info = probe(source);
  if (!info) {
    console.warn("! " + name + ": no video stream found, skipped");
    continue;
  }

  const upToDate =
    !FORCE &&
    fs.existsSync(target) &&
    fs.existsSync(poster) &&
    fs.statSync(target).mtimeMs >= fs.statSync(source).mtimeMs;

  index += 1;

  if (!upToDate) {
    const scale =
      "scale=w='min(960,iw)':h='min(960,ih)':force_original_aspect_ratio=decrease," +
      "scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p";

    console.log(
      "[" + index + "/" + files.length + "] " + name +
        " (" + Math.round(info.seconds) + "s " + info.codec + ")"
    );

    execFileSync(
      FFMPEG,
      [
        "-y",
        "-loglevel", "error",
        "-i", source,
        "-vf", scale,
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "28",
        "-maxrate", "2400k",
        "-bufsize", "4800k",
        "-profile:v", "main",
        "-level", "4.0",
        "-c:a", "aac",
        "-b:a", "96k",
        "-movflags", "+faststart",
        "-map_metadata", "-1",
        target,
      ],
      { stdio: ["ignore", "ignore", "inherit"] }
    );

    execFileSync(
      FFMPEG,
      [
        "-y",
        "-loglevel", "error",
        "-ss", String(Math.min(1, info.seconds / 2)),
        "-i", source,
        "-frames:v", "1",
        "-vf", scale,
        "-q:v", "3",
        poster,
      ],
      { stdio: ["ignore", "ignore", "inherit"] }
    );

    console.log("   -> " + (fs.statSync(target).size / 1e6).toFixed(1) + " MB");
  } else {
    skipped.push(id);
  }

  const out = probe(target);
  manifest.push({
    id,
    source: name,
    src: target.replaceAll("\\", "/"),
    poster: poster.replaceAll("\\", "/"),
    width: out ? out.width : info.width,
    height: out ? out.height : info.height,
    seconds: Math.round(info.seconds),
    mb: Number((fs.statSync(target).size / 1e6).toFixed(1)),
  });
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

console.log(
  "\n" + manifest.length + " video(s) ready in " + VIDEO_DIR + ", " +
    skipped.length + " already imported."
);
console.log("Manifest: " + MANIFEST + "\n");

for (const entry of manifest) {
  console.log(
    "  " + entry.id.padEnd(10) + String(entry.seconds).padStart(4) + "s  " +
      entry.width + "x" + entry.height + "  " + entry.mb + " MB"
  );
}
