"use client";

import { useEffect, useRef } from "react";
import { useColorTheme } from "@/components/theme-provider";

// Palettes per color theme. Each line picks a distinct shade interpolated
// across the palette, so every route has its own dot color.
const THEME_COLORS: Record<string, string[]> = {
  default: ["#3b82f6", "#60a5fa", "#0ea5e9", "#818cf8", "#38bdf8"],
  teal:    ["#14b8a6", "#2dd4bf", "#0ea5e9", "#5eead4", "#a5f3fc"],
  indigo:  ["#6366f1", "#818cf8", "#e879f9", "#a5b4fc", "#c4b5fd"],
  emerald: ["#10b981", "#34d399", "#6ee7b7", "#4ade80", "#a7f3d0"],
  amber:   ["#f59e0b", "#fbbf24", "#fb923c", "#fcd34d", "#fed7aa"],
};

const LINE_COUNT = 18;

type Pt = { x: number; y: number };

type Line = {
  pts: Pt[]; // dense polyline (rounded corners pre-sampled)
  cum: number[]; // cumulative length at each point
  len: number; // total length
  colorT: number; // 0..1 position in the palette
  speed: number; // progress per frame (1 = full path)
  phase: number; // current progress 0..1 while a dot travels, -1 when idle
  trail: number; // trail length in px
};

/* ---------- color helpers ---------- */

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function lerp(a: number, b: number, f: number) {
  return a + (b - a) * f;
}

function paletteColor(pal: string[], t: number, alpha = 1) {
  const clamped = Math.max(0, Math.min(1, t));
  const seg = clamped * (pal.length - 1);
  const i = Math.min(pal.length - 2, Math.floor(seg));
  const f = seg - i;
  const a = hexToRgb(pal[i]);
  const b = hexToRgb(pal[i + 1]);
  const r = Math.round(lerp(a.r, b.r, f));
  const g = Math.round(lerp(a.g, b.g, f));
  const bl = Math.round(lerp(a.b, b.b, f));
  return `rgba(${r}, ${g}, ${bl}, ${alpha})`;
}

/* ---------- geometry helpers ---------- */

// Turn a list of waypoints into a dense polyline with rounded corners.
function roundedPolyline(wp: Pt[], radius: number): Pt[] {
  if (wp.length <= 2) return wp.slice();
  const SEG = 8;
  const out: Pt[] = [wp[0]];

  for (let i = 1; i < wp.length - 1; i++) {
    const A = wp[i - 1];
    const B = wp[i];
    const C = wp[i + 1];

    const ab = Math.hypot(B.x - A.x, B.y - A.y);
    const bc = Math.hypot(C.x - B.x, C.y - B.y);
    const r = Math.min(radius, ab / 2, bc / 2);

    const enter = {
      x: B.x - ((B.x - A.x) / ab) * r,
      y: B.y - ((B.y - A.y) / ab) * r,
    };
    const exit = {
      x: B.x + ((C.x - B.x) / bc) * r,
      y: B.y + ((C.y - B.y) / bc) * r,
    };

    out.push(enter);
    for (let s = 1; s <= SEG; s++) {
      const t = s / SEG;
      const u = 1 - t;
      out.push({
        x: u * u * enter.x + 2 * u * t * B.x + t * t * exit.x,
        y: u * u * enter.y + 2 * u * t * B.y + t * t * exit.y,
      });
    }
  }

  out.push(wp[wp.length - 1]);
  return out;
}

function buildCum(pts: Pt[]) {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }
  return cum;
}

function pointAtDistance(line: Line, dist: number): Pt {
  const { pts, cum, len } = line;
  const d = Math.max(0, Math.min(len, dist));
  let lo = 0;
  let hi = cum.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cum[mid] < d) lo = mid + 1;
    else hi = mid;
  }
  const i = Math.max(1, lo);
  const segLen = cum[i] - cum[i - 1] || 1;
  const f = (d - cum[i - 1]) / segLen;
  return {
    x: lerp(pts[i - 1].x, pts[i].x, f),
    y: lerp(pts[i - 1].y, pts[i].y, f),
  };
}

