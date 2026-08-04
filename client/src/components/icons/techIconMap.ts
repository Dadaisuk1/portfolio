import type { ReactElement, SVGProps } from "react";
import {
  Claude,
  Cursor,
  Django,
  Docker,
  Figma,
  GitHub,
  JavaScript,
  Lovable,
  MongoDB,
  MySQL,
  Node,
  PostgreSQL,
  ReactLogo,
  SpringBoot,
  Tailwind,
  Windsurf,
} from "./TechIcons";

export const techIcons = {
  react: ReactLogo,
  tailwind: Tailwind,
  javascript: JavaScript,
  node: Node,
  django: Django,
  springboot: SpringBoot,
  postgresql: PostgreSQL,
  mysql: MySQL,
  mongodb: MongoDB,
  github: GitHub,
  docker: Docker,
  figma: Figma,
  claude: Claude,
  cursor: Cursor,
  windsurf: Windsurf,
  lovable: Lovable,
} satisfies Record<string, (props: SVGProps<SVGSVGElement>) => ReactElement>;

export type TechIconKey = keyof typeof techIcons;
