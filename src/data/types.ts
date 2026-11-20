/** Dates are "YYYY-MM" strings. */
export type YearMonth = string;

export interface Link {
  label: string;
  url: string;
}

export interface Job {
  company: string;
  companyUrl?: string;
  role: string;
  type?: string;
  start: YearMonth;
  /** null means "Present". */
  end: YearMonth | null;
  location: string;
  highlights: string[];
  links?: Link[];
}

export interface Project {
  name: string;
  summary: string;
  details?: string[];
  stack: string[];
  links: Link[];
  featured?: boolean;
  /** Source is in a private repo; shown as a note instead of a link. */
  private?: boolean;
}

export interface Rating {
  site: string;
  handle: string;
  url: string;
  title: string;
  maxRating?: number;
}

export interface Contest {
  name: string;
  year: number;
  place: number;
  team?: string;
  url?: string;
}

export interface ProblemCredit {
  contest: string;
  problem?: string;
  role: "Setter" | "Tester";
  date: YearMonth;
  url?: string;
}

export interface Education {
  school: string;
  schoolUrl?: string;
  degree: string;
  start: YearMonth;
  end: YearMonth;
  note?: string;
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  pitch: string;
  about: string[];
  email: string;
  links: Link[];
  experience: Job[];
  projects: Project[];
  cp: {
    ratings: Rating[];
    solved: string;
    contests: Contest[];
    problemCredits: ProblemCredit[];
    teaching: string;
  };
  skills: { group: string; items: string[] }[];
  education: Education[];
  /** "YYYY-MM-DD" */
  updated: string;
}
