export const profile = {
  name: "Darwin Darryl Jean E. Largoza",
  role: "Frontend / UI-UX Developer",
  location: "Cebu, Philippines",
  email: "darwindarryljean.largoza@gmail.com",
  phone: "+63-995-662-7081",
  linkedin: "https://www.linkedin.com/in/ddjl/",
  github: "https://github.com/Dadaisuk1",
  resumeUrl: "/resume.pdf",
};

export const techStack = [
  {
    label: "Frontend",
    highlight: false,
    items: [
      { name: "React", icon: "react" },
      { name: "TailwindCSS", icon: "tailwind" },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    label: "Backend",
    highlight: false,
    items: [
      { name: "Node.js / Express", icon: "node" },
      { name: "Django", icon: "django" },
      { name: "Spring Boot", icon: "springboot" },
    ],
  },
  {
    label: "Data",
    highlight: false,
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    label: "Tools & Workflow",
    highlight: false,
    items: [
      { name: "Git / GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "Figma", icon: "figma" },
    ],
  },
  {
    label: "AI-Assisted Dev",
    highlight: true,
    items: [
      { name: "Claude Code", icon: "claude" },
      { name: "Cursor", icon: "cursor" },
      { name: "Windsurf", icon: "windsurf" },
      { name: "Lovable", icon: "lovable" },
    ],
  },
] as const;

export const currentlyExpanding =
  "Test automation (Playwright) · CI/CD fundamentals · Advanced AWS (Security/DevOps)";

export const projects = [
  {
    frame: "01",
    name: "Ally",
    tagline: "AI-Powered Legal Platform (Capstone)",
    description:
      "Designed the complete UI in Figma and implemented it in React (Vite) as frontend/UI-UX developer, including a chat-first interface for AI-powered legal Q&A, a chat interface between lawyer and client, and role-based flows integrated with a Firebase backend — end-to-end frontend ownership on a multi-user, production-style platform.",
    stack: ["React", "Vite", "Figma", "Firebase"],
    period: "Jan 2025 – Dec 2025",
    meta: "FRONTEND / UI-UX · JAN—DEC 2025",
    url: "https://github.com/piolonrqz/Capstone-ALLY",
  },
  {
    frame: "02",
    name: "Notes App",
    tagline: "Hybrid Web2/Web3 Notes Platform",
    description:
      "Built full-stack features for a hybrid Web2/Web3 notes app with Cardano blockchain-based permanence; improved backend rate-limiter reliability and built frontend editor components as part of a 5-person team using Git-based collaboration.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Cardano"],
    period: "Dec 2025",
    meta: "FULL-STACK · TEAM OF 5 · DEC 2025",
    url: "https://github.com/piolonrqz/notes-app",
  },
  {
    frame: "03",
    name: "CampusXperience",
    tagline: "Campus Event Platform",
    description:
      "Built the complete frontend, and contributed as part of a 5-person team to a full-stack web app for campus event discovery, reservation, ticketing, and reminders.",
    stack: ["React", "Vite", "Spring Boot", "Java"],
    period: "May 2025 – Dec 2025",
    meta: "FRONTEND · TEAM OF 5 · MAY—DEC 2025",
    url: "https://github.com/sytrusz/campusxperience",
  },
  {
    frame: "04",
    name: "CrediGo",
    tagline: "System Integration Project",
    description:
      "Independently designed and built the entire web app — frontend UI and backend API integration — for a 3-person System Integration and Architecture course project, owning full-stack development end-to-end from planning through delivery.",
    stack: ["React", "REST API"],
    period: "Apr 2025 – May 2025",
    meta: "SOLO BUILD · APR—MAY 2025",
    url: "https://github.com/Dadaisuk1/CrediGo_IT342",
  },
] as const;

export const education = {
  degree: "Bachelor of Science in Information Technology",
  school: "Cebu Institute of Technology – University",
  period: "2022 – Present",
};

export const certifications = [
  {
    name: "AWS Academy Graduate — Cloud Architecting",
    type: "Training Badge",
    date: "Dec 2025",
    icon: "aws",
  },
  {
    name: "AWS Academy Graduate — Cloud Foundations",
    type: "Training Badge",
    date: "Oct 2025",
    icon: "aws",
  },
  {
    name: "IBM — Lifelong Professional Skills",
    type: "Certificate",
    date: "Jul 2026",
    icon: "ibm",
  },
  {
    name: "CIT-U OJT Readiness Program",
    type: "Certificate",
    date: "Jul 2026",
    icon: "cit",
  },
] as const;

export type Certification = (typeof certifications)[number];

export const languages = ["English (Professional)", "Filipino (Native)", "Cebuano (Native)"];
