import ffmpeg from "@ffmpeg-installer/ffmpeg";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

const width = 768;
const height = 432;
const fps = 20;
const seconds = 8;
const frames = fps * seconds;
const output = path.resolve("public/assets/ambient-code-loop.webm");

mkdirSync(path.dirname(output), { recursive: true });

const ffmpegProcess = spawn(ffmpeg.path, [
  "-y",
  "-f",
  "rawvideo",
  "-pixel_format",
  "rgb24",
  "-video_size",
  `${width}x${height}`,
  "-framerate",
  String(fps),
  "-i",
  "-",
  "-an",
  "-c:v",
  "libvpx-vp9",
  "-b:v",
  "0",
  "-crf",
  "38",
  "-pix_fmt",
  "yuv420p",
  output
]);

ffmpegProcess.stderr.on("data", (chunk) => process.stderr.write(chunk));

const buffer = Buffer.alloc(width * height * 3);

function gaussian(x, y, cx, cy, radius) {
  const dx = x - cx;
  const dy = y - cy;
  return Math.exp(-(dx * dx + dy * dy) / (radius * radius));
}

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function addPanel(x, y, t) {
  const panels = [
    { x: 0.58 + 0.025 * Math.sin(t * 1.2), y: 0.2, w: 0.28, h: 0.22 },
    { x: 0.16, y: 0.55 + 0.02 * Math.cos(t * 1.4), w: 0.34, h: 0.26 },
    { x: 0.48, y: 0.66, w: 0.2, h: 0.18 }
  ];

  const nx = x / width;
  const ny = y / height;

  for (const panel of panels) {
    const edge =
      nx > panel.x &&
      nx < panel.x + panel.w &&
      ny > panel.y &&
      ny < panel.y + panel.h &&
      (Math.abs(nx - panel.x) < 0.004 ||
        Math.abs(nx - panel.x - panel.w) < 0.004 ||
        Math.abs(ny - panel.y) < 0.006 ||
        Math.abs(ny - panel.y - panel.h) < 0.006);

    const fill =
      nx > panel.x &&
      nx < panel.x + panel.w &&
      ny > panel.y &&
      ny < panel.y + panel.h;

    if (edge) return 38;
    if (fill) return 7;
  }

  return 0;
}

async function writeFrame(frame) {
  const t = (frame / fps) * Math.PI * 2;
  let offset = 0;

  const tealX = width * (0.76 + 0.05 * Math.sin(t * 0.12));
  const tealY = height * (0.32 + 0.08 * Math.cos(t * 0.15));
  const copperX = width * (0.24 + 0.04 * Math.cos(t * 0.1));
  const copperY = height * (0.7 + 0.05 * Math.sin(t * 0.11));
  const citronX = width * (0.58 + 0.03 * Math.sin(t * 0.16));
  const citronY = height * (0.78 + 0.04 * Math.cos(t * 0.13));

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const nx = x / width;
      const ny = y / height;
      const vignette = 1 - Math.hypot(nx - 0.5, ny - 0.5) * 0.92;
      const teal = gaussian(x, y, tealX, tealY, width * 0.34);
      const copper = gaussian(x, y, copperX, copperY, width * 0.28);
      const citron = gaussian(x, y, citronX, citronY, width * 0.22);
      const grid =
        ((x + frame * 0.55) % 64 < 1.1 || (y + frame * 0.35) % 64 < 1.1) ? 8 : 0;
      const diagonal = Math.abs(((x * 0.65 + y * 0.45 + frame * 2.2) % 220) - 110) < 0.8 ? 18 : 0;
      const panel = addPanel(x, y, t);
      const scan = Math.max(0, 1 - Math.abs(y - ((frame * 5) % height)) / 36) * 10;

      const base = 5 + 8 * vignette;
      buffer[offset] = clamp(base + copper * 50 + citron * 18 + grid + panel * 0.55);
      buffer[offset + 1] = clamp(base + teal * 58 + citron * 52 + grid + scan + panel);
      buffer[offset + 2] = clamp(base + teal * 44 + copper * 18 + diagonal + panel * 0.9);
      offset += 3;
    }
  }

  if (!ffmpegProcess.stdin.write(buffer)) {
    await new Promise((resolve) => ffmpegProcess.stdin.once("drain", resolve));
  }
}

for (let frame = 0; frame < frames; frame += 1) {
  await writeFrame(frame);
}

ffmpegProcess.stdin.end();

await new Promise((resolve, reject) => {
  ffmpegProcess.on("close", (code) => {
    if (code === 0) resolve();
    else reject(new Error(`ffmpeg exited with code ${code}`));
  });
});

console.log(`Generated ${output}`);
