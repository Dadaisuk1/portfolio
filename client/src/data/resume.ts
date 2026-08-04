export const profile = {
  name: "Darwin Darryl Jean E. Largoza",
  role: "Frontend / UI-UX Developer",
  location: "Cebu, Philippines",
  email: "darwindarryljean.largoza@gmail.com",
  phone: "+63-995-662-7081",
  linkedin: "https://www.linkedin.com/in/ddjl/",
  github: "https://github.com/Dadaisuk1",
  resumeUrl: "/resume.pdf",
  bio: "4th-year IT student turning Figma files into production React — full-stack across React, Node.js, and Django, AWS-certified, and comfortable owning a project end to end.",
};

export const techStack = [
  {
    label: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "TailwindCSS", icon: "tailwind" },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js / Express", icon: "node" },
      { name: "Django", icon: "django" },
      { name: "Spring Boot", icon: "springboot" },
    ],
  },
  {
    label: "Data",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    label: "Tools & Workflow",
    items: [
      { name: "Git / GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "Figma", icon: "figma" },
    ],
  },
  {
    label: "AI-Assisted Dev",
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
  schoolUrl: "https://cit.edu/",
  period: "2022 – Present",
};

export const certifications = [
  {
    name: "AWS Academy Graduate — Cloud Architecting",
    type: "Training Badge",
    date: "Dec 2025",
    icon: "aws",
    url: "https://www.credly.com/badges/0da04100-740d-41f0-95c1-9c688737edde/public_url",
  },
  {
    name: "AWS Academy Graduate — Cloud Foundations",
    type: "Training Badge",
    date: "Oct 2025",
    icon: "aws",
    url: "https://www.credly.com/badges/42f391ac-3ece-45d5-ac7d-42169faecb69/public_url",
  },
  {
    name: "IBM — Lifelong Professional Skills",
    type: "Certificate",
    date: "Jul 2026",
    icon: "ibm",
    url: "https://www.credly.com/badges/b5b5da2d-0ce8-4f17-a336-1182e00b3533/public_url",
  },
  {
    name: "CIT-U OJT Readiness Program",
    type: "Certificate",
    date: "Jul 2026",
    icon: "cit",
    url: "https://www.credential.net/c394a11d-dae7-4da5-a5ae-7563557daf18#acc.mD0kuQo6",
  },
] as const;

export type Certification = (typeof certifications)[number];

export const languages = ["English (Professional)", "Filipino (Native)", "Cebuano (Native)"];
