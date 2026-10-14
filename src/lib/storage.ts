import {
  Project,
  NewsArticle,
  LegislativeActivity,
  CommunitySubmission,
  MediaItem,
  SiteSettings,
  AdminUser,
} from '../types';
import {
  initialSiteSettings,
  initialProjects,
  initialNews,
  initialLegislativeActivities,
  initialSubmissions,
  initialMediaItems,
  mockAdminUsers,
} from '../data/initialData';

const STORAGE_KEYS = {
  SETTINGS: 'wisdombank_site_settings',
  PROJECTS: 'wisdombank_projects',
  NEWS: 'wisdombank_news',
  LEGISLATIVE: 'wisdombank_legislative',
  SUBMISSIONS: 'wisdombank_submissions',
  MEDIA: 'wisdombank_media',
  AUTH_USER: 'wisdombank_auth_user',
};

type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error('Error notifying listener:', e);
    }
  });
}

export function subscribeToStore(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// LocalStorage helpers with fallback
function getStoredItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Could not load key ${key} from localStorage:`, e);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyListeners();
  } catch (e) {
    console.error(`Could not write key ${key} to localStorage:`, e);
  }
}

// Site Settings
export function getSiteSettings(): SiteSettings {
  return getStoredItem<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
}

export function updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  const current = getSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...settings,
    feedConfig: {
      ...current.feedConfig,
      ...(settings.feedConfig || {}),
    },
  };
  setStoredItem(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

// Projects
export function getProjects(): Project[] {
  return getStoredItem<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug || p.id === slug);
}

export function saveProject(project: Project): void {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    projects[index] = { ...project, updatedAt: new Date().toISOString().split('T')[0] };
  } else {
    projects.unshift(project);
  }
  setStoredItem(STORAGE_KEYS.PROJECTS, projects);
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter((p) => p.id !== id);
  setStoredItem(STORAGE_KEYS.PROJECTS, projects);
}

// News
export function getNewsArticles(includeDrafts = false): NewsArticle[] {
  const news = getStoredItem<NewsArticle[]>(STORAGE_KEYS.NEWS, initialNews);
  if (includeDrafts) return news;
  return news.filter((n) => n.status === 'published');
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return getNewsArticles(true).find((n) => n.slug === slug || n.id === slug);
}

export function saveNewsArticle(article: NewsArticle): void {
  const news = getNewsArticles(true);
  const index = news.findIndex((n) => n.id === article.id);
  if (index >= 0) {
    news[index] = { ...article, updatedAt: new Date().toISOString().split('T')[0] };
  } else {
    news.unshift(article);
  }
  setStoredItem(STORAGE_KEYS.NEWS, news);
}

export function deleteNewsArticle(id: string): void {
  const news = getNewsArticles(true).filter((n) => n.id !== id);
  setStoredItem(STORAGE_KEYS.NEWS, news);
}

// Legislative
export function getLegislativeActivities(): LegislativeActivity[] {
  return getStoredItem<LegislativeActivity[]>(STORAGE_KEYS.LEGISLATIVE, initialLegislativeActivities);
}

export function saveLegislativeActivity(activity: LegislativeActivity): void {
  const items = getLegislativeActivities();
  const index = items.findIndex((i) => i.id === activity.id);
  if (index >= 0) {
    items[index] = activity;
  } else {
    items.unshift(activity);
  }
  setStoredItem(STORAGE_KEYS.LEGISLATIVE, items);
}

export function deleteLegislativeActivity(id: string): void {
  const items = getLegislativeActivities().filter((i) => i.id !== id);
  setStoredItem(STORAGE_KEYS.LEGISLATIVE, items);
}

// Submissions (Citizen requests & petitions)
export function getSubmissions(): CommunitySubmission[] {
  return getStoredItem<CommunitySubmission[]>(STORAGE_KEYS.SUBMISSIONS, initialSubmissions);
}

export function getSubmissionByReference(ref: string): CommunitySubmission | undefined {
  const cleaned = ref.trim().toUpperCase();
  return getSubmissions().find(
    (s) => s.referenceCode.toUpperCase() === cleaned || s.id === cleaned
  );
}

export function createCommunitySubmission(
  data: Omit<CommunitySubmission, 'id' | 'referenceCode' | 'status' | 'createdAt' | 'updatedAt' | 'publicUpdates'>
): CommunitySubmission {
  const now = new Date().toISOString();
  // Generate random 4-digit reference suffix (e.g., AJK-2025-XXXX)
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  const referenceCode = `AJK-${year}-${randomSuffix}`;
  const id = `sub-${Date.now()}`;

  const newSubmission: CommunitySubmission = {
    ...data,
    id,
    referenceCode,
    status: 'received',
    createdAt: now,
    updatedAt: now,
    publicUpdates: [
      {
        id: `upd-${Date.now()}`,
        timestamp: now,
        status: 'received',
        publicMessage: `Your submission has been securely registered in the constituency system. Your reference tracking number is ${referenceCode}.`,
        author: 'Constituency Records Desk',
      },
    ],
  };

  const list = getSubmissions();
  list.unshift(newSubmission);
  setStoredItem(STORAGE_KEYS.SUBMISSIONS, list);
  return newSubmission;
}

export function updateSubmissionStatus(
  id: string,
  newStatus: CommunitySubmission['status'],
  publicMessage?: string,
  internalNote?: string,
  authorName = 'Staff Officer'
): void {
  const list = getSubmissions();
  const index = list.findIndex((s) => s.id === id);
  if (index >= 0) {
    const sub = list[index];
    const now = new Date().toISOString();
    sub.status = newStatus;
    sub.updatedAt = now;
    if (internalNote) {
      sub.internalNotes = sub.internalNotes
        ? `${sub.internalNotes}\n[${now.split('T')[0]}] ${internalNote}`
        : `[${now.split('T')[0]}] ${internalNote}`;
    }
    if (publicMessage) {
      sub.publicUpdates.push({
        id: `upd-${Date.now()}`,
        timestamp: now,
        status: newStatus,
        publicMessage,
        author: authorName,
      });
    }
    list[index] = sub;
    setStoredItem(STORAGE_KEYS.SUBMISSIONS, list);
  }
}

// Media
export function getMediaItems(): MediaItem[] {
  return getStoredItem<MediaItem[]>(STORAGE_KEYS.MEDIA, initialMediaItems);
}

export function saveMediaItem(item: MediaItem): void {
  const items = getMediaItems();
  const index = items.findIndex((m) => m.id === item.id);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.unshift(item);
  }
  setStoredItem(STORAGE_KEYS.MEDIA, items);
}

export function deleteMediaItem(id: string): void {
  const items = getMediaItems().filter((m) => m.id !== id);
  setStoredItem(STORAGE_KEYS.MEDIA, items);
}

// Auth state (Admin session)
export function getCurrentAdminUser(): AdminUser | null {
  return getStoredItem<AdminUser | null>(STORAGE_KEYS.AUTH_USER, null);
}

export function loginAdminUser(role: AdminUser['role']): AdminUser {
  const user = mockAdminUsers.find((u) => u.role === role) || mockAdminUsers[0];
  setStoredItem(STORAGE_KEYS.AUTH_USER, user);
  return user;
}

export function logoutAdminUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    notifyListeners();
  }
}

// Reset store to initial seed
export function resetStoreToInitial(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.NEWS);
  localStorage.removeItem(STORAGE_KEYS.LEGISLATIVE);
  localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
  localStorage.removeItem(STORAGE_KEYS.MEDIA);
  notifyListeners();
}
