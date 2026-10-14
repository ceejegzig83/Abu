import React, { useState, useEffect, useMemo } from 'react';
import { Project, ProjectCategory, ProjectStatus } from '../types';
import { getProjects, subscribeToStore } from '../lib/storage';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectStatusBadge } from '../components/ui/Badge';
import { Search, Filter, HardHat, Info, CheckCircle2 } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    const unsub = subscribeToStore(() => {
      setProjects(getProjects());
    });
    return unsub;
  }, []);

  const categories: string[] = [
    'all',
    'Healthcare',
    'Roads & Infrastructure',
    'Water Access',
    'Constituency Support',
    'Land Administration',
    'Youth & Women Empowerment',
  ];

  const statuses: { label: string; value: string }[] = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Proposed', value: 'proposed' },
    { label: 'Announced', value: 'announced' },
    { label: 'Approved', value: 'approved' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Completed', value: 'completed' },
    { label: 'On Hold', value: 'on_hold' },
    { label: 'Awaiting Verification', value: 'awaiting_verification' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'all' || project.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus]);

  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1746A2] text-xs font-semibold uppercase tracking-wider">
            <HardHat className="w-3.5 h-3.5 text-[#D6A84F]" />
            Community Development Tracker
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1739] tracking-tight">
            Constituency Projects & Initiatives
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore reported community development initiatives, healthcare advocacy, infrastructure improvements, and constituency support programs across Ajaokuta Constituency.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects by keyword, ward, or community..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1746A2] text-sm bg-slate-50/50"
              />
            </div>

            {/* Category Select */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1746A2] text-sm bg-slate-50/50 text-slate-700"
              >
                <option value="all">All Categories</option>
                {categories.filter((c) => c !== 'all').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Select */}
            <div className="md:col-span-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1746A2] text-sm bg-slate-50/50 text-slate-700"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2">
            <span className="text-xs font-semibold text-slate-500 shrink-0">
              Quick Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1746A2] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Initiatives' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-semibold text-slate-700">
              Showing <span className="text-[#1746A2]">{filteredProjects.length}</span>{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>

            {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="text-xs font-semibold text-[#1746A2] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <HardHat className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No matching projects found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
                Try adjusting your search criteria or filter selections to view reported constituency initiatives.
              </p>
            </div>
          )}
        </div>

        {/* Project Status Definition Guide */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-2.5 text-[#0B1739]">
            <Info className="w-5 h-5 text-[#1746A2]" />
            <h3 className="text-lg font-bold">
              Project Status Transparency Guide
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In accordance with public accountability principles, projects published on this platform are categorized strictly by documented evidence rather than unverified promises:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80">
              <div className="font-bold text-blue-900 mb-1">Proposed / Announced</div>
              <p className="text-blue-800">
                Identified via community needs assessments or formal legislative motions; undergoing stakeholder or executive review.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200/80">
              <div className="font-bold text-teal-900 mb-1">Approved</div>
              <p className="text-teal-800">
                Formally validated by legislative resolution, partner agency, or executive budgetary appropriation.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80">
              <div className="font-bold text-amber-900 mb-1">Ongoing</div>
              <p className="text-amber-800">
                Physical work, materials distribution, or site implementation actively verified on the ground.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 mb-1">Awaiting Verification</div>
              <p className="text-slate-600">
                Community submission received and undergoing technical engineering reconnaissance before formal listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
