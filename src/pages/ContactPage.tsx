import React, { useState } from 'react';
import { getSiteSettings } from '../lib/storage';
import { Button } from '../components/ui/Button';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Building,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const settings = getSiteSettings();

  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email address or phone number is required.';
    }
    if (!subject.trim()) newErrors.subject = 'Subject is required.';
    if (!message.trim() || message.trim().length < 15) {
      newErrors.message = 'Please provide a detailed message (minimum 15 characters).';
    }
    if (!consent) {
      newErrors.consent = 'Consent is required to submit your inquiry.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmailOrPhone('');
      setSubject('');
      setMessage('');
      setConsent(false);
    }, 600);
  };

  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1746A2] text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-[#D6A84F]" />
            Official Constituency Communications
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1739] tracking-tight">
            Contact the Constituency Office
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            For official inquiries, legislative petitions, community partnership proposals, or constituency matters, connect through verified channels.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office Details (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#0B1739]">
                  Constituency Liaison Secretariat
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Office of Hon. Jibril Abu II (Wisdombank)
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1746A2] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">
                      Liaison Office Address
                    </strong>
                    <span className="text-xs sm:text-sm text-slate-600">
                      {settings.officeAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1746A2] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">
                      Official Email
                    </strong>
                    <span className="text-xs sm:text-sm text-slate-600 break-all">
                      {settings.officialEmail}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1746A2] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">
                      Constituency Helpline
                    </strong>
                    <span className="text-xs sm:text-sm text-slate-600">
                      {settings.officialPhone}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1746A2] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">
                      Consultation Hours
                    </strong>
                    <span className="text-xs sm:text-sm text-slate-600">
                      {settings.contactHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Media Link */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={settings.facebookUrl || 'https://www.facebook.com/ABU-JIBRIL-II'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-[#1746A2] font-semibold text-xs transition flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Official Facebook: ABU JIBRIL II
                  </span>
                  <span className="font-bold">Follow & Connect</span>
                </a>
              </div>
            </div>

            {/* Notice card */}
            <div className="p-5 rounded-2xl bg-[#0B1739] text-white space-y-2">
              <div className="flex items-center gap-2 text-[#D6A84F] font-bold text-xs uppercase tracking-wider">
                <Building className="w-4 h-4" />
                Constituency Petitions & Requests
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you wish to submit an infrastructure petition with trackable reference numbers, we recommend using the{' '}
                <a href="/constituency" className="text-[#D6A84F] underline font-medium">
                  Constituency Portal
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1739] mb-1">
              Send a Direct Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Official messages are routed directly to the representative's correspondence secretariat.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#008751] mx-auto" />
                <h3 className="text-lg font-bold text-emerald-950">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your communication has been documented by the secretariat and will be reviewed during scheduled consultation hours.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    size="sm"
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2] ${
                      errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address or Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. name@example.com or +234..."
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2] ${
                      errors.emailOrPhone ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.emailOrPhone && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.emailOrPhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subject / Topic <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Parliamentary oversight inquiry or community consultation"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2] ${
                      errors.subject ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2] ${
                      errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded text-[#1746A2] focus:ring-[#1746A2]"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I consent to the correspondence desk storing and processing this contact information to formulate an appropriate reply.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-red-600 mt-1">{errors.consent}</p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
