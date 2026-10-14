import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  Building,
  HeartHandshake,
} from 'lucide-react';
import { getSiteSettings } from '../../lib/storage';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const settings = getSiteSettings();

  return (
    <footer className="bg-[#0B1739] text-white pt-16 pb-12 border-t-4 border-[#D6A84F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Identity (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#D6A84F] shadow-sm shrink-0 bg-[#0B1739]">
                <img
                  src="/images/hon-jibril-abu.jpg"
                  alt="Hon. Jibril Abu II"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/fVC3sZmc/Abu-Jib.jpg';
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">HON. JIBRIL ABU II</h3>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#D6A84F]">
                  WISDOMBANK
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Official digital platform for constituency reporting, legislative stewardship, infrastructure tracking, and participatory governance for Ajaokuta Constituency, Kogi State House of Assembly.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Chairman, House Committee on Lands</span>
            </div>

            <div className="pt-1">
              <a
                href={settings.facebookUrl || 'https://www.facebook.com/ABU-JIBRIL-II'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition"
              >
                <svg className="w-4 h-4 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Follow "ABU JIBRIL II" on Facebook</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D6A84F]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Hon. Jibril
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition">
                  Constituency Projects
                </Link>
              </li>
              <li>
                <Link to="/legislative" className="hover:text-white transition">
                  Legislative Activities
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-white transition">
                  News & Press Releases
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-white transition">
                  Photo & Media Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Citizen Engagement (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D6A84F]">
              Constituency Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link
                  to="/constituency"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <HeartHandshake className="w-4 h-4 text-[#D6A84F]" />
                  <span>Submit Community Request</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/constituency"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
                  <span>Track Petition Status</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Constituency Office
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Committee on Lands Overview
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-white transition text-slate-400">
                  Staff Administrative Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact & Hours (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D6A84F]">
              Constituency Office
            </h4>
            <div className="space-y-3 text-xs md:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                <span>{settings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <span className="break-all">{settings.officialEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <span>{settings.officialPhone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                <span>{settings.contactHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="my-8 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">
            Official Public Transparency & Legislative Notice
          </p>
          <p>
            Information published on this website is provided for public transparency and community reporting. Project descriptions, infrastructure updates, and legislative briefs should be read alongside their cited dates and public sources. This portal represents the constituency office of Hon. Jibril Abu II and operates in constructive alignment with, but as an independent representative platform distinct from, the official statutory secretariat of the Kogi State House of Assembly.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {currentYear} Office of Hon. Jibril Abu II (Wisdombank). All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-white transition">
              Privacy Notice
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/terms" className="hover:text-white transition">
              Terms of Use
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/contact" className="hover:text-white transition">
              Content Corrections
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/admin/login" className="hover:text-[#D6A84F] transition">
              Authorized Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
