import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle, FeedConfiguration } from '../../types';
import { SocialFeedEmbed } from './SocialFeedEmbed';
import { ArrowRight, Calendar, Newspaper, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface MediaFeedSectionProps {
  feedConfig: FeedConfiguration;
  latestNews: NewsArticle[];
}

export const MediaFeedSection: React.FC<MediaFeedSectionProps> = ({
  feedConfig,
  latestNews,
}) => {
  return (
    <section className="py-20 md:py-24 bg-[#F7F8FC] border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1746A2] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
              Official Media Channels
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1739] tracking-tight">
              Latest Updates & Media
            </h2>
            <p className="mt-2 text-base md:text-lg text-slate-600 max-w-2xl">
              Explore recent public updates, announcements, photographs, and verified communications from the constituency office.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button to="/news" variant="outline" size="sm" icon={<Newspaper className="w-4 h-4" />}>
              View All Press Releases
            </Button>
          </div>
        </div>

        {/* 2-Column Grid: 60% Feed Widget / 40% News Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (60% on desktop: lg:col-span-7) */}
          <div className="lg:col-span-7 w-full">
            <SocialFeedEmbed config={feedConfig} />
          </div>

          {/* Right Column (40% on desktop: lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-lg font-bold text-[#0B1739] flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-[#1746A2]" />
                From the Constituency Desk
              </h3>
              <span className="text-xs font-medium text-slate-500">Verified Dispatches</span>
            </div>

            <div className="space-y-4">
              {latestNews.slice(0, 3).map((item) => (
                <article
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-[#1746A2] bg-blue-50 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.publishedAt}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#0B1739] hover:text-[#1746A2] transition line-clamp-2">
                    <Link to={`/news/${item.slug}`}>{item.title}</Link>
                  </h4>

                  <p className="mt-2 text-xs md:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">By {item.author}</span>
                    <Link
                      to={`/news/${item.slug}`}
                      className="text-xs font-semibold text-[#1746A2] hover:text-[#0B1739] inline-flex items-center gap-1"
                    >
                      Read Statement <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-[#0B1739] to-[#16244f] text-white">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D6A84F]/20 flex items-center justify-center shrink-0 text-[#D6A84F] font-bold">
                  !
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Public Information Policy</h5>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Official statements and legislative notices are archived permanently. Community members are encouraged to cross-reference with legislative records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