// Points of the polyline between two distances, with interpolated endpoints.
function subPath(line: Line, d0: number, d1: number): Pt[] {
  const res: Pt[] = [pointAtDistance(line, d0)];
  for (let i = 0; i < line.cum.length; i++) {
    if (line.cum[i] > d0 && line.cum[i] < d1) res.push(line.pts[i]);
  }
  res.push(pointAtDistance(line, d1));
  return res;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colorTheme } = useColorTheme();
  const palRef = useRef<string[]>(THEME_COLORS[colorTheme] ?? THEME_COLORS.default);

  // Keep palette in sync without restarting the animation; paths stay the same.
  useEffect(() => {
    palRef.current = THEME_COLORS[colorTheme] ?? THEME_COLORS.default;
  }, [colorTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lines: Line[] = [];
    let W = 0;
    let H = 0;
    let rafId = 0;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Deterministic-ish pseudo random so it varies but stays stable per build.
    function rand(seed: number) {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    }

    // Group split: leftmost lines exit on the left edge, middle exit on top,
    // rightmost exit on the right edge. Because starts (sorted left->right)
    // are matched to exits walking the perimeter, the routes nest and never
    // cross each other.
    const LEFT = 6;
    const TOP = 6;
    const RIGHT = LINE_COUNT - LEFT - TOP;

    function makeLine(i: number): Line {
      const startX = (W * (i + 0.5)) / LINE_COUNT;
      const startY = H;
      let wp: Pt[];

      if (i < LEFT) {
        // Exit on the LEFT edge. Lower index -> rises less, exits lower.
        const k = i; // 0..LEFT-1
        const exitY = H * (1 - ((k + 0.5) / LEFT) * 0.9);
        wp = [
          { x: startX, y: startY },
          { x: startX, y: exitY },
          { x: 0, y: exitY },
        ];
      } else if (i >= LEFT + TOP) {
        // Exit on the RIGHT edge. Mirror of the left group.
        const j = i - (LEFT + TOP); // 0..RIGHT-1
        const kPrime = RIGHT - 1 - j;
        const exitY = H * (1 - ((kPrime + 0.5) / RIGHT) * 0.9);
        wp = [
          { x: startX, y: startY },
          { x: startX, y: exitY },
          { x: W, y: exitY },
        ];
      } else {
        // Exit on the TOP edge, straight up.
        wp = [
          { x: startX, y: startY },
          { x: startX, y: 0 },
        ];
      }

      const pts = roundedPolyline(wp, 40);
      const cum = buildCum(pts);
      const len = cum[cum.length - 1];

      const seconds = 0.9 + rand(i + 1) * 1.1; // 0.9..2s traversal
      return {
        pts,
        cum,
        len,
        colorT: (i * 0.61803) % 1, // golden-ratio spread -> distinct neighbors
        speed: 1 / (seconds * 60),
        phase: -1, // idle until the scheduler launches a dot on this line
        trail: 60 + rand(i + 5) * 80,
      };
    }

    function setup() {
      const dpr = window.devicePixelRatio || 1;
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      lines = [];
      for (let i = 0; i < LINE_COUNT; i++) lines.push(makeLine(i));
    }

    function drawBase(line: Line) {
      const pal = palRef.current;
      ctx!.beginPath();
      ctx!.moveTo(line.pts[0].x, line.pts[0].y);
      for (let i = 1; i < line.pts.length; i++) {
        ctx!.lineTo(line.pts[i].x, line.pts[i].y);
      }
      ctx!.strokeStyle = paletteColor(pal, line.colorT, 0.1);
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // faint node at the start
      const s = line.pts[0];
      ctx!.beginPath();
      ctx!.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
      ctx!.fillStyle = paletteColor(pal, line.colorT, 0.25);
      ctx!.fill();
    }

    function drawDot(line: Line) {
      if (line.phase < 0 || line.phase > 1) return; // line is idle / dot off the line
      const pal = palRef.current;
      const color = paletteColor(pal, line.colorT, 1);
      const headDist = line.phase * line.len;
      const tailDist = Math.max(0, headDist - line.trail);

      // trail with a fading gradient
      const seg = subPath(line, tailDist, headDist);
      if (seg.length >= 2) {
        const a = seg[0];
        const b = seg[seg.length - 1];
        const grad = ctx!.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, paletteColor(pal, line.colorT, 0));
        grad.addColorStop(1, color);
        ctx!.beginPath();
        ctx!.moveTo(seg[0].x, seg[0].y);
        for (let i = 1; i < seg.length; i++) ctx!.lineTo(seg[i].x, seg[i].y);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 2.2;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.stroke();
      }

      // glowing head
      const head = pointAtDistance(line, headDist);
      ctx!.shadowColor = color;
      ctx!.shadowBlur = 12;
      ctx!.beginPath();
      ctx!.arc(head.x, head.y, 2.6, 0, Math.PI * 2);
      ctx!.fillStyle = color;
      ctx!.fill();
      ctx!.shadowBlur = 0;
    }

    const LAUNCH_INTERVAL = 1000; // launch one dot per second
    let lastLaunch = -Infinity;
    let launchSeed = 0;

    function launchDot() {
      // pick a random line that is currently idle
      const idle = lines.filter((l) => l.phase < 0);
      const pool = idle.length ? idle : lines;
      launchSeed++;
      const pick = Math.floor(rand(launchSeed * 7.3) * pool.length);
      pool[Math.min(pool.length - 1, pick)].phase = 0;
    }

    function frame(now: number) {
      if (now - lastLaunch >= LAUNCH_INTERVAL) {
        lastLaunch = now;
        launchDot();
      }

      ctx!.clearRect(0, 0, W, H);
      for (const line of lines) drawBase(line);
      for (const line of lines) {
        if (line.phase < 0) continue; // idle, no dot
        drawDot(line);
        line.phase += line.speed;
        if (line.phase > 1) line.phase = -1; // dot reached the exit -> idle
      }
      rafId = requestAnimationFrame(frame);
    }

    function staticFrame() {
      ctx!.clearRect(0, 0, W, H);
      for (const line of lines) drawBase(line);
      for (const line of lines) {
        line.phase = 0.5;
        drawDot(line);
      }
    }

    setup();
    if (reduceMotion) staticFrame();
    else rafId = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      setup();
      if (reduceMotion) staticFrame();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        maskImage:
          "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.35) 5%, #000 16%)",
        WebkitMaskImage:
          "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.35) 5%, #000 16%)",
      }}
      aria-hidden="true"
    />
  );
}
