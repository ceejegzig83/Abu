import React from 'react';
import { Link } from 'react-router-dom';
import { LegislativeActivity } from '../../types';
import { ScrollText, Calendar, Building, ArrowRight, Award } from 'lucide-react';
import { Button } from '../ui/Button';

interface LegislativeHighlightsProps {
  activities: LegislativeActivity[];
}

export const LegislativeHighlights: React.FC<LegislativeHighlightsProps> = ({
  activities,
}) => {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1746A2] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Kogi State House of Assembly
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0B1739] tracking-tight">
              Legislative Activities & Committee Work
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl leading-relaxed">
              Follow published proceedings, legislative motions on constituency welfare, and executive oversight anchored by the House Committee on Lands.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              to="/legislative"
              variant="outline"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              All Legislative Records
            </Button>
          </div>
        </div>

        {/* Timeline / List */}
        <div className="space-y-4">
          {activities.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50/50 transition duration-200 hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#0B1739] text-[#D6A84F]">
                    {item.activityType.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {item.date}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {item.session}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B1739] hover:text-[#1746A2] transition">
                  <Link to="/legislative">{item.title}</Link>
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.summary}
                </p>

                {item.committeeRole && (
                  <div className="pt-1 flex items-center gap-1.5 text-xs text-[#008751] font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    <span>Role: {item.committeeRole}</span>
                  </div>
                )}
              </div>

              <div className="shrink-0 self-end md:self-center">
                <Button to="/legislative" variant="outline" size="sm">
                  View Motion Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
