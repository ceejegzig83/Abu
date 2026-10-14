import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsBySlug, getNewsArticles } from '../lib/storage';
import { Button } from '../components/ui/Button';
import {
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Check,
  Facebook,
  ExternalLink,
  Newspaper,
  ShieldCheck,
} from 'lucide-react';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getNewsBySlug(slug) : undefined;
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <main id="main-content" className="py-24 text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-slate-200">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0B1739]">Article Not Found</h1>
          <p className="text-sm text-slate-600 mt-2 mb-6">
            The news publication you requested could not be located.
          </p>
          <Button to="/news" variant="primary">
            Back to News Directory
          </Button>
        </div>
      </main>
    );
  }

  const allArticles = getNewsArticles();
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const pageUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const pageTitle = encodeURIComponent(article.title);

  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1746A2] hover:text-[#0B1739] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Publications</span>
          </Link>
        </div>

        {/* Main Article Container */}
        <article className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          {/* Header Metadata */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-blue-50 text-[#1746A2] border border-blue-200 inline-block">
              {article.category}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1739] tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <User className="w-4 h-4 text-[#1746A2]" />
                  {article.author}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Published: {article.publishedAt}
                </span>
              </div>

              {/* Share Tools */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-xs font-medium flex items-center gap-1 cursor-pointer"
                  title="Copy link to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1877F2] transition"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href={`https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#008751] transition text-xs font-bold"
                  title="Share via WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Excerpt Lead */}
          <div className="p-4 rounded-xl bg-blue-50/50 border-l-4 border-[#1746A2] text-slate-700 text-base font-medium leading-relaxed italic">
            {article.excerpt}
          </div>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-base sm:text-lg space-y-5 pt-2">
            {article.body.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Verification Footnote */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
            <ShieldCheck className="w-5 h-5 text-[#008751] shrink-0" />
            <p>
              Official release issued by the Constituency Media & Public Relations Bureau of Hon. Jibril Abu II (Wisdombank).
            </p>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs space-y-5">
            <h3 className="text-lg font-bold text-[#0B1739]">
              More Publications & Updates
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-100/80 transition flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-[#1746A2]">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-[#0B1739] line-clamp-2 mt-1">
                      <Link to={`/news/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-3 block">
                    {rel.publishedAt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
