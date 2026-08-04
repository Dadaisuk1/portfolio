import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-orange-muted px-3 py-1 font-hud text-tag uppercase tracking-[0.08em] text-orange">
      {children}
    </span>
  );
}
