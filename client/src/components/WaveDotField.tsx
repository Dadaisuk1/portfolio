import { useEffect, useRef, type RefObject } from "react";

export type CursorPoint = { x: number; y: number; active: boolean };
export type WaveDotTone = "dark" | "light";

const WAVE_SRC = "/waves_color/wave-signal-teal.webp";
const IMPACT_RADIUS = 190;
const BASE_COLOR: [number, number, number] = [23, 86, 105]; // --color-teal, reads on both tones
const HOT_COLOR: Record<WaveDotTone, [number, number, number]> = {
  dark: [238, 93, 0], // --color-orange
  light: [163, 62, 0], // --color-orange-deep (AA-safe on paper)
};

type Dot = {
  x: number;
  y: number;
  baseRadius: number;
  baseAlpha: number;
  phase: number;
  ascension: number;
  inclination: number;
  twinkleSpeed: number;
};

let waveImagePromise: Promise<HTMLImageElement> | null = null;
function loadWaveImage() {
  waveImagePromise ??= new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = WAVE_SRC;
  });
  return waveImagePromise;
}

function sampleWaveAlpha(image: HTMLImageElement, width: number, height: number) {
  const off = document.createElement("canvas");
  off.width = Math.max(1, Math.round(width));
  off.height = Math.max(1, Math.round(height));
  const octx = off.getContext("2d");
  if (!octx) return null;

  // object-fit: cover placement of the source image into the sample canvas.
  // naturalWidth/Height (not width/height) since this image is never
  // attached to the DOM, so it has no rendered/CSS size to fall back on.
  const scale = Math.max(
    off.width / image.naturalWidth,
    off.height / image.naturalHeight,
  );
  const drawW = image.naturalWidth * scale;
  const drawH = image.naturalHeight * scale;
  octx.drawImage(image, (off.width - drawW) / 2, (off.height - drawH) / 2, drawW, drawH);

  return octx.getImageData(0, 0, off.width, off.height);
}

function buildDots(
  imageData: ImageData,
  width: number,
  height: number,
  spacing: number,
  alphaScale: number,
): Dot[] {
  const dots: Dot[] = [];
  const { data } = imageData;

  for (let gx = 0; gx < width; gx += spacing) {
    for (let gy = 0; gy < height; gy += spacing) {
      const px = Math.min(imageData.width - 1, Math.floor(gx));
      const py = Math.min(imageData.height - 1, Math.floor(gy));
      const alpha = data[(py * imageData.width + px) * 4 + 3] / 255;
      if (alpha < 0.05) continue;
      if (Math.random() > alpha) continue;

      dots.push({
        x: gx + (Math.random() - 0.5) * spacing * 0.5,
        y: gy + (Math.random() - 0.5) * spacing * 0.5,
        baseRadius: 0.9 + Math.random() * 1.1,
        baseAlpha: (0.25 + alpha * 0.5) * alphaScale,
        phase: Math.random() * Math.PI * 2,
        ascension: Math.random() * Math.PI * 2,
        inclination: (Math.random() * 0.6 + 0.25) * (Math.random() < 0.5 ? 1 : -1),
        twinkleSpeed: 0.4 + Math.random() * 0.5,
      });
    }
  }

  return dots;
}

/**
 * Canvas-drawn recreation of the wave texture's halftone dots (sampled from
 * the retinted wave image's alpha channel) as individually animated
 * particles, rather than a flattened raster: each dot idles with a slow
 * independent twinkle and brightens/orbits when a cursor point passes near
 * it. Pass `cursorRef` to react to a point another element already tracks
 * (PhotoPanel's spotlight mask); omit it and the field tracks the pointer
 * within its own bounds instead, scoped per-instance so it doesn't need a
 * shared listener across sections.
 */
export function WaveDotField({
  cursorRef: externalCursorRef,
  tone = "dark",
  spacing = 10,
  alphaScale = 1,
  className = "",
}: {
  cursorRef?: RefObject<CursorPoint>;
  tone?: WaveDotTone;
  spacing?: number;
  alphaScale?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef(0);
  const fadeRef = useRef(0);
  const visibleRef = useRef(true);
  const ownCursorRef = useRef<CursorPoint>({ x: -9999, y: -9999, active: false });
  const cursorRef = externalCursorRef ?? ownCursorRef;
  const selfTracking = !externalCursorRef;
  const hotColor = HOT_COLOR[tone];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const draw = (time: number) => {
      if (!visibleRef.current) {
        frameRef.current = window.requestAnimationFrame(draw);
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dots = dotsRef.current;
      const cursor = cursorRef.current;

      fadeRef.current = cursor?.active
        ? Math.min(1, fadeRef.current + 0.05)
        : Math.max(0, fadeRef.current - 0.02);
      const fade = fadeRef.current;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        let x = dot.x;
        let y = dot.y;
        let radius = dot.baseRadius;
        let alpha = reducedMotion
          ? dot.baseAlpha
          : dot.baseAlpha *
            (0.75 + 0.25 * Math.sin(time * 0.001 * dot.twinkleSpeed + dot.phase));
        let mix = 0;

        if (!reducedMotion && cursor && fade > 0.01) {
          const dx = dot.x - cursor.x;
          const dy = dot.y - cursor.y;
          const dist = Math.hypot(dx, dy);
          if (dist < IMPACT_RADIUS) {
            const pull = 1 - dist / IMPACT_RADIUS;
            const effect = pull ** 1.8 * fade;
            mix = effect;
            alpha = Math.min(1, alpha + effect * 0.8);
            radius = radius * (1 + effect * 1.6);

            const orbitRadius = effect * 14;
            const orbitalTime = time * 0.001 * 0.7;
            x += Math.cos(dot.phase + orbitalTime + dot.ascension) * orbitRadius;
            y += Math.sin(dot.phase + orbitalTime + dot.inclination) * orbitRadius;
          }
        }

        const r = BASE_COLOR[0] + (hotColor[0] - BASE_COLOR[0]) * mix;
        const g = BASE_COLOR[1] + (hotColor[1] - BASE_COLOR[1]) * mix;
        const b = BASE_COLOR[2] + (hotColor[2] - BASE_COLOR[2]) * mix;

        ctx.fillStyle = `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        frameRef.current = window.requestAnimationFrame(draw);
      }
    };

    const resize = async () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const image = await loadWaveImage().catch(() => null);
      if (cancelled || !image || rect.width === 0 || rect.height === 0) return;
      const imageData = sampleWaveAlpha(image, rect.width, rect.height);
      if (cancelled || !imageData) return;
      dotsRef.current = buildDots(imageData, rect.width, rect.height, spacing, alphaScale);
      // under reduced motion the rAF loop never runs, so paint the
      // (now populated) static frame directly instead of racing this load
      if (reducedMotion) draw(0);
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

    if (!reducedMotion) {
      frameRef.current = window.requestAnimationFrame(draw);
    }

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
      if (onPointerLeave) {
        window.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("blur", onPointerLeave);
      }
      window.cancelAnimationFrame(frameRef.current);
    };
  }, [cursorRef, selfTracking, spacing, alphaScale, hotColor]);

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
