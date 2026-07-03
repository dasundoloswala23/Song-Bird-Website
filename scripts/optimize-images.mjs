// One-time (re-runnable) image optimizer for local /public assets.
//
// The site is a Next.js static export with `images.unoptimized: true`, so Next's
// image optimizer never runs. This script pre-optimizes the heavy source PNGs into
// resized WebP files (and re-encodes the JSON-LD/OG logo in place as a smaller PNG),
// which the components then reference directly.
//
// Idempotent: safe to re-run. Missing sources are skipped (never truncated).
// NOTE: the original high-res source PNGs (city1/world-map/aboutt/collaborating/logo2)
// were pruned from the repo after the first run to slim the deploy — the committed
// .webp files are the shipped assets. To re-optimize, restore a source from git
// history (or drop a new PNG at the `src` path below) and re-run.
//   Usage:  node scripts/optimize-images.mjs

import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = path.join(root, 'public')

// { src, out, width, quality } — src/out are relative to /public.
// If `out` ends in .webp we convert; if it equals `src` (a .png) we re-encode in place.
const WEBP_TARGETS = [
  { src: 'images/city1.png',        out: 'images/city1.webp',        width: 1920, quality: 70 },
  { src: 'images/world-map.png',    out: 'images/world-map.webp',    width: 1400, quality: 80 },
  { src: 'images/aboutt.png',       out: 'images/aboutt.webp',       width: 1600, quality: 75 },
  { src: 'images/collaborating.png',out: 'images/collaborating.webp',width: 1400, quality: 75 },
  { src: 'logo2.png',               out: 'logo2.webp',               width: 256,  quality: 90 },
]

// Re-encode in place as a smaller PNG (used as JSON-LD logo + OG image — keep PNG for
// broad crawler/social compatibility; keep >=112px per Google logo guidance).
const PNG_TARGETS = [
  { src: 'logo.png', width: 512 }, // matches OG image dimensions in app/layout.tsx metadata
]

function fmt(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

async function sizeOf(p) {
  try { return (await fs.stat(p)).size } catch { return 0 }
}

async function run() {
  let before = 0
  let after = 0

  for (const t of WEBP_TARGETS) {
    const srcPath = path.join(pub, t.src)
    const outPath = path.join(pub, t.out)
    const srcSize = await sizeOf(srcPath)
    if (!srcSize) { console.warn(`! skip (missing): ${t.src}`); continue }

    await sharp(srcPath)
      .resize({ width: t.width, withoutEnlargement: true })
      .webp({ quality: t.quality })
      .toFile(outPath)

    const outSize = await sizeOf(outPath)
    before += srcSize
    after += outSize
    console.log(`✓ ${t.src} (${fmt(srcSize)}) → ${t.out} (${fmt(outSize)})`)
  }

  for (const t of PNG_TARGETS) {
    const srcPath = path.join(pub, t.src)
    const srcSize = await sizeOf(srcPath)
    if (!srcSize) { console.warn(`! skip (missing): ${t.src}`); continue }

    // Encode to a temp buffer first so we never truncate the source on failure.
    const buf = await sharp(srcPath)
      .resize({ width: t.width, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer()
    await fs.writeFile(srcPath, buf)

    const outSize = await sizeOf(srcPath)
    before += srcSize
    after += outSize
    console.log(`✓ ${t.src} (${fmt(srcSize)}) → re-encoded PNG (${fmt(outSize)})`)
  }

  console.log(`\nTotal: ${fmt(before)} → ${fmt(after)}  (saved ${fmt(before - after)})`)
}

run().catch(err => { console.error(err); process.exit(1) })
