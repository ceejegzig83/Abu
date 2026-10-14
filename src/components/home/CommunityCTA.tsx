import React from 'react';
import { Button } from '../ui/Button';
import { HeartHandshake, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

export const CommunityCTA: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B1739] text-white relative overflow-hidden border-t-2 border-[#D6A84F]">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1746A2] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D6A84F] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D6A84F]/40 text-xs font-semibold text-[#D6A84F] uppercase tracking-wider mb-4">
          <HeartHandshake className="w-4 h-4 text-[#D6A84F]" />
          Direct Representation & Civic Accountability
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Your Community.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6A84F] via-[#ecd599] to-[#D6A84F]">
            Your Voice.
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Have a community concern, an infrastructure request, or information you would like the constituency office to review? Submit it securely through the constituency engagement portal.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            to="/constituency"
            variant="gold"
            size="lg"
            icon={<FileText className="w-5 h-5" />}
          >
            Submit a Community Request
          </Button>

          <Button
            to="/constituency"
            variant="outline"
            size="lg"
            icon={<ShieldCheck className="w-5 h-5" />}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Track Petition Status
          </Button>
        </div>

        {/* Key Features of Portal */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D6A84F] mt-1.5 shrink-0" />
            <div>
              <strong className="text-white block text-sm">Verifiable Reference Code</strong>
              Every submission automatically receives a unique identifier (e.g., AJK-2025-XXXX).
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <div>
              <strong className="text-white block text-sm">Direct Staff Review</strong>
              Assigned case officers review community cases and document official progress.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#2463C5] mt-1.5 shrink-0" />
            <div>
              <strong className="text-white block text-sm">Privacy Guaranteed</strong>
              Personal citizen data is strictly protected under institutional data safeguards.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
