import React, { useState, useEffect } from 'react';
import { MediaItem } from '../types';
import { getMediaItems, getSiteSettings, subscribeToStore } from '../lib/storage';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Image as ImageIcon, Video, Calendar, ExternalLink, Sparkles, Eye } from 'lucide-react';

export const MediaPage: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(getMediaItems());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const settings = getSiteSettings();

  useEffect(() => {
    const unsub = subscribeToStore(() => {
      setMediaItems(getMediaItems());
    });
    return unsub;
  }, []);

  const categories = ['all', 'Legislative Activities', 'Committee Work', 'Community Engagement', 'Constituency Support'];

  const filteredItems = mediaItems.filter((m) =>
    selectedCategory === 'all' ? true : m.category === selectedCategory
  );

  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1746A2] text-xs font-semibold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5 text-[#D6A84F]" />
            Official Photographic & Media Archive
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1739] tracking-tight">
            Media & Photo Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Photographic records and public documentation of plenary proceedings, committee oversight missions, community townhalls, and outreach initiatives.
          </p>
        </div>

        {/* Category Pills & Facebook Direct Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1746A2] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Media' : cat}
              </button>
            ))}
          </div>

          <a
            href={settings.facebookUrl || 'https://www.facebook.com/ABU-JIBRIL-II'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1746A2] hover:underline shrink-0"
          >
            <span>Live Stream on Facebook</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.altText}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[11px] font-medium backdrop-blur-xs">
                  {item.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0B1739] group-hover:text-[#1746A2] transition line-clamp-1 mb-1">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.publishedAt}
                  </span>
                  <span className="text-[11px] font-semibold text-[#1746A2] group-hover:underline">
                    Expand Photo
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Media Lightbox Modal */}
        <Modal
          isOpen={!!activeMedia}
          onClose={() => setActiveMedia(null)}
          title={activeMedia?.title || 'Photo Record'}
          subtitle={activeMedia ? `${activeMedia.category} • ${activeMedia.publishedAt}` : undefined}
          maxWidth="xl"
        >
          {activeMedia && (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center max-h-[60vh]">
                <img
                  src={activeMedia.url}
                  alt={activeMedia.altText}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {activeMedia.caption || activeMedia.altText}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Office of Hon. Jibril Abu II Media Archives
                </span>
                <Button onClick={() => setActiveMedia(null)} variant="outline" size="sm">
                  Close Preview
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </main>
  );
};
