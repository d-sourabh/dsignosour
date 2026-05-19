import type { GestureState } from "../hooks/useGestures";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: "dot" | "heart" | "twinkle" | "spark";
}

let particles: Particle[] = [];

function addParticles(
  x: number,
  y: number,
  count: number,
  type: Particle["type"],
  spread = 3,
  life = 60
) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * spread,
      vy: -Math.random() * 2 - 1,
      life,
      maxLife: life,
      size: Math.random() * 3 + 1,
      type,
    });
  }
}

export function renderCanvas(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  gestures: GestureState[],
  paintTrail: { x: number; y: number; t: number }[]
) {
  ctx.clearRect(0, 0, w, h);

  const now = performance.now();
  const active = new Set(gestures.filter((g) => g.active).map((g) => g.name));

  // --- Ray of light ---
  const ray = gestures.find((g) => g.name === "rayOfLight" && g.active);
  if (ray?.data) {
    const { x, y } = ray.data as { x: number; y: number };
    const grad = ctx.createLinearGradient(x, y, x, 0);
    grad.addColorStop(0, "rgba(255,255,255,0.7)");
    grad.addColorStop(0.3, "rgba(255,255,255,0.3)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(x - 15, 0, 30, y);
  }

  // --- Paint trail ---
  if (paintTrail.length > 1) {
    for (let i = 1; i < paintTrail.length; i++) {
      const prev = paintTrail[i - 1];
      const curr = paintTrail[i];
      const age = now - curr.t;
      const alpha = Math.max(0, 1 - age / 3000);
      if (alpha <= 0) continue;

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(curr.x, curr.y);
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.shadowBlur = 20;
      ctx.shadowColor = `rgba(255,255,255,${alpha * 0.8})`;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }

  // --- Thumbs up particles ---
  const thumbs = gestures.find((g) => g.name === "thumbsUp" && g.active);
  if (thumbs?.data) {
    const { x, y } = thumbs.data as { x: number; y: number };
    if (Math.random() > 0.5) addParticles(x, y, 1, "dot", 2, 40);
  }

  // --- Heart trail ---
  const heart = gestures.find((g) => g.name === "heart" && g.active);
  if (heart?.data) {
    const { x, y } = heart.data as { x: number; y: number };
    if (Math.random() > 0.6) addParticles(x, y, 1, "heart", 4, 80);
  }

  // --- Wink twinkle ---
  const wink = gestures.find((g) => g.name === "wink" && g.active);
  if (wink?.data) {
    const { x, y } = wink.data as { x: number; y: number };
    if (Math.random() > 0.7) addParticles(x, y, 1, "twinkle", 2, 50);
  }

  // --- Spark (index tips touching) ---
  const spark = gestures.find((g) => g.name === "spark" && g.active);
  if (spark?.data) {
    const { x, y } = spark.data as { x: number; y: number };
    addParticles(x, y, 3, "spark", 5, 36);
  }

  // --- Update & draw particles ---
  particles = particles.filter((p) => p.life > 0);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    const alpha = p.life / p.maxLife;

    if (p.type === "heart") {
      ctx.font = `${12 + p.size * 2}px serif`;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "white";
      ctx.fillText("♥", p.x, p.y);
      ctx.globalAlpha = 1;
    } else if (p.type === "twinkle") {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "white";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "white";
      const s = p.size * 2;
      ctx.beginPath();
      // 4-point star
      for (let j = 0; j < 4; j++) {
        const angle = (j / 4) * Math.PI * 2 - Math.PI / 2;
        const outerX = p.x + Math.cos(angle) * s * 2;
        const outerY = p.y + Math.sin(angle) * s * 2;
        const innerAngle = angle + Math.PI / 4;
        const innerX = p.x + Math.cos(innerAngle) * s * 0.5;
        const innerY = p.y + Math.sin(innerAngle) * s * 0.5;
        if (j === 0) ctx.moveTo(outerX, outerY);
        else ctx.lineTo(outerX, outerY);
        ctx.lineTo(innerX, innerY);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    } else if (p.type === "spark") {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "white";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // --- Open palm ripple (drawn on canvas as concentric circles) ---
  if (active.has("openPalm")) {
    const palm = gestures.find((g) => g.name === "openPalm" && g.active);
    if (palm?.data) {
      const { x, y } = palm.data as { x: number; y: number };
      const t = (now % 2000) / 2000;
      for (let r = 0; r < 3; r++) {
        const phase = (t + r * 0.33) % 1;
        const radius = phase * 150;
        const alpha = (1 - phase) * 0.3;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
  }
}
