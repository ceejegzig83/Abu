import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { ProjectStatusBadge } from '../ui/Badge';
import { MapPin, Calendar, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1746A2] border border-blue-100">
            {project.category}
          </span>
          <ProjectStatusBadge status={project.status} size="sm" />
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-bold text-[#0B1739] group-hover:text-[#1746A2] transition line-clamp-2 mb-2 leading-snug">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        {/* Short Summary */}
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* Location & Metadata */}
        <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#008751] shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Updated: {project.updatedAt}</span>
          </div>
        </div>

        {/* Content Status Note */}
        {project.verificationNote && (
          <div className="mt-3 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 leading-normal flex items-start gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{project.verificationNote}</span>
          </div>
        )}
      </div>

      {/* Card Action Link */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {project.progressUpdates ? `${project.progressUpdates.length} Reports` : 'Verified Draft'}
        </span>
        <Link
          to={`/projects/${project.slug}`}
          className="text-xs font-bold text-[#1746A2] group-hover:text-[#0B1739] inline-flex items-center gap-1"
        >
          <span>View Project Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </article>
  );
};
