import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Award, CheckCircle2, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#0B1739] text-white overflow-hidden py-16 md:py-24 border-b border-white/10">
      {/* Subtle geometric background accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#1746A2] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#D6A84F] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#008751]/20 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Content: 58% on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D6A84F]/40 text-xs md:text-sm font-semibold tracking-wide text-white">
              <span className="w-2 h-2 rounded-full bg-[#008751] inline-block animate-pulse" />
              <span className="text-[#D6A84F]">OFFICIAL CONSTITUENCY INFORMATION</span>
              <span className="text-white/40">|</span>
              <span className="text-slate-300">KOGI STATE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Building Connections.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6A84F] via-[#ecd599] to-[#D6A84F]">
                Advancing Ajaokuta.
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Welcome to the official digital platform for <strong className="text-white font-semibold">Hon. Jibril Abu II</strong>, popularly known as <span className="text-[#D6A84F] font-bold">Wisdombank</span>. Explore published legislative activities, constituency initiatives, project updates, and opportunities to communicate with the office.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                to="/projects"
                variant="gold"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Explore Constituency Projects
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                Contact the Office
              </Button>
            </div>

            {/* Three concise service focus points */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#008751] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Legislative Advocacy
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Constituency-first bills, motions & debates
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#D6A84F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Lands Committee
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Equitable tenure & cadastral transparency
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#2463C5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Civic Engagement
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Direct citizen petitions & tracked cases
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Portrait Container: 42% on desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative gold backdrop border frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#D6A84F]/30 via-[#1746A2]/40 to-[#008751]/30 blur-xs" />

              <div className="relative rounded-2xl bg-[#070e24] border-2 border-[#D6A84F]/40 p-6 sm:p-8 text-center shadow-2xl overflow-hidden">
                {/* Official Nigerian Flag Ribbon Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#008751] via-white to-[#008751]" />

                {/* Official Portrait Frame */}
                <div className="mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-2xl bg-[#0B1739] border-2 border-[#D6A84F] p-1.5 shadow-xl relative group overflow-hidden">
                  <img
                    src="/images/hon-jibril-abu.jpg"
                    alt="Official Portrait of Hon. Jibril Abu II (Wisdombank)"
                    className="w-full h-full object-cover object-top rounded-xl"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/fVC3sZmc/Abu-Jib.jpg';
                    }}
                  />
                  <div className="absolute bottom-2.5 inset-x-2.5 py-1 px-2 rounded-lg bg-[#0B1739]/85 backdrop-blur-xs text-center border border-[#D6A84F]/40">
                    <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider block">
                      Hon. Jibril Abu II
                    </span>
                  </div>
                </div>

                {/* Official Profile Badge Panel */}
                <div className="mt-6 space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/30 text-[#D6A84F] text-xs font-bold tracking-widest uppercase">
                    WISDOMBANK
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    Hon. Jibril Abu II
                  </h3>
                  <p className="text-sm font-semibold text-emerald-400">
                    Member Representing Ajaokuta Constituency
                  </p>
                  <p className="text-xs text-slate-300">
                    Kogi State House of Assembly
                  </p>

                  <div className="pt-3 border-t border-white/10 mt-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#D6A84F] font-medium">
                      <Award className="w-3.5 h-3.5 text-[#D6A84F]" />
                      Chairman, House Committee on Lands
                    </span>
                  </div>
                </div>

                {/* Sub-card with constituency coordinates */}
                <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-left">
                    <MapPin className="w-4 h-4 text-[#008751]" />
                    <span>Ajaokuta LGA, Kogi State</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 bg-black/30 px-2 py-0.5 rounded">
                    8th Assembly
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
