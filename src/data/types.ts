/** A photo stored in src/assets/photos/. `file` is its file name there. */
export interface Photo {
  file: string;
  /** Describes the photo for screen readers, e.g. "Team RUET_Scanline on stage". */
  alt: string;
  /** Optional dark-mode version of the same picture, also in src/assets/photos/. */
  dark?: string;
  caption?: string;
}

/** Marks where a photo will go; shows an empty frame until it is replaced by a Photo. */
export interface PendingPhoto {
  pending: true;
  caption?: string;
}

export type PhotoSlot = Photo | PendingPhoto;

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
  photo?: PhotoSlot;
}

export interface Project {
  name: string;
  /** What kind of thing it is, shown as "01 · Web app". */
  kind: string;
  /** Platforms it runs on, e.g. "Web, Android". */
  runsOn: string;
  /** Set only when it is true right now, e.g. "Live". */
  status?: string;
  summary: string;
  details?: string[];
  stack: string[];
  /** Hardware or other tools the build needed, listed after the stack. */
  tools?: string[];
  links: Link[];
  featured?: boolean;
  /** Source is in a private repo; shown as a note instead of a link. */
  private?: boolean;
  /** A screenshot of the project works best. */
  photo?: PhotoSlot;
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
  photo?: PhotoSlot;
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
  /** Omitted for school certificates, which show only their year. */
  start?: YearMonth;
  /** "YYYY-MM", or "YYYY" when only the year matters. */
  end: string;
  note?: string;
  photo?: PhotoSlot;
}


export interface Profile {
  name: string;
  headline: string;
  /** Finishes the hero sentence "I'm <name>, …". */
  lead: string;
  location: string;
  pitch: string;
  about: string[];
  email: string;
  /** International format, e.g. "+8801XXXXXXXXX". */
  whatsapp?: string;
  /** Path to the CV PDF under public/. */
  cv?: string;
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
  hobbies: { title: string; text: string }[];
  /** Shown beside the name; an initials tile stands in until it is set. */
  photo?: Photo;
  /** "YYYY-MM-DD" */
  updated: string;
}
