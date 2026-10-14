import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../lib/storage';
import { ProjectStatusBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  FileCheck2,
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <main id="main-content" className="py-24 text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-slate-200">
          <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0B1739]">Project Not Found</h1>
          <p className="text-sm text-slate-600 mt-2 mb-6">
            The project record you are looking for may have been moved or updated.
          </p>
          <Button to="/projects" variant="primary">
            Back to Projects Directory
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1746A2] hover:text-[#0B1739] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Header Card */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-blue-50 text-[#1746A2] border border-blue-200">
              {project.category}
            </span>
            <ProjectStatusBadge status={project.status} size="md" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1739] tracking-tight leading-tight">
            {project.title}
          </h1>

          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#008751] shrink-0" />
              <span>
                <strong>Location:</strong> {project.location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                <strong>Updated:</strong> {project.updatedAt}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#1746A2] shrink-0" />
              <span>
                <strong>Gazette ID:</strong> {project.slug}
              </span>
            </div>
          </div>

          {/* Verification Notice Banner */}
          {project.verificationNote && (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Verification & Status Notice:</strong>
                <p className="mt-0.5 leading-relaxed">{project.verificationNote}</p>
              </div>
            </div>
          )}
        </div>

        {/* Project Description & Context */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-[#0B1739]">Executive Summary & Scope</h2>
          <p className="text-base text-slate-700 leading-relaxed font-medium">
            {project.summary}
          </p>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
            <p>{project.description}</p>
          </div>

          {project.targetBeneficiaries && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Users className="w-5 h-5 text-[#1746A2] shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block">
                  Target Beneficiaries & Community Scope:
                </strong>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {project.targetBeneficiaries}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Progress Timeline Updates */}
        {project.progressUpdates && project.progressUpdates.length > 0 && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-[#0B1739] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#008751]" />
              Progress & Milestone Updates
            </h2>

            <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
              {project.progressUpdates.map((update, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#1746A2] border-2 border-white shadow-xs" />

                  <span className="text-xs font-semibold text-slate-400 block mb-1">
                    {update.date}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {update.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {update.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supporting Documentation & External Sources */}
        {project.evidenceUrls && project.evidenceUrls.length > 0 && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#0B1739]">
              Official Reference Documents & Evidence
            </h2>
            <p className="text-xs text-slate-500">
              Cross-reference verified records on government portals and institutional gazettes.
            </p>

            <ul className="space-y-2">
              {project.evidenceUrls.map((url, idx) => (
                <li key={idx}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#1746A2] hover:underline font-medium"
                  >
                    <span>{url}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Community Feedback Box */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0B1739] to-[#16244f] text-white p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#D6A84F]" />
              Do you have community feedback on this initiative?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Constituents can submit on-the-ground observations, community petitions, or inquiries regarding this project directly to the liaison office.
            </p>
          </div>

          <Button
            to="/constituency"
            variant="gold"
            size="md"
            className="shrink-0 whitespace-nowrap"
          >
            Submit Feedback
          </Button>
        </div>
      </div>
    </main>
  );
};
