import { useEffect, useRef, type RefObject } from "react";

export type CursorPoint = { x: number; y: number; active: boolean };

const PAPER = "245, 242, 234"; // --color-paper, as an rgb() triplet for canvas fillStyle

type Dot = {
  bx: number;
  by: number;
  inclination: number;
  ascension: number;
  phase: number;
  speedMult: number;
};

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/**
 * Bulges the grid outward from its center, same way a wide lens magnifies
 * whatever it's pointed at — radii closer in get pushed apart proportionally
 * more than radii near the frame edge, so the mid-field spreads out while
 * the border stays put. `strength` 1 is optically flat; higher bows harder.
 */
function fisheye(bx: number, by: number, cx: number, cy: number, maxR: number, strength: number) {
  const dx = bx - cx;
  const dy = by - cy;
  const r = Math.hypot(dx, dy);
  if (r === 0 || maxR === 0) return { x: bx, y: by };
  const warpedR = Math.pow(r / maxR, 1 / strength) * maxR;
  const scale = warpedR / r;
  return { x: cx + dx * scale, y: cy + dy * scale };
}

function buildDots(
  width: number,
  height: number,
  spacing: number,
  fisheyeStrength: number,
): Dot[] {
  const cols = Math.ceil(width / spacing) + 2;
  const rows = Math.ceil(height / spacing) + 2;
  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.hypot(cx, cy);
  const dots: Dot[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const { x, y } = fisheye(col * spacing, row * spacing, cx, cy, maxR, fisheyeStrength);
      dots.push({
        bx: x,
        by: y,
        inclination: Math.random() * Math.PI,
        ascension: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
        speedMult: 0.7 + Math.random() * 0.6,
      });
    }
  }

  return dots;
}

/**
 * Ambient, always-visible dot grid (uniform coverage) that idles dim and,
 * near the cursor, swirls each dot along a tilted 3-D orbit (a parametric
 * circle projected through inclination/ascension, with a depth cue dimming
 * and shrinking the "far" side) rather than a flat 2-D nudge — ported from
 * the original Framer "Dot Grid BG" component's physics. Pass `cursorRef`
 * to share a point another element already tracks, or omit it to self-track
 * within bounds.
 */
export function DotGridBackground({
  cursorRef: externalCursorRef,
  dotSize = 3,
  spacing = 28,
  orbitSpeed = 1.5,
  impactRadius = 100,
  scaleOnHover = 1.8,
  enableRevolve = true,
  fisheyeStrength = 1.55,
  className = "",
}: {
  cursorRef?: RefObject<CursorPoint>;
  dotSize?: number;
  spacing?: number;
  orbitSpeed?: number;
  impactRadius?: number;
  scaleOnHover?: number;
  enableRevolve?: boolean;
  fisheyeStrength?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef(0);
  const visibleRef = useRef(true);
  const wasActiveRef = useRef(false);
  const leaveTsRef = useRef(0);
  const globalAngleRef = useRef(0);
  const ownCursorRef = useRef<CursorPoint>({ x: -9999, y: -9999, active: false });
  const cursorRef = externalCursorRef ?? ownCursorRef;
  const selfTracking = !externalCursorRef;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // No prefers-reduced-motion gate here, deliberately: every bit of motion
    // in this component is direct cursor-response (nothing moves without the
    // user actively pointing at it), not unprompted ambient animation, so
    // there's nothing here for reduced-motion to protect against — and
    // gating it made hover stop reacting at all rather than just toning it
    // down.
    let prevTime = 0;

    const draw = (time: number) => {
      if (!visibleRef.current) {
        frameRef.current = window.requestAnimationFrame(draw);
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dots = dotsRef.current;
      const cursor = cursorRef.current;
      const active = cursor?.active ?? false;

      const dt = Math.min((time - (prevTime || time)) / 1000, 0.05);
      prevTime = time;
      globalAngleRef.current += orbitSpeed * dt;

      // capture the timestamp exactly once, on the transition to inactive,
      // so timeSinceLeave grows from a fixed point rather than resetting
      if (!active && wasActiveRef.current) {
        leaveTsRef.current = time;
      }
      wasActiveRef.current = active;

      const timeSinceLeave = active ? 0 : Math.max(0, time - leaveTsRef.current) / 1000;
      const decay = active ? 1 : smoothstep(Math.max(0, 1 - timeSinceLeave * 1.5));

      ctx.clearRect(0, 0, width, height);

      const mx = cursor?.x ?? -9999;
      const my = cursor?.y ?? -9999;

      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        const dx = dot.bx - mx;
        const dy = dot.by - my;
        const dist = Math.hypot(dx, dy);
        const inRange = dist < impactRadius && dist > 0 && decay > 0;

        let x = dot.bx;
        let y = dot.by;
        let scale = 1;
        let alpha = 0.3;

        if (inRange) {
          const t = dist / impactRadius;
          const inf = smoothstep(1 - t) * decay;

          if (enableRevolve) {
            const orbitR = (1 - t) * spacing * 0.7 * inf;
            const theta = globalAngleRef.current * dot.speedMult + dot.phase;
            const cosA = Math.cos(dot.ascension);
            const sinA = Math.sin(dot.ascension);
            const cosI = Math.cos(dot.inclination);
            const sinI = Math.sin(dot.inclination);
            const lx = Math.cos(theta);
            const ly = Math.sin(theta) * cosI;
            const lz = Math.sin(theta) * sinI;

            const ox = (lx * cosA - ly * sinA) * orbitR;
            const oy = (lx * sinA + ly * cosA) * orbitR;
            x = dot.bx + ox;
            y = dot.by + oy;

            const depthScale = 0.75 + 0.25 * ((lz + 1) * 0.5);
            scale = (1 + (scaleOnHover - 1) * inf) * depthScale;
            alpha = (0.3 + 0.7 * inf) * depthScale;
          } else {
            scale = 1 + (scaleOnHover - 1) * inf;
            alpha = 0.3 + 0.7 * inf;
          }
        }

        const r = (dotSize / 2) * scale;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PAPER}, ${alpha})`;
        ctx.fill();
      }

      frameRef.current = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dotsRef.current = buildDots(rect.width, rect.height, spacing, fisheyeStrength);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "200px" },
    );
    intersectionObserver.observe(container);

    let onPointerMove: ((event: PointerEvent) => void) | undefined;
    let onPointerLeave: (() => void) | undefined;
    if (selfTracking) {
      onPointerMove = (event) => {
        const rect = container.getBoundingClientRect();
        ownCursorRef.current.x = event.clientX - rect.left;
        ownCursorRef.current.y = event.clientY - rect.top;
        ownCursorRef.current.active =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
      };
      onPointerLeave = () => {
        ownCursorRef.current.active = false;
      };
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
    }

    frameRef.current = window.requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
      if (onPointerLeave) {
        window.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("blur", onPointerLeave);
      }
      window.cancelAnimationFrame(frameRef.current);
    };
  }, [
    cursorRef,
    selfTracking,
    spacing,
    dotSize,
    orbitSpeed,
    impactRadius,
    scaleOnHover,
    enableRevolve,
    fisheyeStrength,
  ]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
