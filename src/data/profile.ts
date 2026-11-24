import type { Profile } from "./types";

// Everything on the site comes from this file. Edit it, bump `updated`, run `npm test`, push.

const toph = (slug: string) => `https://toph.co/c/${slug}/standings`;

const profile: Profile = {
  name: "Sumaiya Tabassum",
  headline: "Backend Software Engineer · Go · Competitive Programmer",
  lead: "a backend engineer and competitive programmer.",
  location: "Dhaka, Bangladesh",
  pitch:
    "I design and build backend systems in Go, specializing in access control, data synchronization and billing for multi-tenant cloud platforms. I also have five years of experience in competitive programming and contribute as a problem setter and tester for national and international contests.",
  about: [
    "I'm a backend engineer at AppsCode, where I work on authorization, data synchronization and billing for a multi-tenant Kubernetes cloud platform.",
    "I came to engineering through competitive programming: Codeforces Specialist, CodeChef 4★, national-level contest placements, and problems I've set and tested for CodeChef and Codeforces rounds.",
    "I studied Computer Science & Engineering at RUET, graduating in 2025.",
  ],
  email: "tabassumoyshee@gmail.com",
  /** Published on purpose as a WhatsApp contact; the privacy tests allow this one number only. */
  whatsapp: "+8801975466200",
  /** Served from public/. */
  cv: "/Sumaiya_Tabassum_CV.pdf",
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
        "Own much of the platform's OpenFGA authorization model: custom roles and permissions, client organizations, team and licensed-cluster access, and automatic cleanup of authorization data when resources are deleted.",
        "Built core parts of the event-driven outbox sync service (Go, PostgreSQL, NATS) that keeps the database and the authorization store consistent: per-entity sync state, automatic resync when the authorization model changes, recovery of missed resources and resilient NATS reconnection.",
        "Delivered billing features end to end: monthly billable usage stored in PostgreSQL with object-storage backups, a billing summary dashboard, end-of-month usage projections, contract-expiry email alerts and contract cluster tracking.",
        "Strengthened the PostgreSQL layer: PgPool support, failover-enabled logical replication slots, the upgrade to PostgreSQL 17 and primary-only reads where consistency matters.",
        "Improved developer experience with a one-command local setup and realistic demo and billing data generators for testing.",
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
        "Designed and built backend services in Go, including the complete backend of the company's internal meal management system.",
        "Joined through Weekdemy, a six-month, part-time software engineering program, completed alongside my final year of undergraduate studies.",
      ],
    },
  ],

  projects: [
    {
      name: "WealthTracker",
      kind: "Web + mobile app",
      runsOn: "Web, Android",
      status: "Live",
      featured: true,
      private: true,
      summary:
        "A personal finance platform that turns bank SMS messages into recorded transactions and brings accounts, budgets, savings and net worth together in one place, on the web and Android.",
      details: [
        "Add transactions by typing or by pasting bank messages.",
        "Accounts and transfers, budgets that repeat monthly, DPS with automatic installments, recurring payments and a wishlist that shows what your money covers.",
        "Google sign-in, email confirmation, sessions stored server-side, encrypted database connection and backups.",
        "React web app on Vercel, React Native (Expo) Android app prepared for Google Play, Go API on Render, TiDB Cloud database.",
      ],
      stack: ["Go", "MySQL", "React", "React Native", "TypeScript"],
      links: [{ label: "Live Site", url: "https://wealthtracker-app.vercel.app" }],
      photo: {
        file: "wealthtracker-add-from-message.png",
        dark: "wealthtracker-add-from-message-dark.png",
        alt: "WealthTracker’s add-from-message box: the message “today lunch 250” becomes a 250 BDT lunch expense paid in cash, ready to save",
      },
    },
    {
      name: "Wardrobe",
      kind: "Web + mobile app",
      runsOn: "Web, Android",
      status: "In progress",
      private: true,
      summary: "A digital wardrobe platform that catalogues clothing and accessories from photos, extracts their colours automatically and recommends outfits by colour harmony and season, across web and mobile.",
      stack: ["Go", "React", "React Native", "TypeScript"],
      links: [],
      photo: {
        file: "wardrobe-preview.png",
        dark: "wardrobe-preview-dark.png",
        alt: "Design preview of the Wardrobe closet: categories, season and colour filters, catalogued pieces with extracted colours, an outfit suggestion and a wishlist",
      },
    },
    {
      name: "Meal Management",
      kind: "Backend",
      runsOn: "Web",
      status: "Live, internal to Vivasoft",
      summary: "I built the complete backend of Vivasoft's internal meal management system, covering employees and departments, meal planning and preferences, holidays, extra-meal requests, scheduled jobs and notifications by email, SMS, push and chat. It was my first project to go into production.",
      stack: ["Go", "Echo", "GORM", "MySQL"],
      links: [
        { label: "Live Site", url: "https://vivameal.vercel.app" },
        { label: "GitHub", url: "https://github.com/NotTabassum/meal-management" },
      ],
      photo: {
        file: "meal-management-preview.png",
        dark: "meal-management-preview-dark.png",
        alt: "Design preview of the Meal Management admin view: the weekly lunch and snacks plan, daily counts, an employee’s meal toggles and a reminder notification",
      },
    },
    {
      name: "Fingerprint Attendance System",
      kind: "Hardware",
      runsOn: "Arduino Uno",
      summary: "A standalone biometric attendance device: it enrolls and verifies fingerprints, timestamps every check-in with a real-time clock, guides users through an on-device LCD menu and exports the attendance log over serial.",
      stack: ["C++", "Arduino"],
      tools: ["R305S fingerprint sensor", "DS1307 RTC module", "16×2 LCD", "Push buttons", "Breadboard"],
      links: [{ label: "GitHub", url: "https://github.com/NotTabassum/Fingerprint-Attendance-System" }],
      photo: {
        file: "fingerprint-attendance-preview.png",
        alt: "Design preview of the fingerprint attendance device: a 16×2 LCD showing a marked roll, four control buttons, the fingerprint sensor and the real-time clock",
      },
    },
  ],

  cp: {
    ratings: [
      { site: "Codeforces", handle: "Aurora__", url: "https://codeforces.com/profile/Aurora__", title: "Specialist", maxRating: 1533 },
      { site: "CodeChef", handle: "sumaiya1903045", url: "https://www.codechef.com/users/sumaiya1903045", title: "4★", maxRating: 1824 },
    ],
    solved: "1500+",
    contests: [
      { name: "Ada Lovelace National Girls' Programming Contest", year: 2022, place: 6, team: "RUET_Scanline", url: toph("alngpc-2022"), photo: { pending: true } },
      { name: "RUET CodeSmash", year: 2020, place: 6, url: "https://toph.co/contests/training/kdze4d6/standings" },
      { name: "National Girls' Programming Contest", year: 2021, place: 12, team: "RUET_Scanline", url: toph("ngpc-2021"), photo: { pending: true } },
      { name: "Breaking Code '23, CSE MBSTU", year: 2023, place: 16, team: "RUET_Flamingo", url: toph("mbstu-cse-inter-department-2023") },
      { name: "National Girls' Programming Contest", year: 2022, place: 17, team: "RUET_Scanline 2.0", url: toph("national-girls-programming-contest-2022"), photo: { pending: true } },
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
    { group: "Backend", items: ["Go", "OpenFGA", "NATS", "XORM", "GORM"] },
    { group: "Databases", items: ["PostgreSQL", "PgPool", "Logical replication", "MySQL", "SQLite", "Redis"] },
    { group: "Cloud", items: ["Kubernetes", "Helm", "Docker", "S3 object storage", "GitHub Actions"] },
    { group: "Frontend & mobile", items: ["TypeScript", "React", "Next.js", "React Native", "Expo"] },
    { group: "Problem solving", items: ["C++", "Python", "Algorithms", "Data structures"] },
  ],

  education: [
    {
      school: "Rajshahi University of Engineering & Technology (RUET)",
      schoolUrl: "https://www.ruet.ac.bd",
      degree: "BSc in Computer Science & Engineering",
      start: "2020-01",
      end: "2025-06",
      note: "Thesis: faster, more accurate fingerprint recognition with deep learning.",
      photo: { pending: true },
    },
    {
      school: "Holy Cross College",
      degree: "Higher Secondary Certificate (HSC)",
      end: "2019-07",
    },
    {
      school: "A.K. High School",
      degree: "Secondary School Certificate (SSC)",
      end: "2017-05",
    },
  ],

  // Photos go in src/assets/photos/. The portrait beside the name:
  // photo: { file: "me.jpg", alt: "Sumaiya Tabassum" },
  // Projects, contests, jobs and education can each take a photo too. `{ pending: true }` shows an
  // empty frame; replace it with e.g. { file: "ngpc-2022.jpg", alt: "Team RUET_Scanline on stage", caption: "..." }.

  hobbies: [
    { title: "Classical Dance", text: "Trained as a classical Kathak dancer, with four years of study at Bulbul Lalitakala Academy (BAFA)." },
    { title: "Running", text: "A recreational runner who enjoys taking part in marathons; running keeps me focused, disciplined and ready for the next challenge." },
    { title: "Travel & adventure", text: "An avid traveller drawn to new places and new experiences, from scuba diving beneath the sea to parasailing above it." },
  ],

  updated: "2026-11-20",
};

export default profile;
