import React from 'react';
import { ExternalLink, Newspaper, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/Button';

interface SocialFeedFallbackProps {
  pageUrl?: string;
  pageName?: string;
}

export const SocialFeedFallback: React.FC<SocialFeedFallbackProps> = ({
  pageUrl,
  pageName = 'ABU JIBRIL II',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-slate-50/80 rounded-2xl border border-slate-200">
      <div className="w-14 h-14 rounded-2xl bg-[#0B1739]/5 flex items-center justify-center text-[#1746A2] mb-4">
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </div>

      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 mb-3">
        Official Page: {pageName}
      </span>

      <h3 className="text-xl md:text-2xl font-bold text-[#0B1739] mb-2">
        Follow the Latest Updates
      </h3>

      <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto mb-6 leading-relaxed">
        The live social feed is currently operating in direct-connect mode. You can visit the verified Facebook page directly or read verified press releases and legislative publications on this portal.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {pageUrl ? (
          <Button
            to={pageUrl}
            external
            variant="primary"
            icon={<ExternalLink className="w-4 h-4" />}
          >
            Visit Facebook Page
          </Button>
        ) : (
          <span className="text-xs text-slate-500 italic flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Official page link will be gazetted shortly.
          </span>
        )}

        <Button
          to="/news"
          variant="outline"
          icon={<Newspaper className="w-4 h-4" />}
        >
          Read Website News
        </Button>
      </div>
    </div>
  );
};
