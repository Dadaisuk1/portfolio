import { useState, type ImgHTMLAttributes } from "react";

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  width: number;
  height: number;
}

/**
 * Pulsing placeholder sized to width/height (also set as real img
 * attributes, so the layout doesn't shift once the image resolves — not
 * just a skeleton nicety, a CLS fix). Cross-fades to the real image on load.
 */
export function ImageWithSkeleton({
  width,
  height,
  className = "",
  onLoad,
  ...props
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative inline-block shrink-0" style={{ width, height }}>
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse rounded-sm bg-ash/20"
        />
      )}
      <img
        {...props}
        width={width}
        height={height}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={`h-full w-full object-contain transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </span>
  );
}
