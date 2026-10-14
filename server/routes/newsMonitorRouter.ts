import { Router, Request, Response } from 'express';
import {
  loadArticles,
  saveArticles,
  loadSettings,
  saveSettings,
  loadLogs,
  runNewsDiscoveryJob,
} from '../newsMonitorService.js';
import {
  getStatus,
  executeScheduledDiscovery,
  restartSchedulerWithNewFrequency,
} from '../scheduler.js';
import { EditorialStatus, MonitoredArticle } from '../../src/types/monitor.js';

const router = Router();

// GET /api/news-monitor/status
router.get('/status', (req: Request, res: Response) => {
  try {
    const status = getStatus();
    res.json(status);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error getting scheduler status' });
  }
});

// POST /api/news-monitor/run (Manual on-demand trigger)
router.post('/run', async (req: Request, res: Response) => {
  try {
    const result = await runNewsDiscoveryJob();
    const status = getStatus();
    res.json({
      success: true,
      result,
      status,
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Discovery run failed' });
  }
});

// GET /api/news-monitor/settings
router.get('/settings', (req: Request, res: Response) => {
  try {
    const settings = loadSettings();
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error getting settings' });
  }
});

// POST /api/news-monitor/settings
router.post('/settings', (req: Request, res: Response) => {
  try {
    const updated = saveSettings(req.body);
    restartSchedulerWithNewFrequency(updated.frequencyHours);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error saving settings' });
  }
});

// GET /api/news-monitor/queue
router.get('/queue', (req: Request, res: Response) => {
  try {
    const articles = loadArticles();
    const statusFilter = req.query.status as string;
    const search = (req.query.search as string || '').toLowerCase();

    let filtered = articles;
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }
    if (search) {
      filtered = filtered.filter(
        (a) =>
          a.headline.toLowerCase().includes(search) ||
          a.shortSummary.toLowerCase().includes(search) ||
          a.source.name.toLowerCase().includes(search)
      );
    }

    res.json(filtered);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error fetching queue' });
  }
});

// GET /api/news-monitor/published (For public news feed consumption)
router.get('/published', (req: Request, res: Response) => {
  try {
    const articles = loadArticles();
    const published = articles.filter((a) => a.status === 'published');
    res.json(published);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error fetching published news' });
  }
});

// GET /api/news-monitor/article/:id
router.get('/article/:id', (req: Request, res: Response) => {
  try {
    const articles = loadArticles();
    const article = articles.find((a) => a.id === req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error fetching article' });
  }
});

// PUT /api/news-monitor/article/:id (Edit draft contents)
router.put('/article/:id', (req: Request, res: Response) => {
  try {
    const articles = loadArticles();
    const index = articles.findIndex((a) => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const { headline, shortSummary, fullBody, category } = req.body;
    const current = articles[index];

    const updated: MonitoredArticle = {
      ...current,
      headline: headline ?? current.headline,
      shortSummary: shortSummary ?? current.shortSummary,
      fullBody: fullBody ?? current.fullBody,
      category: category ?? current.category,
      auditTrail: [
        ...current.auditTrail,
        {
          action: 'Content Edited',
          actor: req.body.actor || 'Administrator',
          timestamp: new Date().toISOString(),
          notes: 'Draft text updated in editorial portal.',
        },
      ],
    };

    articles[index] = updated;
    saveArticles(articles);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error updating article' });
  }
});

// POST /api/news-monitor/article/:id/action (Approve, Publish, Reject, Archive, Unpublish)
router.post('/article/:id/action', (req: Request, res: Response) => {
  try {
    const articles = loadArticles();
    const index = articles.findIndex((a) => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const { action, actor = 'Administrator', notes } = req.body;
    const current = articles[index];

    let targetStatus: EditorialStatus = current.status;
    let auditAction = '';

    switch (action) {
      case 'approve':
        targetStatus = 'approved';
        auditAction = 'Article Approved for Publication';
        break;
      case 'publish':
        targetStatus = 'published';
        auditAction = 'Article Published to Live Website';
        break;
      case 'unpublish':
        targetStatus = 'approved';
        auditAction = 'Article Unpublished to Approved Draft';
        break;
      case 'reject':
        targetStatus = 'rejected';
        auditAction = 'Article Rejected by Editorial Review';
        break;
      case 'archive':
        targetStatus = 'archived';
        auditAction = 'Article Archived';
        break;
      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }

    const updated: MonitoredArticle = {
      ...current,
      status: targetStatus,
      reviewedBy: actor,
      reviewedAt: new Date().toISOString(),
      auditTrail: [
        ...current.auditTrail,
        {
          action: auditAction,
          actor,
          timestamp: new Date().toISOString(),
          notes: notes || undefined,
        },
      ],
    };

    articles[index] = updated;
    saveArticles(articles);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error processing action' });
  }
});

// DELETE /api/news-monitor/article/:id
router.delete('/article/:id', (req: Request, res: Response) => {
  try {
    const articles = loadArticles();
    const filtered = articles.filter((a) => a.id !== req.params.id);
    if (filtered.length === articles.length) {
      return res.status(404).json({ error: 'Article not found' });
    }
    saveArticles(filtered);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error deleting article' });
  }
});

// GET /api/news-monitor/logs
router.get('/logs', (req: Request, res: Response) => {
  try {
    const logs = loadLogs();
    res.json(logs);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error fetching logs' });
  }
});

export default router;
