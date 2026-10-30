/**
 * A very light snowfall. A few dozen flakes on a canvas, capped and DPR-aware,
 * paused when the tab is hidden, and switched off entirely for anyone who asks
 * their system for reduced motion.
 */

import { prefersReducedMotion } from "./dom.js";

const TAU = Math.PI * 2;

export function initSnowfall(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduceMotion = prefersReducedMotion();

  let width = 0;
  let height = 0;
  let flakes = [];
  let frame = 0;
  let last = 0;
  let running = true;

  const rand = (min, max) => min + Math.random() * (max - min);

  function makeFlake(seeded) {
    const radius = rand(0.7, 2.4);
    return {
      x: Math.random() * width,
      y: seeded ? Math.random() * height : rand(-40, -8),
      radius,
      speed: rand(7, 15) + radius * 3,
      sway: rand(0.25, 0.85),
      drift: rand(6, 22),
      phase: Math.random() * TAU,
      alpha: rand(0.3, 0.72),
    };
  }

  function seed() {
    const count = Math.round(Math.min(80, Math.max(18, width / 22)));
    flakes = Array.from({ length: count }, () => makeFlake(true));
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function paint() {
    ctx.clearRect(0, 0, width, height);
    ctx.shadowColor = "rgba(74, 20, 38, 0.24)";
    ctx.shadowBlur = 4;

    for (const flake of flakes) {
      const x = flake.x + Math.sin(flake.phase) * flake.drift;
      ctx.beginPath();
      ctx.arc(x, flake.y, flake.radius, 0, TAU);
      ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
      ctx.fill();
    }

    ctx.shadowBlur = 0;
  }

  function step(time) {
    if (!running) return;

    if (!last) last = time;
    const delta = Math.min((time - last) / 1000, 0.05);
    last = time;

    for (const flake of flakes) {
      flake.y += flake.speed * delta;
      flake.phase += flake.sway * delta;

      if (flake.y - flake.radius > height + 16) {
        flake.y = -12;
        flake.x = Math.random() * width;
      }
    }

    paint();
    frame = requestAnimationFrame(step);
  }

  resize();

  if (reduceMotion) {
    paint();
    window.addEventListener("resize", () => {
      resize();
      paint();
    });
    return;
  }

  let resizeTick = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeTick);
    resizeTick = requestAnimationFrame(() => {
      resize();
      paint();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(frame);
    } else if (!running) {
      running = true;
      last = 0;
      frame = requestAnimationFrame(step);
    }
  });

  frame = requestAnimationFrame(step);
}
