// ───────────────────────────────────────────────────────────
// Filter renderer for the Thinking page.
// Draws the webcam frame to canvas, applies a filter if any
// gesture is active, and overlays the white index-finger dot.
// ───────────────────────────────────────────────────────────

// Bayer 4×4 ordered dithering matrix (values 0-15)
const BAYER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
];

export interface FilterState {
  active: string | null; // 'fist' | 'peace' | ... | null
  indexFingertip: { x: number; y: number } | null;
  palmCenter: { x: number; y: number } | null;
  pinchPoint: { x: number; y: number } | null;
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  state: FilterState
) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const now = performance.now();

  // ─── Step 1: Draw the video (mirrored horizontally) ────────
  ctx.save();
  ctx.scale(-1, 1);
  ctx.drawImage(video, -w, 0, w, h);
  ctx.restore();

  // ─── Step 2: Apply filter based on active gesture ─────────
  switch (state.active) {
    case "fist":
      applyDither(ctx, w, h);
      break;
    case "peace":
      applyVHS(ctx, w, h, now);
      break;
    case "pointing":
      applySpotlight(ctx, w, h, state.indexFingertip);
      break;
    case "openPalm":
      applyWaterRipple(ctx, w, h, state.palmCenter, now);
      break;
    case "rockOn":
      applyGlitch(ctx, w, h, now);
      break;
    case "okSign":
      applySoftFocusVignette(ctx, w, h);
      break;
    case "thumbDown":
      applyInvert(ctx, w, h);
      break;
    case "pinch":
      applyMagnify(ctx, w, h, video, state.pinchPoint);
      break;
    case "threeFingers":
      applyPixelate(ctx, w, h, video);
      break;
    default:
      // No filter
      break;
  }

  // ─── Step 3: Draw white dot at index fingertip (always) ────
  if (state.indexFingertip) {
    const { x, y } = state.indexFingertip;
    ctx.save();
    ctx.shadowBlur = 12;
    ctx.shadowColor = "rgba(255,255,255,0.8)";
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ───────────────────────────────────────────────────────────
// FILTERS
// ───────────────────────────────────────────────────────────

function applyDither(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      // Luma
      const gray =
        0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      const threshold =
        (BAYER_4X4[(y & 3) * 4 + (x & 3)] / 16) * 255;
      const v = gray > threshold ? 255 : 0;
      d[i] = v;
      d[i + 1] = v;
      d[i + 2] = v;
    }
  }
  ctx.putImageData(img, 0, 0);
}

function applyVHS(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  now: number
) {
  const img = ctx.getImageData(0, 0, w, h);
  const src = new Uint8ClampedArray(img.data);
  const d = img.data;

  const offset = 4; // chromatic aberration distance in pixels
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      // Red shifted right
      const rx = Math.min(w - 1, x + offset);
      const ri = (y * w + rx) * 4;
      // Blue shifted left
      const bx = Math.max(0, x - offset);
      const bi = (y * w + bx) * 4;

      d[i] = src[ri];
      d[i + 1] = src[i + 1];
      d[i + 2] = src[bi + 2];

      // Scanlines: darken every other row
      if (y % 2 === 0) {
        d[i] = d[i] * 0.7;
        d[i + 1] = d[i + 1] * 0.7;
        d[i + 2] = d[i + 2] * 0.7;
      }
    }
  }
  ctx.putImageData(img, 0, 0);

  // Subtle moving noise band
  const bandY = ((now / 30) % h) | 0;
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = "white";
  ctx.fillRect(0, bandY, w, 2);
  ctx.restore();
}

