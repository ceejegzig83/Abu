import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Shield,
  Building2,
  CheckCircle2,
  MapPin,
  ScrollText,
  FileCheck2,
  ArrowRight,
  Landmark,
  Scale,
  Users,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AboutPage: React.FC = () => {
  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1746A2] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#D6A84F]" />
            Official Public Profile
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1739] tracking-tight">
            About Hon. Jibril Abu II
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Public Service, Legislative Responsibility, and Community Stewardship for Ajaokuta Constituency.
          </p>
        </div>

        {/* Profile Card & Core Biography Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Profile Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#008751] via-[#D6A84F] to-[#1746A2]" />

              {/* Official Portrait */}
              <div className="w-48 h-48 mx-auto rounded-2xl bg-[#0B1739] border-2 border-[#D6A84F] p-1.5 shadow-xl mb-6 relative overflow-hidden group">
                <img
                  src="/images/hon-jibril-abu.jpg"
                  alt="Hon. Jibril Abu II (Wisdombank)"
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

              <div className="inline-block px-3 py-1 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/30 text-[#A97924] text-xs font-bold uppercase tracking-wider mb-2">
                WISDOMBANK
              </div>

              <h2 className="text-2xl font-extrabold text-[#0B1739]">
                Hon. Jibril Abu II
              </h2>

              <p className="text-sm font-semibold text-[#008751] mt-1">
                Member Representing Ajaokuta Constituency
              </p>

              <p className="text-xs text-slate-500 mt-0.5">
                Kogi State House of Assembly (8th Assembly)
              </p>

              <div className="my-6 pt-6 border-t border-slate-100 space-y-3 text-left text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <span>
                    <strong className="text-slate-900">Committee Role:</strong> Chairman, House Committee on Lands
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#008751] shrink-0" />
                  <span>
                    <strong className="text-slate-900">Constituency:</strong> Ajaokuta LGA, Kogi State, Nigeria
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Scale className="w-4 h-4 text-[#1746A2] shrink-0" />
                  <span>
                    <strong className="text-slate-900">Legislative Focus:</strong> Infrastructure, Land Tenure, Youth Empowerment
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button to="/contact" variant="primary" size="md" className="w-full">
                  Contact the Representative
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography & Legislative Responsibilities */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs space-y-5">
              <h3 className="text-2xl font-bold text-[#0B1739] tracking-tight">
                Public Service Profile
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                Hon. Jibril Abu II, popularly known as <strong>Wisdombank</strong>, represents Ajaokuta Constituency in the Kogi State House of Assembly. His public profile includes service as Chairman of the House Committee on Lands. This platform provides transparent, verifiable information about his public responsibilities, published activities, and active engagement with the people he represents.
              </p>

              <p className="text-base text-slate-700 leading-relaxed">
                As the representative of one of Nigeria’s most strategically endowed industrial and agrarian constituencies, Hon. Jibril's legislative priority centers on grassroots responsiveness, equitable infrastructure development, and institutional oversight that drives practical benefits to everyday citizens.
              </p>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-sm text-blue-900 space-y-2">
                <span className="font-bold flex items-center gap-1.5 text-[#1746A2]">
                  <CheckCircle2 className="w-4 h-4" />
                  Core Legislative Philosophy:
                </span>
                <p className="text-xs sm:text-sm text-blue-800 italic">
                  "Leadership is an accountable trust. Representation must never be distant; it must touch the roads our farmers traverse, the water our children drink, the security of the lands our families cultivate, and the economic opportunities available to our youths."
                </p>
              </div>
            </div>

            {/* Committee on Lands Feature Box */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0B1739] to-[#16244f] text-white p-6 md:p-8 shadow-md border-l-4 border-[#D6A84F] space-y-5">
              <div className="flex items-center gap-2.5 text-[#D6A84F]">
                <Award className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Parliamentary Committee Leadership
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">
                Chairman, House Committee on Lands
              </h3>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                As Chairman of the House Committee on Lands in the Kogi State House of Assembly, Hon. Jibril Abu II exercises legislative oversight over statutory land administration, cadastral reforms, and property rights protection across Kogi State.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-[#D6A84F]" />
                    Cadastral Transparency
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Advocating efficient and accessible issuance of Certificates of Occupancy (C of O) through the Kogi State Geographic Information System.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-emerald-400" />
                    Customary Land Security
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Protecting indigenous farmers and communal landholders against arbitrary boundary encroachments through proactive dispute mediation.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  to="/legislative"
                  variant="gold"
                  size="sm"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  View Committee Updates & Oversight Briefs
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Understanding Ajaokuta Constituency */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#008751] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Constituency Profile
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1739] mt-3">
              Representing Ajaokuta: Industrial Heartland & Agrarian Heartland
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Ajaokuta Constituency is located in the Central Senatorial District of Kogi State along the strategic banks of the River Niger. Famously home to the landmark Ajaokuta Steel Complex, it is also a rich agricultural corridor encompassing diverse communities such as Adogo, Geregu, Upake, Eganyi, Ebiya, and riverine settlements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <Building2 className="w-6 h-6 text-[#1746A2] mb-2" />
              <h4 className="text-base font-bold text-[#0B1739]">Industrial Rejuvenation</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Continuous legislative collaboration with state and federal authorities to unlock the full commercial potentials of the Ajaokuta industrial corridor and create sustainable manufacturing employment.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <Users className="w-6 h-6 text-[#008751] mb-2" />
              <h4 className="text-base font-bold text-[#0B1739]">Agrarian Development</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Prioritizing motorable rural feeder roads, motorized water boreholes, and localized storage facilities to protect local agricultural livelihoods and enhance food security.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <Landmark className="w-6 h-6 text-[#D6A84F] mb-2" />
              <h4 className="text-base font-bold text-[#0B1739]">Communal Harmony</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Fostering inter-community dialogue, youth empowerment programs, and peaceful dispute resolution among traditional and contemporary stakeholders.
              </p>
            </div>
          </div>
        </div>

        {/* Verification & Transparency Commitment */}
        <div className="rounded-2xl bg-slate-100 border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#1746A2] shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-[#0B1739]">
                Commitment to Verified Public Information
              </h4>
              <p className="text-xs text-slate-600">
                Biographical facts, legislative records, and project updates on this site are regularly reviewed by the media bureau for strict factual accuracy.
              </p>
            </div>
          </div>

          <Button to="/contact" variant="outline" size="sm">
            Inquire With Official Bureau
          </Button>
        </div>
      </div>
    </main>
  );
};
