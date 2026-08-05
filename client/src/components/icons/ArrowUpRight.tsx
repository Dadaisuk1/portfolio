import type { SVGProps } from "react";

const ArrowUpRight = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 10 10" fill="none" {...props}>
    <path
      d="M2.5 7.5L7.5 2.5M7.5 2.5H4.5M7.5 2.5V5.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { ArrowUpRight };