function applySpotlight(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  fingertip: { x: number; y: number } | null
) {
  if (!fingertip) return;
  const { x, y } = fingertip;
  const radius = Math.min(w, h) * 0.22;

  ctx.save();
  // Dark overlay everywhere except a soft circle at fingertip
  const grad = ctx.createRadialGradient(x, y, radius * 0.4, x, y, radius * 1.4);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(0.55, "rgba(0,0,0,0.4)");
  grad.addColorStop(1, "rgba(0,0,0,0.92)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

function applyWaterRipple(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  center: { x: number; y: number } | null,
  now: number
) {
  if (!center) return;

  // Cheap "water" effect: horizontal sine displacement, intensity decays with distance from center.
  // For performance we work on coarse strips, copying horizontal slices with x-offset.
  const stripH = 4; // pixels per strip
  const t = now / 200;

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = w;
  tempCanvas.height = h;
  const tctx = tempCanvas.getContext("2d");
  if (!tctx) return;
  tctx.drawImage(ctx.canvas, 0, 0);

  ctx.clearRect(0, 0, w, h);

  for (let y = 0; y < h; y += stripH) {
    const dy = y - center.y;
    const distFromCenter = Math.sqrt(dy * dy);
    const amplitude = Math.max(0, 14 - distFromCenter / 30);
    const offset = Math.sin(y / 18 + t) * amplitude;
    ctx.drawImage(
      tempCanvas,
      0,
      y,
      w,
      stripH,
      offset,
      y,
      w,
      stripH
    );
  }

  // Concentric expanding rings emanating from palm
  ctx.save();
  const ringT = (now % 1800) / 1800;
  for (let r = 0; r < 3; r++) {
    const phase = (ringT + r / 3) % 1;
    const radius = phase * Math.min(w, h) * 0.5;
    const alpha = (1 - phase) * 0.45;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();
}

function applyGlitch(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  now: number
) {
  const img = ctx.getImageData(0, 0, w, h);
  const src = new Uint8ClampedArray(img.data);
  const d = img.data;

  // Chromatic aberration with horizontal slice displacement
  const t = now / 100;
  const sliceCount = 8;
  const sliceH = h / sliceCount;

  for (let s = 0; s < sliceCount; s++) {
    const yStart = (s * sliceH) | 0;
    const yEnd = ((s + 1) * sliceH) | 0;
    // Random offset per slice that animates
    const offsetX = ((Math.sin(t + s * 1.7) * 30) | 0);
    const redShift = ((Math.cos(t + s) * 12) | 0);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = 0; x < w; x++) {
        const dstI = (y * w + x) * 4;
        const sx = Math.max(0, Math.min(w - 1, x + offsetX));
        const srcI = (y * w + sx) * 4;

        const rx = Math.max(0, Math.min(w - 1, sx + redShift));
        const rI = (y * w + rx) * 4;

        d[dstI] = src[rI];         // R shifted further
        d[dstI + 1] = src[srcI + 1];
        d[dstI + 2] = src[srcI + 2];
      }
    }
  }
  ctx.putImageData(img, 0, 0);
}

function applySoftFocusVignette(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  // Soft focus: simple box blur via drawing twice with low alpha
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.filter = "blur(3px)";
  ctx.drawImage(ctx.canvas, 0, 0);
  ctx.filter = "none";
  ctx.globalAlpha = 1;
  ctx.restore();

  // Vignette
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.sqrt(cx * cx + cy * cy);
  const grad = ctx.createRadialGradient(cx, cy, maxR * 0.4, cx, cy, maxR);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.7)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function applyInvert(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = 255 - d[i];
    d[i + 1] = 255 - d[i + 1];
    d[i + 2] = 255 - d[i + 2];
  }
  ctx.putImageData(img, 0, 0);
}

function applyMagnify(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  video: HTMLVideoElement,
  pinchPoint: { x: number; y: number } | null
) {
  if (!pinchPoint) return;
  const { x, y } = pinchPoint;
  const radius = Math.min(w, h) * 0.18;
  const zoom = 2.2;

  // Compute source region from video (mirrored)
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return;

  // Convert canvas point to video coordinates (mirrored)
  const srcX = ((w - x) / w) * vw;
  const srcY = (y / h) * vh;
  const srcRadius = radius / zoom;
  const srcSize = (srcRadius * vw) / w;

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.scale(-1, 1);
  ctx.drawImage(
    video,
    srcX - srcSize,
    srcY - srcSize,
    srcSize * 2,
    srcSize * 2,
    -x - radius,
    y - radius,
    radius * 2,
    radius * 2
  );
  ctx.restore();

  // Ring around the magnified area
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 2;
  ctx.shadowBlur = 14;
  ctx.shadowColor = "rgba(255,255,255,0.5)";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function applyPixelate(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  video: HTMLVideoElement
) {
  // Pixelate trick: draw to a small offscreen canvas, then back up
  const blockSize = 14;
  const sw = Math.max(1, Math.floor(w / blockSize));
  const sh = Math.max(1, Math.floor(h / blockSize));

  const off = document.createElement("canvas");
  off.width = sw;
  off.height = sh;
  const octx = off.getContext("2d");
  if (!octx) return;
  octx.imageSmoothingEnabled = false;

  // Draw current canvas content down to small size
  octx.drawImage(ctx.canvas, 0, 0, sw, sh);

  // Reduce color depth slightly for 8-bit feel
  const img = octx.getImageData(0, 0, sw, sh);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = (d[i] >> 5) << 5;
    d[i + 1] = (d[i + 1] >> 5) << 5;
    d[i + 2] = (d[i + 2] >> 6) << 6;
  }
  octx.putImageData(img, 0, 0);

  // Draw small canvas back up at original size, no smoothing
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(off, 0, 0, w, h);
  ctx.imageSmoothingEnabled = true;

  // Suppress unused video parameter warning (kept for future direct-from-video pixelation)
  void video;
}
