import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import newsMonitorRouter from './server/routes/newsMonitorRouter.js';
import { startScheduler } from './server/scheduler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Body parsing middleware
app.use(express.json());

// API Routes
app.use('/api/news-monitor', newsMonitorRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Hon. Jibril Abu II Official Platform & News Monitor',
  });
});

// Vite Middleware for Dev vs Static for Prod
async function setupFrontend() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

// Start Server and Background Monitor Scheduler
async function main() {
  await setupFrontend();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Official portal running at http://0.0.0.0:${PORT}`);
    // Start automated background news monitor
    startScheduler();
  });
}

main().catch((err) => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});
