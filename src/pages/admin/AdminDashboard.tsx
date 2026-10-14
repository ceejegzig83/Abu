import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  getCurrentAdminUser,
  logoutAdminUser,
  loginAdminUser,
  getProjects,
  saveProject,
  deleteProject,
  getNewsArticles,
  saveNewsArticle,
  deleteNewsArticle,
  getSubmissions,
  updateSubmissionStatus,
  getLegislativeActivities,
  saveLegislativeActivity,
  deleteLegislativeActivity,
  getMediaItems,
  saveMediaItem,
  deleteMediaItem,
  getSiteSettings,
  updateSiteSettings,
  resetStoreToInitial,
  subscribeToStore,
} from '../../lib/storage';
import {
  Project,
  ProjectStatus,
  ProjectCategory,
  NewsArticle,
  NewsStatus,
  CommunitySubmission,
  SubmissionStatus,
  LegislativeActivity,
  MediaItem,
  SiteSettings,
  FeedProvider,
  UserRole,
} from '../../types';
import { ProjectStatusBadge, SubmissionStatusBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Shield,
  LogOut,
  FolderKanban,
  Newspaper,
  ScrollText,
  Image as ImageIcon,
  HeartHandshake,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Clock,
  ExternalLink,
  RotateCcw,
  Search,
  UserCheck,
  Send,
  Database,
  Radio,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentAdminUser());

  // Store data states
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [news, setNews] = useState<NewsArticle[]>(getNewsArticles(true));
  const [submissions, setSubmissions] = useState<CommunitySubmission[]>(getSubmissions());
  const [legislative, setLegislative] = useState<LegislativeActivity[]>(getLegislativeActivities());
  const [media, setMedia] = useState<MediaItem[]>(getMediaItems());
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'submissions' | 'projects' | 'news' | 'legislative' | 'media' | 'settings'
  >('overview');

  // Modal states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [isNewNewsModalOpen, setIsNewNewsModalOpen] = useState(false);

  const [activeSubmission, setActiveSubmission] = useState<CommunitySubmission | null>(null);
  const [newSubStatus, setNewSubStatus] = useState<SubmissionStatus>('under_review');
  const [publicUpdateMessage, setPublicUpdateMessage] = useState('');
  const [internalNoteMessage, setInternalNoteMessage] = useState('');

  // Submissions search & filter
  const [subSearch, setSubSearch] = useState('');
  const [subStatusFilter, setSubStatusFilter] = useState<string>('all');

  // Notification banner
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToStore(() => {
      setProjects(getProjects());
      setNews(getNewsArticles(true));
      setSubmissions(getSubmissions());
      setLegislative(getLegislativeActivities());
      setMedia(getMediaItems());
      setSettings(getSiteSettings());
      setCurrentUser(getCurrentAdminUser());
    });
    return unsub;
  }, []);

  // Require auth: if no user, redirect to login
  useEffect(() => {
    if (!currentUser) {
      navigate('/admin/login');
    }
  }, [currentUser, navigate]);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleLogout = () => {
    logoutAdminUser();
    navigate('/admin/login');
  };

  const handleSwitchRole = (role: UserRole) => {
    const updated = loginAdminUser(role);
    setCurrentUser(updated);
    showNotification(`Switched staff profile to ${role.toUpperCase()}`);
  };

  // Submission Status Update
  const handleSaveSubmissionReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmission) return;

    updateSubmissionStatus(
      activeSubmission.id,
      newSubStatus,
      publicUpdateMessage.trim() || undefined,
      internalNoteMessage.trim() || undefined,
      currentUser?.name || 'Authorized Staff Officer'
    );

    setActiveSubmission(null);
    setPublicUpdateMessage('');
    setInternalNoteMessage('');
    showNotification(`Updated status for petition ${activeSubmission.referenceCode}`);
  };

  // Project Form Handler
  const handleSaveProjectForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const category = formData.get('category') as ProjectCategory;
    const summary = formData.get('summary') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const status = formData.get('status') as ProjectStatus;
    const targetBeneficiaries = formData.get('targetBeneficiaries') as string;
    const verificationNote = formData.get('verificationNote') as string;
    const featured = formData.get('featured') === 'on';

    const slug =
      editingProject?.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const id = editingProject?.id || `proj-${Date.now()}`;

    const projectToSave: Project = {
      id,
      slug,
      title,
      category,
      summary,
      description,
      location,
      status,
      targetBeneficiaries,
      verificationNote,
      featured,
      publishedAt: editingProject?.publishedAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      evidenceUrls: editingProject?.evidenceUrls || [],
      progressUpdates: editingProject?.progressUpdates || [],
    };

    saveProject(projectToSave);
    setEditingProject(null);
    setIsNewProjectModalOpen(false);
    showNotification(`Project "${title}" saved successfully.`);
  };

  // News Form Handler
  const handleSaveNewsForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const excerpt = formData.get('excerpt') as string;
    const body = formData.get('body') as string;
    const author = formData.get('author') as string;
    const status = formData.get('status') as NewsStatus;

    const slug =
      editingNews?.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const id = editingNews?.id || `news-${Date.now()}`;

    const articleToSave: NewsArticle = {
      id,
      slug,
      title,
      category,
      excerpt,
      body,
      author,
      status,
      publishedAt: editingNews?.publishedAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    saveNewsArticle(articleToSave);
    setEditingNews(null);
    setIsNewNewsModalOpen(false);
    showNotification(`News article "${title}" saved.`);
  };

  // Settings Save Handler
  const handleSaveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const officialPhone = formData.get('officialPhone') as string;
    const officialEmail = formData.get('officialEmail') as string;
    const officeAddress = formData.get('officeAddress') as string;
    const contactHours = formData.get('contactHours') as string;
    const facebookUrl = formData.get('facebookUrl') as string;
    const feedProvider = formData.get('feedProvider') as FeedProvider;
    const feedWidgetId = formData.get('feedWidgetId') as string;
    const feedEnabled = formData.get('feedEnabled') === 'on';

    updateSiteSettings({
      officialPhone,
      officialEmail,
      officeAddress,
      contactHours,
      facebookUrl,
      feedConfig: {
        provider: feedProvider,
        enabled: feedEnabled,
        pageUrl: facebookUrl,
        pageName: 'ABU JIBRIL II',
        widgetId: feedWidgetId,
        showFallbackOnFailure: true,
      },
    });

    showNotification('Site and social feed settings updated.');
  };

  if (!currentUser) return null;

  // Filter submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.referenceCode.toLowerCase().includes(subSearch.toLowerCase()) ||
      sub.fullName.toLowerCase().includes(subSearch.toLowerCase()) ||
      sub.subject.toLowerCase().includes(subSearch.toLowerCase()) ||
      sub.community.toLowerCase().includes(subSearch.toLowerCase());

    const matchesStatus = subStatusFilter === 'all' || sub.status === subStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingSubmissionsCount = submissions.filter(
    (s) => s.status === 'received' || s.status === 'under_review'
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Staff Navigation Header */}
      <header className="bg-[#0B1739] text-white border-b-2 border-[#D6A84F] sticky top-0 z-30 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-[#D6A84F] transition">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#D6A84F] shrink-0 bg-[#0B1739]">
                <img
                  src="/images/hon-jibril-abu.jpg"
                  alt="Hon. Jibril Abu II"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/fVC3sZmc/Abu-Jib.jpg';
                  }}
                />
              </div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight hidden sm:inline">
                HON. JIBRIL ABU II
              </span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-xs font-semibold text-[#D6A84F] uppercase tracking-wider">
              Staff Portal
            </span>
          </div>

          {/* Current User & Role Switcher */}
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <span className="text-slate-300">{currentUser.name}</span>
              <span className="px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-[#D6A84F] text-[#0B1739]">
                {currentUser.role}
              </span>
            </div>

            {/* Quick role toggle */}
            <div className="hidden lg:flex items-center gap-1 bg-black/30 p-1 rounded-xl">
              <span className="text-slate-400 text-[10px] px-1">Switch:</span>
              <button
                onClick={() => handleSwitchRole('admin')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                  currentUser.role === 'admin' ? 'bg-[#1746A2] text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => handleSwitchRole('editor')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                  currentUser.role === 'editor' ? 'bg-[#1746A2] text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => handleSwitchRole('case_officer')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                  currentUser.role === 'case_officer' ? 'bg-[#1746A2] text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Officer
              </button>
            </div>

            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-200 transition flex items-center gap-1 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Action Notice Toast */}
      {actionNotice && (
        <div className="bg-[#1746A2] text-white text-xs py-2 px-4 text-center font-medium shadow-xs">
          {actionNotice}
        </div>
      )}

      {/* Main Admin Content */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-300">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'overview'
                ? 'bg-[#0B1739] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Shield className="w-4 h-4 text-[#D6A84F]" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'submissions'
                ? 'bg-[#0B1739] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-[#008751]" />
            <span>Community Submissions</span>
            {pendingSubmissionsCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-[#0B1739]">
                {pendingSubmissionsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'projects'
                ? 'bg-[#0B1739] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-[#1746A2]" />
            <span>Projects & Deliverables</span>
            <span className="text-xs text-slate-400">({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'news'
                ? 'bg-[#0B1739] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Newspaper className="w-4 h-4 text-[#2463C5]" />
            <span>News & Statements</span>
            <span className="text-xs text-slate-400">({news.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('legislative')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'legislative'
                ? 'bg-[#0B1739] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <ScrollText className="w-4 h-4 text-[#D6A84F]" />
            <span>Legislative Activities</span>
          </button>

          {currentUser.role === 'admin' && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
                activeTab === 'settings'
                  ? 'bg-[#0B1739] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-slate-400" />
              <span>Site & Facebook Feed Settings</span>
            </button>
          )}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Community Petitions
                  </span>
                  <div className="text-3xl font-extrabold text-[#0B1739] mt-1">
                    {submissions.length}
                  </div>
                  <span className="text-xs text-amber-700 font-semibold mt-1 inline-block">
                    {pendingSubmissionsCount} Pending Action
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Tracked Projects
                  </span>
                  <div className="text-3xl font-extrabold text-[#0B1739] mt-1">
                    {projects.length}
                  </div>
                  <span className="text-xs text-[#008751] font-semibold mt-1 inline-block">
                    {projects.filter((p) => p.status === 'ongoing').length} Verified Ongoing
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1746A2] flex items-center justify-center">
                  <FolderKanban className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Published News
                  </span>
                  <div className="text-3xl font-extrabold text-[#0B1739] mt-1">
                    {news.filter((n) => n.status === 'published').length}
                  </div>
                  <span className="text-xs text-slate-500 mt-1 inline-block">
                    {news.filter((n) => n.status === 'draft').length} Drafts
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#2463C5] flex items-center justify-center">
                  <Newspaper className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Plenary Activities
                  </span>
                  <div className="text-3xl font-extrabold text-[#0B1739] mt-1">
                    {legislative.length}
                  </div>
                  <span className="text-xs text-[#D6A84F] font-bold mt-1 inline-block">
                    Committee on Lands
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-yellow-50 text-[#D6A84F] flex items-center justify-center">
                  <ScrollText className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Action Split: Recent Submissions & Recent Publications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Submissions */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-[#0B1739] flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-[#008751]" />
                    Recent Citizen Submissions
                  </h3>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className="text-xs text-[#1746A2] font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {submissions.slice(0, 4).map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => {
                        setActiveSubmission(sub);
                        setNewSubStatus(sub.status);
                      }}
                      className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#1746A2]">
                            {sub.referenceCode}
                          </span>
                          <span className="text-xs text-slate-500">• {sub.community}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#0B1739] line-clamp-1 mt-0.5">
                          {sub.subject}
                        </h4>
                      </div>
                      <SubmissionStatusBadge status={sub.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Publications */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-[#0B1739] flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-[#1746A2]" />
                    Latest Published Releases
                  </h3>
                  <button
                    onClick={() => setActiveTab('news')}
                    className="text-xs text-[#1746A2] font-semibold hover:underline"
                  >
                    Manage News
                  </button>
                </div>

                <div className="space-y-3">
                  {news.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="text-[#1746A2] font-semibold">{item.category}</span>
                          <span>• {item.publishedAt}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#0B1739] line-clamp-1 mt-0.5">
                          {item.title}
                        </h4>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase ${
                          item.status === 'published'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SUBMISSIONS MANAGER */}
        {activeTab === 'submissions' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#0B1739]">
                    Constituency Petitions & Citizen Inquiries
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review incoming petitions, update progress, and formulate official responses.
                  </p>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search code, name, subject..."
                      value={subSearch}
                      onChange={(e) => setSubSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#1746A2]"
                    />
                  </div>

                  <select
                    value={subStatusFilter}
                    onChange={(e) => setSubStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-700"
                  >
                    <option value="all">All Statuses</option>
                    <option value="received">Received</option>
                    <option value="under_review">Under Review</option>
                    <option value="referred">Referred</option>
                    <option value="response_provided">Response Provided</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Submissions Table / Cards */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Reference</th>
                      <th className="py-3 px-4">Citizen / Ward</th>
                      <th className="py-3 px-4">Category & Subject</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 font-mono font-bold text-[#1746A2]">
                          {sub.referenceCode}
                        </td>
                        <td className="py-3 px-4">
                          <strong className="text-slate-900 block">{sub.fullName}</strong>
                          <span className="text-slate-500">{sub.community}</span>
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <span className="text-[10px] font-semibold text-[#008751] block uppercase">
                            {sub.category}
                          </span>
                          <span className="font-semibold text-slate-800 line-clamp-1">
                            {sub.subject}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <SubmissionStatusBadge status={sub.status} />
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            onClick={() => {
                              setActiveSubmission(sub);
                              setNewSubStatus(sub.status);
                            }}
                            variant="primary"
                            size="sm"
                          >
                            Process Case
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#0B1739]">
                    Constituency Projects Directory
                  </h2>
                  <p className="text-xs text-slate-500">
                    Create, update documented status, attach progress milestones, and maintain evidence links.
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setEditingProject(null);
                    setIsNewProjectModalOpen(true);
                  }}
                  variant="primary"
                  size="sm"
                  icon={<Plus className="w-4 h-4" />}
                >
                  Create New Project
                </Button>
              </div>

              {/* Projects Grid / List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-[#1746A2] bg-blue-50 px-2.5 py-0.5 rounded">
                          {proj.category}
                        </span>
                        <ProjectStatusBadge status={proj.status} size="sm" />
                      </div>

                      <h3 className="text-base font-bold text-[#0B1739] line-clamp-2">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {proj.summary}
                      </p>

                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                        <div>Location: {proj.location}</div>
                        <div>Last Updated: {proj.updatedAt}</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsNewProjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          title="Edit Project"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                              showNotification(`Deleted project "${proj.title}"`);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <Link
                        to={`/projects/${proj.slug}`}
                        className="text-xs text-[#1746A2] font-bold hover:underline"
                      >
                        Preview Page
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NEWS MANAGER */}
        {activeTab === 'news' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#0B1739]">
                    News, Policy Releases & Statements
                  </h2>
                  <p className="text-xs text-slate-500">
                    Draft, publish, and curate official publications for constituents and the press.
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setEditingNews(null);
                    setIsNewNewsModalOpen(true);
                  }}
                  variant="primary"
                  size="sm"
                  icon={<Plus className="w-4 h-4" />}
                >
                  Create Article
                </Button>
              </div>

              <div className="divide-y divide-slate-100">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 p-2 rounded-xl transition"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-[#1746A2]">{item.category}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500">{item.publishedAt}</span>
                        <span
                          className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                            item.status === 'published'
                              ? 'bg-emerald-50 text-emerald-800'
                              : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#0B1739]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-1">{item.excerpt}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingNews(item);
                          setIsNewNewsModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete article "${item.title}"?`)) {
                            deleteNewsArticle(item.id);
                            showNotification(`Deleted news item.`);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        to={`/news/${item.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1746A2] text-xs font-semibold hover:bg-blue-100 transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LEGISLATIVE ACTIVITIES */}
        {activeTab === 'legislative' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#0B1739]">
                  Legislative Activities & Plenary Archive
                </h2>
                <p className="text-xs text-slate-500">
                  Document parliamentary motions, bills, oversight tours, and official statements.
                </p>
              </div>

              <div className="space-y-4">
                {legislative.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row items-start justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-[#0B1739] text-[#D6A84F]">
                          {item.activityType.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-slate-500">{item.date}</span>
                        <span className="text-xs text-slate-400 font-mono">{item.session}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#0B1739]">{item.title}</h3>
                      <p className="text-xs text-slate-600">{item.summary}</p>
                    </div>

                    <Link to="/legislative" className="text-xs text-[#1746A2] font-bold hover:underline shrink-0">
                      View Plenary Record
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS & FACEBOOK CONFIGURATION */}
        {activeTab === 'settings' && currentUser.role === 'admin' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Facebook & Media Feed Settings */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center gap-2 text-[#0B1739]">
                <Radio className="w-5 h-5 text-[#1746A2]" />
                <h2 className="text-xl font-bold">
                  Facebook Feed & Media Integration Settings
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Configure the live Facebook feed for representative page <strong>"ABU JIBRIL II"</strong>. The site features an automated fallback to website press releases whenever social widgets are disabled or offline.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Feed Provider
                    </label>
                    <select
                      name="feedProvider"
                      defaultValue={settings.feedConfig.provider}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-800"
                    >
                      <option value="facebook">Native Facebook Page Plugin</option>
                      <option value="elfsight">Elfsight Social Widget</option>
                      <option value="smashballoon">Smash Balloon Social Feed</option>
                      <option value="manual">Manual Fallback Mode Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Official Facebook Page URL
                    </label>
                    <input
                      type="url"
                      name="facebookUrl"
                      defaultValue={settings.facebookUrl}
                      placeholder="https://www.facebook.com/ABU-JIBRIL-II"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Widget ID (for Elfsight / Third Party)
                    </label>
                    <input
                      type="text"
                      name="feedWidgetId"
                      defaultValue={settings.feedConfig.widgetId || ''}
                      placeholder="Optional widget UUID"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-mono"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="feedEnabled"
                        defaultChecked={settings.feedConfig.enabled}
                        className="rounded text-[#1746A2]"
                      />
                      <span className="text-sm font-semibold text-slate-700">
                        Enable Social Feed Embed on Homepage
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-base font-bold text-[#0B1739] mb-4">
                    Official Contact & Liaison Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Constituency Phone
                      </label>
                      <input
                        type="text"
                        name="officialPhone"
                        defaultValue={settings.officialPhone}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Official Email
                      </label>
                      <input
                        type="email"
                        name="officialEmail"
                        defaultValue={settings.officialEmail}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Constituency Office Address
                      </label>
                      <input
                        type="text"
                        name="officeAddress"
                        defaultValue={settings.officeAddress}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Public Consultation Hours
                      </label>
                      <input
                        type="text"
                        name="contactHours"
                        defaultValue={settings.contactHours}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" variant="primary">
                    Save Site Settings
                  </Button>
                </div>
              </form>
            </div>

            {/* Supabase Database Status & Deployment Instructions */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#0B1739]">
                <Database className="w-5 h-5 text-[#008751]" />
                <h3 className="font-bold text-lg">Production Database Architecture (Supabase / PostgreSQL)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The application operates with a reactive in-browser persistence layer (localStorage) for seamless client testing, and includes production-ready SQL migrations in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">src/db/supabase-schema.sql</code> with Row Level Security (RLS) policies.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900">To connect your live Supabase project:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Run the SQL script located at <code className="font-mono text-[11px]">src/db/supabase-schema.sql</code> in your Supabase SQL Editor.</li>
                  <li>Add <code className="font-mono text-[11px]">VITE_SUPABASE_URL</code> and <code className="font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</code> to your environment variables.</li>
                  <li>Staff authorization policies and citizen petition tables will synchronize automatically.</li>
                </ol>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Reset Local Demonstration Data</h4>
                  <p className="text-[11px] text-slate-500">Restore factory sample projects, news, and petitions.</p>
                </div>
                <Button
                  onClick={() => {
                    if (confirm('Reset all demo records back to initial state?')) {
                      resetStoreToInitial();
                      showNotification('Demonstration store reset to initial seed.');
                    }
                  }}
                  variant="outline"
                  size="sm"
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Reset Factory Seed
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: PROCESS CITIZEN SUBMISSION */}
      <Modal
        isOpen={!!activeSubmission}
        onClose={() => setActiveSubmission(null)}
        title={activeSubmission ? `Process Petition ${activeSubmission.referenceCode}` : 'Process Case'}
        subtitle={activeSubmission ? `${activeSubmission.community} • ${activeSubmission.category}` : undefined}
        maxWidth="lg"
      >
        {activeSubmission && (
          <form onSubmit={handleSaveSubmissionReview} className="space-y-5 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Citizen:</span>
                <strong className="text-slate-900">{activeSubmission.fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact:</span>
                <span>{activeSubmission.phone || activeSubmission.email || 'None provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Preferred Method:</span>
                <span className="uppercase font-semibold text-[#1746A2]">{activeSubmission.preferredContact}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <strong className="block text-slate-900 mb-1">{activeSubmission.subject}</strong>
                <p className="text-slate-700 leading-relaxed">{activeSubmission.description}</p>
              </div>
            </div>

            {/* Status Change Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Update Case Status
              </label>
              <select
                value={newSubStatus}
                onChange={(e) => setNewSubStatus(e.target.value as SubmissionStatus)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
              >
                <option value="received">Received</option>
                <option value="under_review">Under Review</option>
                <option value="referred">Referred to Relevant Ministry</option>
                <option value="response_provided">Response Provided</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Public Message for Citizen Tracker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Public Tracking Message (Visible to Citizen)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Field inspection conducted on Feb 22. Case forwarded to State Works Ministry."
                value={publicUpdateMessage}
                onChange={(e) => setPublicUpdateMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
              />
              <span className="text-[11px] text-slate-400">
                This note will be shown on the public petition tracker when the citizen enters reference {activeSubmission.referenceCode}.
              </span>
            </div>

            {/* Staff Internal Note (Confidential) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Internal Confidential Staff Note (Staff Only)
              </label>
              <textarea
                rows={2}
                placeholder="Confidential liaison notes, ministry contact officer, budget vote..."
                value={internalNoteMessage}
                onChange={(e) => setInternalNoteMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
              <Button onClick={() => setActiveSubmission(null)} variant="outline" size="sm">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Record Case Update
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* MODAL: CREATE / EDIT PROJECT */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Create New Constituency Project'}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveProjectForm} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
            <input
              type="text"
              name="title"
              required
              defaultValue={editingProject?.title || ''}
              className="w-full px-4 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                name="category"
                defaultValue={editingProject?.category || 'Roads & Infrastructure'}
                className="w-full px-4 py-2 rounded-xl border border-slate-200"
              >
                <option value="Healthcare">Healthcare</option>
                <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                <option value="Water Access">Water Access</option>
                <option value="Constituency Support">Constituency Support</option>
                <option value="Land Administration">Land Administration</option>
                <option value="Youth & Women Empowerment">Youth & Women Empowerment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
              <select
                name="status"
                defaultValue={editingProject?.status || 'proposed'}
                className="w-full px-4 py-2 rounded-xl border border-slate-200"
              >
                <option value="proposed">Proposed</option>
                <option value="announced">Announced</option>
                <option value="approved">Approved</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="awaiting_verification">Awaiting Verification</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Location / Ward</label>
            <input
              type="text"
              name="location"
              required
              defaultValue={editingProject?.location || ''}
              className="w-full px-4 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Executive Summary</label>
            <textarea
              name="summary"
              rows={2}
              required
              defaultValue={editingProject?.summary || ''}
              className="w-full px-4 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Scope & Description</label>
            <textarea
              name="description"
              rows={4}
              required
              defaultValue={editingProject?.description || ''}
              className="w-full px-4 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Beneficiaries</label>
            <input
              type="text"
              name="targetBeneficiaries"
              defaultValue={editingProject?.targetBeneficiaries || ''}
              className="w-full px-4 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Transparency / Verification Note
            </label>
            <input
              type="text"
              name="verificationNote"
              defaultValue={editingProject?.verificationNote || ''}
              placeholder="e.g. Content draft: Legislative advocacy phase..."
              className="w-full px-4 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={editingProject?.featured ?? true}
                className="rounded text-[#1746A2]"
              />
              <span className="text-xs font-bold text-slate-700">Display in Featured Section on Homepage</span>
            </label>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
            <Button onClick={() => setIsNewProjectModalOpen(false)} variant="outline" size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Project
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: CREATE / EDIT NEWS */}
      <Modal
        isOpen={isNewNewsModalOpen}
        onClose={() => setIsNewNewsModalOpen(false)}
        title={editingNews ? 'Edit News Release' : 'Create News Release'}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveNewsForm} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
            <input
              type="text"
              name="title"
              required
              defaultValue={editingNews?.title || ''}
              className="w-full px-4 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                required
                defaultValue={editingNews?.category || 'Press Release'}
                className="w-full px-4 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Author</label>
              <input
                type="text"
                name="author"
                required
                defaultValue={editingNews?.author || 'Media Unit'}
                className="w-full px-4 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
              <select
                name="status"
                defaultValue={editingNews?.status || 'published'}
                className="w-full px-4 py-2 rounded-xl border border-slate-200"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Lead Excerpt</label>
            <textarea
              name="excerpt"
              rows={2}
              required
              defaultValue={editingNews?.excerpt || ''}
              className="w-full px-4 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Body Text</label>
            <textarea
              name="body"
              rows={6}
              required
              defaultValue={editingNews?.body || ''}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 font-sans"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
            <Button onClick={() => setIsNewNewsModalOpen(false)} variant="outline" size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Article
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
