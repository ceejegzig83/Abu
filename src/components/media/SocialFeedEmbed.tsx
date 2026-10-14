import React, { useState } from 'react';
import { FeedConfiguration } from '../../types';
import { SocialFeedFallback } from './SocialFeedFallback';
import { ExternalLink, RefreshCw, Radio, Sparkles } from 'lucide-react';

interface SocialFeedEmbedProps {
  config: FeedConfiguration;
}

export const SocialFeedEmbed: React.FC<SocialFeedEmbedProps> = ({ config }) => {
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState<'embed' | 'feed'>('embed');

  if (!config.enabled || hasError || config.provider === 'manual') {
    return (
      <SocialFeedFallback
        pageUrl={config.pageUrl}
        pageName={config.pageName}
      />
    );
  }

  // Safe Facebook Page plugin URL builder
  const encodedUrl = encodeURIComponent(config.pageUrl || 'https://www.facebook.com/ABU-JIBRIL-II');
  const fbPluginSrc = `https://www.facebook.com/plugins/page.php?href=${encodedUrl}&tabs=timeline&width=500&height=560&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <div className="w-full flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header bar of the social panel */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#1746A2]" />
            Official Facebook Feed
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 hidden sm:inline">Page: {config.pageName}</span>
          {config.pageUrl && (
            <a
              href={config.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#1746A2] font-medium hover:underline"
            >
              Open <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Main embed container */}
      <div className="relative min-h-[500px] flex items-center justify-center p-4 bg-white">
        {config.provider === 'facebook' && (
          <div className="w-full flex flex-col items-center">
            {/* Embedded Iframe */}
            <iframe
              src={fbPluginSrc}
              width="100%"
              height="520"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title={`Facebook feed for ${config.pageName}`}
              className="rounded-xl w-full max-w-[500px]"
              onError={() => setHasError(true)}
            />
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">
                Displaying public timeline posts from verified representative page "{config.pageName}".
              </p>
            </div>
          </div>
        )}

        {config.provider === 'elfsight' && (
          <div className="w-full text-center py-8">
            {config.widgetId ? (
              <div
                className={`elfsight-app-${config.widgetId}`}
                data-elfsight-app-lazy
              />
            ) : (
              <SocialFeedFallback
                pageUrl={config.pageUrl}
                pageName={config.pageName}
              />
            )}
          </div>
        )}

        {config.provider === 'smashballoon' && (
          <div className="w-full text-center py-8">
            <SocialFeedFallback
              pageUrl={config.pageUrl}
              pageName={config.pageName}
            />
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="p-3 bg-slate-50/80 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-500">
          Experiencing slow connection?{' '}
          <button
            onClick={() => setHasError(true)}
            className="text-[#1746A2] font-semibold hover:underline cursor-pointer"
          >
            Switch to instant website news mode
          </button>
        </p>
      </div>
    </div>
  );
};
