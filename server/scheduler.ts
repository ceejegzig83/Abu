import {
  runNewsDiscoveryJob,
  loadSettings,
  addLog,
  getSchedulerStatus,
} from './newsMonitorService.js';
import { SchedulerStatus } from '../src/types/monitor.js';

let intervalId: NodeJS.Timeout | null = null;
let isJobActive = false;
let lastRunTime: string | undefined = undefined;
let nextRunTime: string | undefined = undefined;

function calculateNextRun(hours: number): string {
  const d = new Date();
  d.setHours(d.getHours() + hours);
  return d.toISOString();
}

export async function executeScheduledDiscovery(): Promise<void> {
  if (isJobActive) {
    console.log('[Scheduler] Scan job already in progress, skipping concurrent trigger.');
    return;
  }

  isJobActive = true;
  lastRunTime = new Date().toISOString();

  try {
    console.log('[Scheduler] Starting automated news discovery scan...');
    const result = await runNewsDiscoveryJob();
    console.log(
      `[Scheduler] Scan finished. Found: ${result.articlesFound}, Added: ${result.articlesAdded}, Duplicates: ${result.duplicatesSkipped}`
    );
  } catch (err: any) {
    console.error('[Scheduler] Error during discovery run:', err);
    addLog({
      type: 'error',
      message: `Scheduled discovery failed: ${err?.message || err}`,
      articlesFound: 0,
      articlesAdded: 0,
      duplicateCount: 0,
    });
  } finally {
    isJobActive = false;
    const settings = loadSettings();
    nextRunTime = calculateNextRun(settings.frequencyHours || 6);
  }
}

export function startScheduler(): void {
  const settings = loadSettings();

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  if (!settings.autoScanEnabled) {
    console.log('[Scheduler] Auto-scan is disabled in settings.');
    nextRunTime = undefined;
    return;
  }

  const intervalMs = Math.max(1, settings.frequencyHours) * 60 * 60 * 1000;
  nextRunTime = calculateNextRun(settings.frequencyHours);

  console.log(`[Scheduler] Initializing automated monitor job every ${settings.frequencyHours}h.`);

  // Run initial scan on startup after 5 seconds to ensure server is fully ready
  setTimeout(() => {
    executeScheduledDiscovery();
  }, 5000);

  intervalId = setInterval(() => {
    executeScheduledDiscovery();
  }, intervalMs);
}

export function stopScheduler(): void {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  nextRunTime = undefined;
  console.log('[Scheduler] Automated monitor stopped.');
}

export function restartSchedulerWithNewFrequency(hours: number): void {
  stopScheduler();
  startScheduler();
}

export function getStatus(): SchedulerStatus {
  const status = getSchedulerStatus(Boolean(intervalId), nextRunTime, lastRunTime);
  status.isJobActive = isJobActive;
  return status;
}
