import {
  MonitoredArticle,
  MonitorSettings,
  SchedulerStatus,
  DiscoveryLog,
  EditorialStatus,
} from '../types/monitor';

const API_BASE = '/api/news-monitor';

export async function getSchedulerStatus(): Promise<SchedulerStatus> {
  const res = await fetch(`${API_BASE}/status`);
  if (!res.ok) throw new Error('Failed to fetch scheduler status');
  return res.json();
}

export async function triggerManualDiscovery(): Promise<{
  success: boolean;
  result: {
    articlesFound: number;
    articlesAdded: number;
    duplicatesSkipped: number;
    errors: string[];
  };
  status: SchedulerStatus;
}> {
  const res = await fetch(`${API_BASE}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Discovery run failed');
  return res.json();
}

export async function getMonitorQueue(
  statusFilter = 'all',
  search = ''
): Promise<MonitoredArticle[]> {
  const params = new URLSearchParams();
  if (statusFilter !== 'all') params.set('status', statusFilter);
  if (search) params.set('search', search);

  const res = await fetch(`${API_BASE}/queue?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch editorial queue');
  return res.json();
}

export async function getMonitorSettings(): Promise<MonitorSettings> {
  const res = await fetch(`${API_BASE}/settings`);
  if (!res.ok) throw new Error('Failed to fetch monitor settings');
  return res.json();
}

export async function updateMonitorSettings(
  settings: Partial<MonitorSettings>
): Promise<MonitorSettings> {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error('Failed to update monitor settings');
  return res.json();
}

export async function updateArticleDraft(
  id: string,
  updates: {
    headline?: string;
    shortSummary?: string;
    fullBody?: string;
    category?: string;
    actor?: string;
  }
): Promise<MonitoredArticle> {
  const res = await fetch(`${API_BASE}/article/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update draft');
  return res.json();
}

export async function performEditorialAction(
  id: string,
  action: 'approve' | 'publish' | 'reject' | 'archive' | 'unpublish',
  notes?: string,
  actor = 'Authorized Administrator'
): Promise<MonitoredArticle> {
  const res = await fetch(`${API_BASE}/article/${id}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, notes, actor }),
  });
  if (!res.ok) throw new Error(`Action ${action} failed`);
  return res.json();
}

export async function deleteMonitoredArticle(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/article/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete monitored article');
}

export async function getDiscoveryLogs(): Promise<DiscoveryLog[]> {
  const res = await fetch(`${API_BASE}/logs`);
  if (!res.ok) throw new Error('Failed to fetch discovery logs');
  return res.json();
}

export async function getPublishedMonitoredNews(): Promise<MonitoredArticle[]> {
  try {
    const res = await fetch(`${API_BASE}/published`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
