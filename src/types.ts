export interface ProfileInfo {
  name: string;
  callsign: string;
  taglineTitle: string;
  mainTitle: string;
  subtitle: string;
  level: number;
  rank: string;
  status: string;
  location: string;
  coordinates: string;
  serverPing: string;
  serverRegion: string;
  avatar: string;
  characterImage: string;
  vehicleImage: string;
  titleBgImage: string;
  lobbyBgImage: string;
  bio: string;
  shortBio: string;
  yearsOfExperience: string;
  careerGoals: string;
  personalInterests: string[];
  technicalInterests: string[];
  resumeUrl: string;
  education: {
    degree: string;
    institution: string;
    year: string;
    details: string;
  }[];
  currencies: {
    bp: string;
    uc: string;
    rpLevel: number;
  };
}

export interface Project {
  id: string;
  title: string;
  codename: string;
  subtitle: string;
  category: 'LLM Agents' | 'Backend & AI' | 'Safety & Tooling' | 'Backend & APIs' | 'Real-Time 3D' | 'Shader Tech' | 'Creative Web' | 'Game Engine' | string;
  year: string;
  clientOrStudio: string;
  image: string;
  screenshots?: string[];
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  description: string;
  problem?: string;
  solution?: string;
  role?: string;
  responsibilities?: string[];
  architecture?: string;
  features: string[];
  challenges?: string[];
  howSolved?: string[];
  resultsImpact: string[];
  lessonsLearned?: string[];
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  dates: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Lead';
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  link?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  tier: 'MASTER' | 'EXPERT' | 'ADVANCED';
  note: string;
}

export interface SkillCategory {
  title: string;
  code: string;
  iconName: string;
  skills: SkillItem[];
}

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon: string;
  color?: string;
  highlight?: boolean;
}

export interface DirectiveStat {
  label: string;
  value: string;
  unit?: string;
  subtext: string;
}

export interface HobbyItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  description: string;
  highlight: string;
}

export type ActiveHudTab = 'none' | 'profile_dossier' | 'hobbies' | 'projects' | 'experience' | 'skills' | 'contact' | 'socials' | 'about';

