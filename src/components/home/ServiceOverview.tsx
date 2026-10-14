import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollText, HardHat, HeartHandshake, Newspaper, ArrowRight } from 'lucide-react';

export const ServiceOverview: React.FC = () => {
  const cards = [
    {
      title: 'Legislative Activities',
      description:
        'Read published updates on bills, motions, plenary contributions, and parliamentary committee oversight.',
      icon: <ScrollText className="w-6 h-6 text-[#1746A2]" />,
      link: '/legislative',
      linkText: 'View Legislative Updates',
      badge: 'Assembly Plenary',
    },
    {
      title: 'Constituency Projects',
      description:
        'Explore verified records and status classifications of community initiatives covering health, roads, water, and relief.',
      icon: <HardHat className="w-6 h-6 text-[#D6A84F]" />,
      link: '/projects',
      linkText: 'Explore Projects',
      badge: 'Track Deliverables',
    },
    {
      title: 'Community Engagement',
      description:
        'Send an official request, report an urgent community issue, or submit a formal petition with verifiable reference numbers.',
      icon: <HeartHandshake className="w-6 h-6 text-[#008751]" />,
      link: '/constituency',
      linkText: 'Engage the Office',
      badge: 'Citizen Portal',
    },
    {
      title: 'Public Information',
      description:
        'Access official news releases, policy statements, townhall reports, and verified communications from the representative.',
      icon: <Newspaper className="w-6 h-6 text-[#2463C5]" />,
      link: '/news',
      linkText: 'Read Latest News',
      badge: 'Press Dispatches',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1746A2] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Civic Representation
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0B1739] tracking-tight">
            Public Service at a Glance
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Find structured information about legislative responsibilities, community initiatives, and direct channels to participate in the democratic process.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B1739] group-hover:text-[#1746A2] transition mb-2">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to={card.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1746A2] group-hover:text-[#0B1739] transition"
                >
                  <span>{card.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
