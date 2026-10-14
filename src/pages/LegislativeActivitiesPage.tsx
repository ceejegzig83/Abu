import React, { useState, useEffect, useMemo } from 'react';
import { LegislativeActivity, LegislativeActivityType } from '../types';
import { getLegislativeActivities, subscribeToStore } from '../lib/storage';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import {
  ScrollText,
  Calendar,
  Building,
  Award,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  ExternalLink,
} from 'lucide-react';

export const LegislativeActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<LegislativeActivity[]>(
    getLegislativeActivities()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeActivity, setActiveActivity] = useState<LegislativeActivity | null>(null);

  useEffect(() => {
    const unsub = subscribeToStore(() => {
      setActivities(getLegislativeActivities());
    });
    return unsub;
  }, []);

  const types: { label: string; value: string }[] = [
    { label: 'All Activities', value: 'all' },
    { label: 'Motions', value: 'motion' },
    { label: 'Committee on Lands Meetings', value: 'committee_meeting' },
    { label: 'House Proceedings', value: 'house_proceeding' },
    { label: 'Official Statements', value: 'official_statement' },
    { label: 'Bills', value: 'bill' },
    { label: 'Public Hearings', value: 'public_hearing' },
  ];

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesSearch =
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.session.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === 'all' || act.activityType === selectedType;

      return matchesSearch && matchesType;
    });
  }, [activities, searchQuery, selectedType]);

  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1746A2] text-xs font-semibold uppercase tracking-wider">
            <ScrollText className="w-3.5 h-3.5 text-[#D6A84F]" />
            Kogi State House of Assembly
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1739] tracking-tight">
            Legislative Activities & Plenary Records
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Follow official parliamentary motions, committee hearings, oversight activities, and policy advocacy conducted by Hon. Jibril Abu II for Ajaokuta Constituency and Kogi State.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search legislative records by keyword, motion topic, or session..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1746A2] text-sm bg-slate-50/50"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1746A2] text-sm bg-slate-50/50 text-slate-700"
              >
                {types.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Timeline of Activities */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-lg font-bold text-[#0B1739]">
              Gazetted Proceedings ({filteredActivities.length})
            </h2>
            <span className="text-xs text-slate-500">Official Hansard & Records</span>
          </div>

          {filteredActivities.length > 0 ? (
            <div className="space-y-4">
              {filteredActivities.map((item) => (
                <article
                  key={item.id}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition duration-200 flex flex-col md:flex-row items-start justify-between gap-6"
                >
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#0B1739] text-[#D6A84F]">
                        {item.activityType.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.date}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono">
                        {item.session}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0B1739] hover:text-[#1746A2] transition leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.summary}
                    </p>

                    {item.outcomes && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#008751] shrink-0 mt-0.5" />
                        <div>
                          <strong>Resolution / Outcome:</strong> {item.outcomes}
                        </div>
                      </div>
                    )}

                    {item.committeeRole && (
                      <div className="flex items-center gap-2 text-xs text-[#1746A2] font-semibold">
                        <Award className="w-4 h-4 text-[#D6A84F]" />
                        <span>Committee Role: {item.committeeRole}</span>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 self-start md:self-center">
                    <Button
                      onClick={() => setActiveActivity(item)}
                      variant="primary"
                      size="sm"
                    >
                      Read Full Details
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <ScrollText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">
                No matching legislative activities found
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Try modifying your search or choosing a different activity filter.
              </p>
            </div>
          )}
        </div>

        {/* Modal: Activity Full Details */}
        <Modal
          isOpen={!!activeActivity}
          onClose={() => setActiveActivity(null)}
          title={activeActivity?.title || 'Legislative Activity'}
          subtitle={activeActivity ? `${activeActivity.session} • ${activeActivity.date}` : undefined}
          maxWidth="lg"
        >
          {activeActivity && (
            <div className="space-y-6 text-sm text-slate-700">
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#0B1739] text-[#D6A84F]">
                  {activeActivity.activityType.replace('_', ' ')}
                </span>
                {activeActivity.committeeRole && (
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    {activeActivity.committeeRole}
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Executive Summary
                </h4>
                <p className="leading-relaxed font-medium text-slate-800">
                  {activeActivity.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Full Parliamentary Record & Debates
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed space-y-3">
                  <p>{activeActivity.fullDetails}</p>
                </div>
              </div>

              {activeActivity.outcomes && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Recorded Resolutions & Mandates
                  </h4>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
                    {activeActivity.outcomes}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button onClick={() => setActiveActivity(null)} variant="outline" size="sm">
                  Close Window
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </main>
  );
};
