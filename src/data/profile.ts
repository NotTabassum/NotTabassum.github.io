import type { Profile } from "./types";

// Everything on the site comes from this file. Edit it, bump `updated`, run `npm test`, push.

const toph = (slug: string) => `https://toph.co/c/${slug}/standings`;

const profile: Profile = {
  name: "Sumaiya Tabassum",
  headline: "Backend Software Engineer · Go · Competitive Programmer",
  location: "Dhaka, Bangladesh",
  pitch:
    "I build the backend systems that decide who can do what, keep data in sync, and keep the bills right, mostly in Go.",
  about: [
    "I'm a backend engineer at AppsCode, where I work on authorization, data synchronization and billing for a multi-tenant Kubernetes cloud platform.",
    "I came to engineering through competitive programming: Codeforces Specialist, CodeChef 4★, national-level contest placements, and problems I've set and tested for CodeChef and Codeforces rounds.",
    "I studied Computer Science & Engineering at RUET, graduating in 2025.",
  ],
  email: "tabassumoyshee@gmail.com",
  links: [
    { label: "GitHub", url: "https://github.com/NotTabassum" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sumaiya-tabassum00/" },
    { label: "Codeforces", url: "https://codeforces.com/profile/Aurora__" },
    { label: "CodeChef", url: "https://www.codechef.com/users/sumaiya1903045" },
  ],

  experience: [
    {
      company: "AppsCode",
      companyUrl: "https://appscode.com",
      role: "Software Engineer (Backend)",
      type: "Full-time",
      start: "2025-06",
      end: null,
      location: "Dhaka, Bangladesh",
      highlights: [
        "Built fine-grained, relationship-based access control with OpenFGA for a multi-tenant cloud platform: custom roles, organization and client-organization permissions.",
        "Developed an event-driven outbox sync service (Go, PostgreSQL, NATS) that keeps the database and the authorization store consistent, with per-entity sync state, automatic re-sync when the authorization model changes, and reconnection handling.",
        "Shipped billing features: usage data persisted with bucket backups, a billing summary dashboard, end-of-month usage projection and contract-expiry email alerts.",
        "Worked on PostgreSQL operations: PgPool support, failover-enabled logical replication slots, the move to Postgres 17, and a one-command local setup.",
      ],
      links: [
        {
          label: "Public PR: failover-enabled replication slots (kubeops/pgoutbox)",
          url: "https://github.com/kubeops/pgoutbox/pulls?q=is%3Apr+author%3ANotTabassum",
        },
      ],
    },
    {
      company: "Vivasoft Limited",
      companyUrl: "https://vivasoftltd.com",
      role: "Associate Software Engineer (Backend)",
      type: "Part-time",
      start: "2024-11",
      end: "2025-05",
      location: "Rajshahi, Bangladesh",
      highlights: [
        "Designed, built and maintained backend services in Go.",
        "Joined through Weekdemy, a six-month software engineering training program.",
      ],
    },
  ],

  projects: [
    {
      name: "WealthTracker",
      featured: true,
      private: true,
      summary:
        "A personal finance app: paste a bank SMS and it becomes a transaction. Web app plus an Android app, on one Go backend.",
      details: [
        "Add transactions by typing or pasting bank messages, which grew out of my Message Parser service.",
        "Accounts and transfers, budgets that repeat monthly, DPS with automatic installments, recurring payments and a wishlist that shows what your money covers.",
        "Google sign-in, email confirmation, sessions stored server-side, encrypted database connection and backups.",
        "React web app on Vercel, React Native (Expo) Android app prepared for Google Play, Go API on Render, TiDB Cloud database.",
      ],
      stack: ["Go", "MySQL / TiDB", "React", "React Native", "TypeScript"],
      links: [],
    },
    {
      name: "Multi-tenant e-commerce backend",
      private: true,
      summary: "A SaaS backend that lets many shops run on one deployment, each with its own isolated data.",
      stack: ["Go", "PostgreSQL", "Redis"],
      links: [],
    },
    {
      name: "Message Parser",
      private: true,
      summary: "A microservice that reads bank SMS messages and extracts the transaction details from each one.",
      stack: ["Go"],
      links: [],
    },
    {
      name: "Wardrobe",
      private: true,
      summary: "A digital closet that catalogues your clothes and suggests today's outfit with the weather in mind. Go backend with web and mobile apps.",
      stack: ["Go", "React", "React Native", "TypeScript"],
      links: [],
    },
    {
      name: "Meal Management",
      summary: "Backend for planning and tracking shared meals, with JWT authentication.",
      stack: ["Go", "Echo", "GORM", "MySQL"],
      links: [{ label: "GitHub", url: "https://github.com/NotTabassum/meal-management" }],
    },
    {
      name: "Fingerprint Attendance System",
      summary: "Biometric attendance for offices and classrooms: fingerprint verification with time-stamped records.",
      stack: ["C++", "Arduino"],
      links: [{ label: "GitHub", url: "https://github.com/NotTabassum/Fingerprint-Attendance-System" }],
    },
  ],

  cp: {
    ratings: [
      { site: "Codeforces", handle: "Aurora__", url: "https://codeforces.com/profile/Aurora__", title: "Specialist", maxRating: 1533 },
      { site: "CodeChef", handle: "sumaiya1903045", url: "https://www.codechef.com/users/sumaiya1903045", title: "4★", maxRating: 1824 },
      { site: "AtCoder", handle: "freedom_seeker", url: "https://atcoder.jp/users/freedom_seeker", title: "7 Kyu", maxRating: 732 },
    ],
    solved: "1500+",
    contests: [
      { name: "Ada Lovelace National Girls' Programming Contest", year: 2022, place: 6, team: "RUET_Scanline", url: toph("alngpc-2022") },
      { name: "RUET CodeSmash", year: 2020, place: 6, url: "https://toph.co/contests/training/kdze4d6/standings" },
      { name: "National Girls' Programming Contest", year: 2021, place: 12, team: "RUET_Scanline", url: toph("ngpc-2021") },
      { name: "Breaking Code '23, CSE MBSTU", year: 2023, place: 16, team: "RUET_Flamingo", url: toph("mbstu-cse-inter-department-2023") },
      { name: "National Girls' Programming Contest", year: 2022, place: 17, team: "RUET_Scanline 2.0", url: toph("national-girls-programming-contest-2022") },
      { name: "SEC Inter University Junior Programming Contest", year: 2022, place: 32, team: "RUET_GARBAGE_COLLECTOR", url: toph("sec-inter-university-junior-2022") },
    ],
    problemCredits: [
      { contest: "CodeChef Starters 150", problem: "Replacing Game", role: "Setter", date: "2024-09", url: "https://www.codechef.com/problems/REPLACEGAME" },
      { contest: "CodeTON Round 8", role: "Tester", date: "2024-03", url: "https://codeforces.com/blog/entry/126265" },
      { contest: "Codeforces Round 925", role: "Tester", date: "2024-02", url: "https://codeforces.com/blog/entry/125787" },
      { contest: "Code To Save A Mother", problem: "Sum & Multiple", role: "Setter", date: "2021-05", url: "https://toph.co/p/sum-multiple" },
    ],
    teaching: "Ran competitive programming sessions and set practice contests for students at RUET.",
  },

  skills: [
    { group: "Languages", items: ["Go", "C", "C++", "Python", "TypeScript"] },
    { group: "Backend & data", items: ["PostgreSQL", "MySQL", "Redis", "NATS", "OpenFGA", "Gin", "Echo", "GORM", "Docker"] },
    { group: "Frontend & mobile", items: ["React", "React Native"] },
    { group: "Foundations", items: ["Algorithms", "Data structures", "Number theory", "Deep learning"] },
  ],

  education: [
    {
      school: "Rajshahi University of Engineering & Technology (RUET)",
      schoolUrl: "https://www.ruet.ac.bd",
      degree: "BSc in Computer Science & Engineering",
      start: "2020-01",
      end: "2025-06",
      note: "Thesis: faster, more accurate fingerprint recognition with deep learning.",
    },
  ],

  updated: "2026-11-20",
};

export default profile;
