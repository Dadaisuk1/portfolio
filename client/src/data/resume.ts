export const profile = {
  name: "Darwin Darryl Jean E. Largoza",
  role: "Frontend / UI-UX Developer",
  location: "Cebu, Philippines",
  email: "darwindarryljean.largoza@gmail.com",
  phone: "+63-995-662-7081",
  linkedin: "https://www.linkedin.com/in/ddjl/",
  github: "https://github.com/Dadaisuk1",
  resumeUrl: "/resume.pdf",
  summary:
    "4th-year Information Technology student with hands-on experience across full-stack development (React, Node.js, Django), UI/UX design, and cloud architecture (AWS-certified). Proficient in JavaScript and Git-based collaboration, with working knowledge of relational and NoSQL databases (MySQL, MongoDB) and applied information security fundamentals. Adaptable across tech stacks and comfortable working in Agile team environments. Seeking a technical internship to apply and grow these skills.",
};

export const hobbies = [
  "Photography",
  "Videography",
  "Chess",
  "Hiking",
  "Camping",
  "Road Trips",
] as const;

export const skillGroups = [
  {
    label: "Web & App Frameworks",
    skills: ["ReactJS", "Node.js", "Express", "Django", "TailwindCSS"],
  },
  {
    label: "Scripting & Languages",
    skills: ["JavaScript (Node.js)", "Python (Django)"],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    label: "Version Control & Workflow",
    skills: ["Git", "GitHub", "Docker", "Agile / SCRUM"],
  },
  {
    label: "Design & Tools",
    skills: ["Figma", "Canva", "IntelliJ IDEA", "VS Code", "Replit", "Gamma", "HubSpot"],
  },
  {
    label: "AI-Assisted Development",
    skills: ["Claude Code", "Cursor", "Windsurf", "Lovable"],
  },
  {
    label: "Security Exposure",
    skills: ["Infosec Fundamentals", "Kali Linux Basics", "TryHackMe (Pre Security)"],
  },
  {
    label: "Currently Expanding",
    skills: ["Playwright", "CI/CD", "Advanced AWS (Security/DevOps)"],
  },
] as const;

export const projects = [
  {
    frame: "01",
    name: "Ally",
    tagline: "AI-Powered Legal Platform (Capstone)",
    description:
      "Designed the complete UI in Figma and implemented it in React (Vite) as frontend/UI-UX developer, including a chat-first interface for AI-powered legal Q&A, a chat interface between lawyer and client, and role-based flows integrated with a Firebase backend — end-to-end frontend ownership on a multi-user, production-style platform.",
    stack: ["React", "Vite", "Figma", "Firebase"],
    period: "Jan 2025 – Dec 2025",
  },
  {
    frame: "02",
    name: "Notes App",
    tagline: "Hybrid Web2/Web3 Notes Platform",
    description:
      "Built full-stack features for a hybrid Web2/Web3 notes app with Cardano blockchain-based permanence; improved backend rate-limiter reliability and built frontend editor components as part of a 5-person team using Git-based collaboration.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Cardano"],
    period: "Dec 2025",
  },
  {
    frame: "03",
    name: "CampusXperience",
    tagline: "Campus Event Platform",
    description:
      "Built the complete frontend, and contributed as part of a 5-person team to a full-stack web app for campus event discovery, reservation, ticketing, and reminders.",
    stack: ["React", "Vite", "Spring Boot", "Java"],
    period: "May 2025 – Dec 2025",
  },
  {
    frame: "04",
    name: "CrediGo",
    tagline: "System Integration Project",
    description:
      "Independently designed and built the entire web app — frontend UI and backend API integration — for a 3-person System Integration and Architecture course project, owning full-stack development end-to-end from planning through delivery.",
    stack: ["React", "REST API"],
    period: "Apr 2025 – May 2025",
  },
] as const;

export const education = {
  degree: "Bachelor of Science in Information Technology",
  school: "Cebu Institute of Technology – University",
  period: "2022 – Present",
};

export const certifications = [
  { name: "AWS Academy Graduate – Cloud Architecting", date: "Dec 2025" },
  { name: "AWS Academy Graduate – Cloud Foundations", date: "Oct 2025" },
  { name: "IBM – Lifelong Professional Skills", date: "Jul 2026" },
  { name: "CIT-U OJT Readiness Program", date: "Jul 2026" },
] as const;

export const languages = ["English (Professional)", "Filipino (Native)", "Cebuano (Native)"];
