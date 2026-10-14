import React, { useState, useEffect } from 'react';
import {
  MonitoredArticle,
  EditorialStatus,
  SchedulerStatus,
  DiscoveryLog,
  MonitorSettings,
} from '../../types/monitor';
import {
  getSchedulerStatus,
  triggerManualDiscovery,
  getMonitorQueue,
  updateArticleDraft,
  performEditorialAction,
  deleteMonitoredArticle,
  getDiscoveryLogs,
  getMonitorSettings,
  updateMonitorSettings,
} from '../../lib/monitorApi';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Search,
  Filter,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  FileEdit,
  Send,
  Archive,
  XCircle,
  Eye,
  Sliders,
  History,
  Sparkles,
  Radio,
  FileCheck2,
  Trash2,
} from 'lucide-react';

interface EditorialQueueProps {
  currentActor?: string;
  onArticlePublished?: () => void;
}

export const EditorialQueue: React.FC<EditorialQueueProps> = ({
  currentActor = 'Administrator',
  onArticlePublished,
}) => {
  const [queue, setQueue] = useState<MonitoredArticle[]>([]);
  const [schedulerStatus, setSchedulerStatus] = useState<SchedulerStatus | null>(null);
  const [logs, setLogs] = useState<DiscoveryLog[]>([]);
  const [settings, setSettings] = useState<MonitorSettings | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>('pending_review');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Selected article for side-by-side inspection / edit
  const [inspectingArticle, setInspectingArticle] = useState<MonitoredArticle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editHeadline, setEditHeadline] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editCategory, setEditCategory] = useState('');

  // Modals
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Feedback notification
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [queueData, statusData, settingsData] = await Promise.all([
        getMonitorQueue(statusFilter, searchQuery),
        getSchedulerStatus(),
        getMonitorSettings(),
      ]);
      setQueue(queueData);
      setSchedulerStatus(statusData);
      setSettings(settingsData);
    } catch (err) {
      console.warn('Could not load monitor API (will retry):', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, searchQuery]);

  const handleManualScan = async () => {
    setIsScanning(true);
    try {
      const res = await triggerManualDiscovery();
      showNotice(
        `Discovery finished: ${res.result.articlesFound} sources checked, ${res.result.articlesAdded} new drafts created.`
      );
      await loadData();
    } catch (err: any) {
      showNotice(`Scan error: ${err?.message || err}`);
    } finally {
      setIsScanning(false);
    }
  };

  const handleAction = async (
    id: string,
    action: 'approve' | 'publish' | 'reject' | 'archive' | 'unpublish',
    notes?: string
  ) => {
    try {
      await performEditorialAction(id, action, notes, currentActor);
      showNotice(`Article status updated to: ${action.toUpperCase()}`);
      if (inspectingArticle && inspectingArticle.id === id) {
        setInspectingArticle(null);
      }
      await loadData();
      if (action === 'publish' && onArticlePublished) {
        onArticlePublished();
      }
    } catch (err: any) {
      showNotice(`Action failed: ${err?.message || err}`);
    }
  };

  const handleSaveEdit = async () => {
    if (!inspectingArticle) return;
    try {
      await updateArticleDraft(inspectingArticle.id, {
        headline: editHeadline,
        shortSummary: editSummary,
        fullBody: editBody,
        category: editCategory,
        actor: currentActor,
      });
      setIsEditing(false);
      showNotice('Article draft updated.');
      await loadData();
      // Update local inspecting state
      setInspectingArticle((prev) =>
        prev
          ? {
              ...prev,
              headline: editHeadline,
              shortSummary: editSummary,
              fullBody: editBody,
              category: editCategory,
            }
          : null
      );
    } catch (err: any) {
      showNotice(`Save error: ${err?.message || err}`);
    }
  };

  const handleOpenInspect = (article: MonitoredArticle) => {
    setInspectingArticle(article);
    setEditHeadline(article.headline);
    setEditSummary(article.shortSummary);
    setEditBody(article.fullBody);
    setEditCategory(article.category);
    setIsEditing(false);
  };

  const handleOpenLogs = async () => {
    try {
      const logsData = await getDiscoveryLogs();
      setLogs(logsData);
      setIsLogsModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings) return;
    const form = new FormData(e.currentTarget);
    const frequencyHours = parseInt(form.get('frequencyHours') as string, 10) || 6;
    const autoScanEnabled = form.get('autoScanEnabled') === 'on';
    const autoApproveLowRisk = form.get('autoApproveLowRisk') === 'on';

    try {
      const updated = await updateMonitorSettings({
        frequencyHours,
        autoScanEnabled,
        autoApproveLowRisk,
      });
      setSettings(updated);
      setIsSettingsModalOpen(false);
      showNotice(`Scheduler updated: Every ${frequencyHours} hours.`);
      await loadData();
    } catch (err: any) {
      showNotice(`Settings error: ${err?.message || err}`);
    }
  };

  const statusConfigs: Record<
    EditorialStatus,
    { label: string; bg: string; text: string; dot: string }
  > = {
    pending_review: {
      label: 'Pending Review',
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
    },
    approved: {
      label: 'Approved Draft',
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      dot: 'bg-blue-500',
    },
    published: {
      label: 'Published to Website',
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-800',
      dot: 'bg-emerald-600',
    },
    rejected: {
      label: 'Rejected',
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-700',
      dot: 'bg-red-500',
    },
    archived: {
      label: 'Archived',
      bg: 'bg-slate-100 border-slate-300',
      text: 'text-slate-600',
      dot: 'bg-slate-400',
    },
  };

  return (
    <div className="space-y-6">
      {notice && (
        <div className="p-3 bg-[#1746A2] text-white text-xs font-semibold rounded-xl text-center shadow-xs animate-in fade-in">
          {notice}
        </div>
      )}

      {/* Top Monitor Status & Discovery Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xl font-bold text-[#0B1739]">
                Automated News Discovery & Editorial Verification
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Monitors approved Nigerian news sources, legislative portals, and public dispatches about Hon. Jibril Abu II (Wisdombank). Discovered content is fact-checked and structured by Gemini AI before entering this editorial review queue.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={handleManualScan}
              variant="primary"
              size="sm"
              disabled={isScanning}
              icon={<RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />}
            >
              {isScanning ? 'Searching Sources...' : 'Search for New Updates Now'}
            </Button>

            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
              title="Monitor Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>

            <button
              onClick={handleOpenLogs}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
              title="Discovery Audit Logs"
            >
              <History className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Schedule & Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
              Search Interval
            </span>
            <span className="text-slate-900 font-bold">
              Every {schedulerStatus?.frequencyHours || 6} Hours
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
              Last Search
            </span>
            <span className="text-slate-900 font-medium truncate block">
              {schedulerStatus?.lastRunTime
                ? new Date(schedulerStatus.lastRunTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'Recent'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
              Next Auto Run
            </span>
            <span className="text-[#1746A2] font-semibold truncate block">
              {schedulerStatus?.nextRunTime
                ? new Date(schedulerStatus.nextRunTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'In 6 hours'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
            <span className="text-amber-800 block text-[10px] font-bold uppercase tracking-wider">
              Pending Review
            </span>
            <span className="text-amber-900 font-extrabold text-sm">
              {schedulerStatus?.pendingReviewCount || 0}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
            <span className="text-blue-800 block text-[10px] font-bold uppercase tracking-wider">
              Approved
            </span>
            <span className="text-blue-900 font-extrabold text-sm">
              {schedulerStatus?.approvedCount || 0}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-emerald-800 block text-[10px] font-bold uppercase tracking-wider">
              Live on Site
            </span>
            <span className="text-emerald-900 font-extrabold text-sm">
              {schedulerStatus?.publishedCount || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Queue Navigation */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { id: 'pending_review', label: 'Pending Review' },
              { id: 'approved', label: 'Approved' },
              { id: 'published', label: 'Published' },
              { id: 'rejected', label: 'Rejected' },
              { id: 'archived', label: 'Archived' },
              { id: 'all', label: 'All Articles' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-[#0B1739] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Filter */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search discovered items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#1746A2]"
          />
        </div>
      </div>

      {/* Queue Items List */}
      <div className="space-y-4">
        {queue.length > 0 ? (
          queue.map((article) => {
            const statusConfig = statusConfigs[article.status] || statusConfigs.pending_review;

            return (
              <div
                key={article.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                      {statusConfig.label}
                    </span>

                    <span className="text-xs font-bold text-[#1746A2] bg-blue-50 px-2 py-0.5 rounded">
                      {article.category}
                    </span>

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Original: {article.publishedAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Source:</span>
                    <span>{article.source.name}</span>
                    <a
                      href={article.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1746A2] hover:underline inline-flex items-center gap-0.5"
                    >
                      Original <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Article Headline & Summary */}
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#0B1739] leading-snug">
                    {article.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {article.shortSummary}
                  </p>
                </div>

                {/* Verification & Risk Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confidence: {(article.confidenceScore * 100).toFixed(0)}%
                  </span>

                  {article.hasUnverifiedClaims && (
                    <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Contains Political Opinion / Unverified Claims
                    </span>
                  )}

                  <span className="text-slate-400">
                    Discovered: {new Date(article.discoveredAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Editorial Action Buttons Bar */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleOpenInspect(article)}
                      variant="outline"
                      size="sm"
                      icon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Compare Source & Edit Draft
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {article.status === 'pending_review' && (
                      <>
                        <Button
                          onClick={() => handleAction(article.id, 'approve')}
                          variant="outline"
                          size="sm"
                          icon={<CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                        >
                          Approve Draft
                        </Button>
                        <Button
                          onClick={() => handleAction(article.id, 'publish')}
                          variant="primary"
                          size="sm"
                          icon={<Send className="w-3.5 h-3.5" />}
                        >
                          Publish to Website
                        </Button>
                        <Button
                          onClick={() => handleAction(article.id, 'reject')}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          Reject
                        </Button>
                      </>
                    )}

                    {article.status === 'approved' && (
                      <>
                        <Button
                          onClick={() => handleAction(article.id, 'publish')}
                          variant="primary"
                          size="sm"
                          icon={<Send className="w-3.5 h-3.5" />}
                        >
                          Publish to Website
                        </Button>
                        <Button
                          onClick={() => handleAction(article.id, 'archive')}
                          variant="outline"
                          size="sm"
                        >
                          Archive
                        </Button>
                      </>
                    )}

                    {article.status === 'published' && (
                      <>
                        <Button
                          onClick={() => handleAction(article.id, 'unpublish')}
                          variant="outline"
                          size="sm"
                        >
                          Unpublish
                        </Button>
                        <Button
                          onClick={() => handleAction(article.id, 'archive')}
                          variant="outline"
                          size="sm"
                        >
                          Archive
                        </Button>
                      </>
                    )}

                    {(article.status === 'rejected' || article.status === 'archived') && (
                      <button
                        onClick={async () => {
                          if (confirm('Delete this article from queue?')) {
                            await deleteMonitoredArticle(article.id);
                            loadData();
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No articles in this queue filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Click "Search for New Updates Now" to query monitored Nigerian news sources and legislative feeds.
            </p>
          </div>
        )}
      </div>

      {/* MODAL: SIDE-BY-SIDE INSPECTION & DRAFT EDIT */}
      <Modal
        isOpen={!!inspectingArticle}
        onClose={() => setInspectingArticle(null)}
        title="Editorial Verification & Source Comparison"
        subtitle={inspectingArticle ? `Source: ${inspectingArticle.source.name} • Status: ${inspectingArticle.status}` : undefined}
        maxWidth="2xl"
      >
        {inspectingArticle && (
          <div className="space-y-6 text-xs sm:text-sm">
            {/* Side-by-side comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Discovered Source Record */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-[#0B1739] text-xs uppercase tracking-wider">
                    Original Source Record
                  </span>
                  <a
                    href={inspectingArticle.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1746A2] font-semibold flex items-center gap-1 hover:underline"
                  >
                    Open Source <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Publisher / Domain
                    </span>
                    <strong className="text-slate-800">{inspectingArticle.source.name}</strong>{' '}
                    <span className="text-slate-500">({inspectingArticle.source.domain})</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Original Publication Date
                    </span>
                    <span className="text-slate-700">{inspectingArticle.publishedAt}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Original Title
                    </span>
                    <p className="font-semibold text-slate-900">
                      {inspectingArticle.source.originalTitle}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Discovered Excerpt / Snippet
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                      {inspectingArticle.source.originalSnippet}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Canonical Hash
                    </span>
                    <code className="text-[11px] font-mono text-slate-500">
                      {inspectingArticle.canonicalUrlHash}
                    </code>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Processed Draft & Fact Check */}
              <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                  <span className="font-bold text-[#1746A2] text-xs uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
                    AI Fact-Checked Draft
                  </span>

                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-xs font-bold text-[#1746A2] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <FileEdit className="w-3.5 h-3.5" />
                      Edit Draft
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-amber-700">Editing Mode</span>
                  )}
                </div>

                {!isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">
                        Category
                      </span>
                      <span className="font-semibold text-[#1746A2] bg-white px-2 py-0.5 rounded border border-blue-100">
                        {inspectingArticle.category}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">
                        Prepared Headline
                      </span>
                      <h4 className="font-bold text-slate-900 leading-snug">
                        {inspectingArticle.headline}
                      </h4>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">
                        Executive Summary
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {inspectingArticle.shortSummary}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">
                        Draft Body Content
                      </span>
                      <div className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200 max-h-48 overflow-y-auto space-y-2 whitespace-pre-line">
                        {inspectingArticle.fullBody}
                      </div>
                    </div>

                    {inspectingArticle.hasUnverifiedClaims && (
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                        <strong>Editorial Warning:</strong>{' '}
                        {inspectingArticle.unverifiedClaimsDetails ||
                          'Check facts against legislative gazette before approving.'}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Headline
                      </label>
                      <input
                        type="text"
                        value={editHeadline}
                        onChange={(e) => setEditHeadline(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Summary
                      </label>
                      <textarea
                        rows={2}
                        value={editSummary}
                        onChange={(e) => setEditSummary(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Full Body
                      </label>
                      <textarea
                        rows={6}
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveEdit} variant="primary" size="sm">
                        Save Edits
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Audit Trail */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Audit Trail & History
              </span>
              <div className="space-y-1.5">
                {inspectingArticle.auditTrail.map((item, idx) => (
                  <div key={idx} className="text-xs text-slate-600 flex items-center justify-between">
                    <span>
                      <strong>{item.action}</strong> by {item.actor}
                      {item.notes ? ` (${item.notes})` : ''}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleAction(inspectingArticle.id, 'reject')}
                  variant="ghost"
                  size="sm"
                  className="text-red-600"
                >
                  Reject Story
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => setInspectingArticle(null)} variant="outline" size="sm">
                  Close Window
                </Button>
                {inspectingArticle.status !== 'approved' && inspectingArticle.status !== 'published' && (
                  <Button
                    onClick={() => handleAction(inspectingArticle.id, 'approve')}
                    variant="outline"
                    size="sm"
                  >
                    Approve Draft
                  </Button>
                )}
                {inspectingArticle.status !== 'published' && (
                  <Button
                    onClick={() => handleAction(inspectingArticle.id, 'publish')}
                    variant="primary"
                    size="sm"
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Publish Directly to Website
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL: MONITOR SETTINGS */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="Automated News Monitor Settings"
        maxWidth="md"
      >
        {settings && (
          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Automated Background Search Frequency
              </label>
              <select
                name="frequencyHours"
                defaultValue={settings.frequencyHours}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
              >
                <option value="1">Every 1 Hour (High Frequency)</option>
                <option value="6">Every 6 Hours (Recommended Default)</option>
                <option value="12">Every 12 Hours</option>
                <option value="24">Every 24 Hours (Once daily)</option>
              </select>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                The server scheduler runs in the background at this interval without requiring browser activity.
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="autoScanEnabled"
                  defaultChecked={settings.autoScanEnabled}
                  className="rounded text-[#1746A2]"
                />
                <span className="text-xs font-bold text-slate-800">
                  Enable Continuous Server Background Scheduler
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="autoApproveLowRisk"
                  defaultChecked={settings.autoApproveLowRisk}
                  className="rounded text-[#1746A2]"
                />
                <span className="text-xs font-medium text-slate-700">
                  Auto-Approve Low-Risk Official Statements (Leave unchecked for strict human review)
                </span>
              </label>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="text-xs font-bold text-slate-700 block">Monitored Keywords:</span>
              <div className="flex flex-wrap gap-1.5">
                {settings.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="text-xs font-bold text-slate-700 block">Monitored Domains:</span>
              <p className="text-[11px] text-slate-500">
                Leadership.ng, InsideStoryNG, Vanguard, Daily Trust, Kogi State Assembly, Blueprint, The Cable.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <Button onClick={() => setIsSettingsModalOpen(false)} variant="outline" size="sm">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Monitor Settings
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* MODAL: DISCOVERY AUDIT LOGS */}
      <Modal
        isOpen={isLogsModalOpen}
        onClose={() => setIsLogsModalOpen(false)}
        title="Automated Discovery Run Logs"
        maxWidth="lg"
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto text-xs">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-3 rounded-xl border ${
                log.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : log.type === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                <span className="font-bold uppercase tracking-wider">{log.type}</span>
                <span className="font-mono">{new Date(log.timestamp).toLocaleString()}</span>
              </div>
              <p className="font-medium leading-relaxed">{log.message}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
