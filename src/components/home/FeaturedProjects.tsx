import React from 'react';
import { Project } from '../../types';
import { ProjectCard } from '../projects/ProjectCard';
import { Button } from '../ui/Button';
import { HardHat, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FeaturedProjectsProps {
  projects: Project[];
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-20 md:py-24 bg-[#F7F8FC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1746A2] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Constituency Infrastructure & Welfare
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0B1739] tracking-tight">
              Featured Projects & Initiatives
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl leading-relaxed">
              Track reported community infrastructure interventions, healthcare advocacy, water accessibility programs, and welfare support across Ajaokuta Constituency.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              to="/projects"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Browse All Projects
            </Button>
          </div>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Informational banner about evidence and status taxonomy */}
        <div className="mt-12 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#008751] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0B1739]">
                Public Transparency Protocol
              </h4>
              <p className="text-xs text-slate-500">
                All projects are categorized by verifiable milestones: Proposed, Announced, Approved, Ongoing, or Awaiting Verification.
              </p>
            </div>
          </div>

          <Button to="/projects" variant="outline" size="sm">
            Review Project Taxonomy
          </Button>
        </div>
      </div>
    </section>
  );
};
