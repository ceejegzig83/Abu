export type ProjectStatus =
  | 'proposed'
  | 'announced'
  | 'approved'
  | 'ongoing'
  | 'completed'
  | 'on_hold'
  | 'awaiting_verification';

export type ProjectCategory =
  | 'Healthcare'
  | 'Roads & Infrastructure'
  | 'Water Access'
  | 'Constituency Support'
  | 'Education'
  | 'Land Administration'
  | 'Youth & Women Empowerment';

export interface ProjectProgressUpdate {
  date: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  location: string;
  status: ProjectStatus;
  imageUrl?: string;
  publishedAt: string;
  updatedAt: string;
  evidenceUrls?: string[];
  featured: boolean;
  progressUpdates?: ProjectProgressUpdate[];
  targetBeneficiaries?: string;
  verificationNote?: string;
}

export type NewsStatus = 'draft' | 'published' | 'archived';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  featuredImage?: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: NewsStatus;
  sourceUrl?: string;
  featured?: boolean;
}

export type LegislativeActivityType =
  | 'bill'
  | 'motion'
  | 'committee_meeting'
  | 'public_hearing'
  | 'house_proceeding'
  | 'official_statement';

export interface LegislativeActivity {
  id: string;
  title: string;
  activityType: LegislativeActivityType;
  date: string;
  summary: string;
  fullDetails: string;
  session: string;
  committeeRole?: string;
  officialDocumentUrl?: string;
  outcomes?: string;
}

export type SubmissionStatus =
  | 'received'
  | 'under_review'
  | 'referred'
  | 'response_provided'
  | 'closed';

export type SubmissionCategory =
  | 'Road and Infrastructure'
  | 'Water and Sanitation'
  | 'Healthcare'
  | 'Education'
  | 'Community Support'
  | 'Land-Related Concern'
  | 'Petition'
  | 'Other';

export interface SubmissionUpdate {
  id: string;
  timestamp: string;
  status: SubmissionStatus;
  publicMessage: string;
  internalNote?: string;
  author: string;
}

export interface CommunitySubmission {
  id: string;
  referenceCode: string; // e.g. AJK-2025-XXXX
  fullName: string;
  email?: string;
  phone?: string;
  community: string;
  category: SubmissionCategory;
  subject: string;
  description: string;
  location?: string;
  preferredContact: 'email' | 'phone' | 'sms';
  consent: boolean;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  internalNotes?: string;
  publicUpdates: SubmissionUpdate[];
}

export type MediaItemType = 'photo' | 'video';

export interface MediaItem {
  id: string;
  title: string;
  mediaType: MediaItemType;
  url: string;
  altText: string;
  caption?: string;
  category: string;
  publishedAt: string;
  eventDate?: string;
}

export type FeedProvider = 'elfsight' | 'smashballoon' | 'facebook' | 'manual';

export interface FeedConfiguration {
  provider: FeedProvider;
  enabled: boolean;
  pageUrl: string;
  pageName: string;
  widgetId?: string;
  showFallbackOnFailure: boolean;
}

export interface SiteSettings {
  representativeName: string;
  publicIdentity: string;
  constituency: string;
  stateAssembly: string;
  committeeRole: string;
  tagline: string;
  officialEmail: string;
  officialPhone: string;
  officeAddress: string;
  contactHours: string;
  facebookUrl: string;
  feedConfig: FeedConfiguration;
  emergencyNotice?: string;
}

export type UserRole = 'admin' | 'editor' | 'case_officer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
