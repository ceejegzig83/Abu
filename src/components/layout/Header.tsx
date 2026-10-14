import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Send, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Legislative Activities', path: '/legislative' },
    { label: 'News & Media', path: '/news' },
    { label: 'Constituency Portal', path: '/constituency' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top utility bar */}
      <div className="bg-[#0B1739] text-white text-xs py-2 border-b border-white/10 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Kogi State House of Assembly
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">
              Ajaokuta Constituency Official Portal
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-[#D6A84F] font-semibold">
              Chairman, House Committee on Lands
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/constituency"
              className="text-slate-300 hover:text-[#D6A84F] transition flex items-center gap-1"
            >
              Track Petition
            </Link>
            <span className="text-slate-500">·</span>
            <Link
              to="/admin/login"
              className="text-slate-400 hover:text-white transition flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-[#D6A84F]" />
              Staff Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Brand Mark */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#1746A2] rounded-lg p-1"
            aria-label="Hon. Jibril Abu II (Wisdombank) Home"
          >
            {/* Official Portrait Brand Badge */}
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-[#D6A84F] shadow-sm shrink-0 bg-[#0B1739] group-hover:scale-105 transition">
              <img
                src="/images/hon-jibril-abu.jpg"
                alt="Hon. Jibril Abu II"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/fVC3sZmc/Abu-Jib.jpg';
                }}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg md:text-xl font-extrabold text-[#0B1739] tracking-tight group-hover:text-[#1746A2] transition">
                  HON. JIBRIL ABU II
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D6A84F]">
                  WISDOMBANK
                </span>
                <span className="text-slate-300 text-xs">•</span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Ajaokuta Constituency
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-[#1746A2] bg-blue-50/70'
                      : 'text-slate-700 hover:text-[#1746A2] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D6A84F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              to="/contact"
              variant="primary"
              size="sm"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Contact Office
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/constituency"
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 text-[#1746A2] border border-blue-200"
            >
              Petition
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#0B1739] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1746A2]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-4 duration-200">
            <div className="px-4 pt-3 pb-6 space-y-1">
              <div className="p-3 mb-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-[#0B1739]">Kogi State House of Assembly</span>
                <p className="mt-0.5 text-slate-500">Ajaokuta Constituency Representative Portal</p>
              </div>

              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-[#1746A2] font-bold border-l-4 border-[#1746A2]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <Button to="/contact" variant="primary" size="md" className="w-full">
                  Contact Hon. Jibril
                </Button>
                <Button to="/admin/login" variant="ghost" size="sm" className="w-full text-slate-500">
                  Staff Administrative Portal
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
