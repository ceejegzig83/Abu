import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../types';
import { getNewsArticles, subscribeToStore } from '../lib/storage';
import { Search, Calendar, Newspaper, ArrowRight, User, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(getNewsArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const unsub = subscribeToStore(() => {
      setArticles(getNewsArticles());
    });
    return unsub;
  }, []);

  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return ['all', ...Array.from(set)];
  }, [articles]);

  const filteredNews = useMemo(() => {
    return articles.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [articles, searchQuery, selectedCategory]);

  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1746A2] text-xs font-semibold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5 text-[#D6A84F]" />
            Official Communications Bureau
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1739] tracking-tight">
            News, Statements & Press Releases
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Read verified press dispatches, policy releases, community townhall reports, and legislative publications directly from the office of Hon. Jibril Abu II.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search releases by topic, keyword, or date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1746A2] text-sm bg-slate-50/50"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1746A2] text-sm bg-slate-50/50 text-slate-700"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'All Categories' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-semibold text-slate-700">
              Showing <span className="text-[#1746A2]">{filteredNews.length}</span> publications
            </p>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article) => (
                <article
                  key={article.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="font-semibold text-[#1746A2] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {article.publishedAt}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0B1739] group-hover:text-[#1746A2] transition line-clamp-2 mb-2 leading-snug">
                      <Link to={`/news/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      {article.author}
                    </span>
                    <Link
                      to={`/news/${article.slug}`}
                      className="text-xs font-bold text-[#1746A2] group-hover:text-[#0B1739] inline-flex items-center gap-1"
                    >
                      <span>Read Release</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No articles found</h3>
              <p className="text-sm text-slate-500 mt-1">
                Try searching with different terms or selecting another category.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
