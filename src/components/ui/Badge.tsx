import React from 'react';
import { ProjectStatus, SubmissionStatus } from '../../types';

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md';
}

export const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({ status, size = 'md' }) => {
  const configs: Record<
    ProjectStatus,
    { label: string; bg: string; text: string; border: string; dot: string }
  > = {
    proposed: {
      label: 'Proposed',
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      dot: 'bg-blue-500',
    },
    announced: {
      label: 'Announced',
      bg: 'bg-indigo-50',
      text: 'text-indigo-800',
      border: 'border-indigo-200',
      dot: 'bg-indigo-500',
    },
    approved: {
      label: 'Approved',
      bg: 'bg-teal-50',
      text: 'text-teal-800',
      border: 'border-teal-200',
      dot: 'bg-teal-600',
    },
    ongoing: {
      label: 'Ongoing',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
      dot: 'bg-amber-500',
    },
    completed: {
      label: 'Completed',
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      dot: 'bg-emerald-600',
    },
    on_hold: {
      label: 'On Hold',
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      border: 'border-rose-200',
      dot: 'bg-rose-500',
    },
    awaiting_verification: {
      label: 'Awaiting Verification',
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      dot: 'bg-slate-400',
    },
  };

  const config = configs[status] || configs.awaiting_verification;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs md:text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${padding}`}
      title={`Project Status: ${config.label}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
};

export const SubmissionStatusBadge: React.FC<{ status: SubmissionStatus }> = ({ status }) => {
  const configs: Record<SubmissionStatus, { label: string; badgeClass: string; dotClass: string }> = {
    received: {
      label: 'Received',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      dotClass: 'bg-blue-500',
    },
    under_review: {
      label: 'Under Review',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      dotClass: 'bg-amber-500',
    },
    referred: {
      label: 'Referred to Agency',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      dotClass: 'bg-purple-500',
    },
    response_provided: {
      label: 'Response Provided',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotClass: 'bg-emerald-500',
    },
    closed: {
      label: 'Closed',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
      dotClass: 'bg-slate-400',
    },
  };

  const item = configs[status] || configs.received;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${item.badgeClass}`}
    >
      <span className={`w-2 h-2 rounded-full ${item.dotClass}`} aria-hidden="true" />
      {item.label}
    </span>
  );
};
