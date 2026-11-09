#!/usr/bin/env bash
# Re-encode hero background videos for fast web delivery (H.264 + faststart).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/public/assets"
IMAGES="$ROOT/public/images"

for name in globe lab bg2; do
  in="$ASSETS/${name}.mp4"
  out="$ASSETS/${name}.mp4"
  tmp="$ASSETS/${name}.optimized.tmp.mp4"

  ffmpeg -y -i "$in" -an \
    -vf "scale='min(960,iw)':-2" \
    -c:v libx264 -preset medium -crf 30 \
    -maxrate 800k -bufsize 1600k \
    -movflags +faststart -pix_fmt yuv420p \
    "$tmp"

  mv "$tmp" "$out"

  ffmpeg -y -i "$out" -ss 0.1 -vframes 1 -vf "scale=960:-2" -q:v 80 \
    "$IMAGES/poster-${name}.webp"
done

ls -lh "$ASSETS"/*.mp4 "$IMAGES"/poster-*.webp
