export type UserRole = "worker" | "employer";

export type BackgroundCheckStatus =
  | "none"
  | "requested"
  | "in_progress"
  | "complete";

export type ProfileVisibility = "publicMinimal" | "privateUntilApplied";

export type JobCategory =
  | "Carpentry"
  | "Electrical"
  | "Plumbing"
  | "HVAC / Refrigeration"
  | "Masonry / Concrete"
  | "Roofing / Framing"
  | "Welding / Fabrication"
  | "General Construction Labor"
  | "Site Cleanup / Demolition"
  | "Residential Cleaning"
  | "Handyman / Maintenance"
  | "Landscaping / Lawn Care"
  | "Gardening / Tree Trimming"
  | "Painting / Drywall"
  | "Pool Maintenance"
  | "Snow Removal"
  | "Pest Control"
  | "Line Cook / Prep Cook"
  | "Server / Waitstaff"
  | "Bartender"
  | "Dishwasher"
  | "Host / Front Desk"
  | "Housekeeping (Hotels, Airbnb)"
  | "Catering & Events"
  | "Barista / Café Assistant"
  | "Childcare / Nanny"
  | "Elder Care / Companion"
  | "Home Health Aide"
  | "Personal Care Assistant"
  | "Pet Sitting / Dog Walking"
  | "Housekeeper / Domestic Worker"
  | "Delivery Driver"
  | "Courier / Messenger"
  | "Mover / Loader"
  | "Forklift Operator"
  | "Warehouse Associate"
  | "Inventory Clerk"
  | "Fleet Maintenance"
  | "Janitorial / Custodial"
  | "Security / Night Watch"
  | "Building Maintenance"
  | "Groundskeeping"
  | "Mailroom / Logistics"
  | "Equipment Technician";

export type EmployerVerificationLevel = "basic" | "verified";

export type JobStatus = "open" | "paused" | "closed";

export interface ReferenceItem {
  type: "file" | "text";
  value: string;
}

export interface WorkerProfile {
  id: string;
  firstName: string;
  lastName?: string;
  alias?: string;
  cityArea?: string;
  address?: string;
  skills: string[];
  languages: string[];
  experienceYears: number;
  availability: {
    daysOfWeek: string[];
    timeBlocks: string[];
  };
  payExpectationHourly?: number | { min: number; max: number };
  introVideoUrl?: string;
  backgroundCheckStatus: BackgroundCheckStatus;
  references: ReferenceItem[];
  reliabilityScore?: number;
  profileVisibility: ProfileVisibility;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobPost {
  id: string;
  title: string;
  category: JobCategory;
  description: string;
  skillsRequired: string[];
  languageRequirements: string[];
  payRangeHourly: {
    min: number;
    max: number;
  };
  locationCityArea: string;
  schedule: {
    startDate: Date;
    daysOfWeek: string[];
    timeBlocks: string[];
  };
  requireIntroVideo: boolean;
  requireBackgroundCheck: boolean;
  requireReferences: boolean;
  employerVerificationLevel: EmployerVerificationLevel;
  status: JobStatus;
  employerId: string;
  employerName: string;
  applicantCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  body: string;
  sentAt: Date;
  read: boolean;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  avatar?: string;
  verified: boolean;
  backgroundCheckStatus: BackgroundCheckStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  jobId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
