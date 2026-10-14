export type EditorialStatus =
  | 'pending_review'
  | 'approved'
  | 'published'
  | 'rejected'
  | 'archived';

export interface DiscoveredSource {
  name: string;
  url: string;
  domain: string;
  publishedAt: string;
  originalTitle: string;
  originalSnippet: string;
  fullRawText?: string;
  author?: string;
}

export interface MonitoredArticle {
  id: string;
  slug: string;
  status: EditorialStatus;
  headline: string;
  shortSummary: string;
  fullBody: string;
  category: string;
  source: DiscoveredSource;
  discoveredAt: string;
  publishedAt: string; // Original article publication date
  imageUrl?: string;
  confidenceScore: number; // 0 to 1
  verificationNotes: string;
  hasUnverifiedClaims: boolean;
  unverifiedClaimsDetails?: string;
  canonicalUrlHash: string;
  reviewedBy?: string;
  reviewedAt?: string;
  auditTrail: {
    action: string;
    actor: string;
    timestamp: string;
    notes?: string;
  }[];
}

export interface DiscoveryLog {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  sourceName?: string;
  message: string;
  articlesFound: number;
  articlesAdded: number;
  duplicateCount: number;
}

export interface MonitorSettings {
  autoScanEnabled: boolean;
  frequencyHours: number; // default: 6
  trustedDomains: string[];
  keywords: string[];
  autoApproveLowRisk: boolean; // default: false (everything requires human approval)
  facebookPageName: string;
  facebookIntegrationStatus: 'connected_live' | 'manual_fallback' | 'permission_pending';
}

export interface SchedulerStatus {
  isRunning: boolean;
  isJobActive: boolean;
  lastRunTime?: string;
  nextRunTime?: string;
  frequencyHours: number;
  totalDiscovered: number;
  pendingReviewCount: number;
  approvedCount: number;
  publishedCount: number;
  rejectedCount: number;
  lastError?: string;
}
