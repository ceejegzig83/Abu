import React, { useState } from 'react';
import {
  SubmissionCategory,
  CommunitySubmission,
} from '../types';
import {
  createCommunitySubmission,
  getSubmissionByReference,
  getSubmissions,
} from '../lib/storage';
import { SubmissionStatusBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import {
  HeartHandshake,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Clock,
  HelpCircle,
  MapPin,
  ChevronDown,
  ChevronUp,
  FileText,
  User,
  Phone,
  Mail,
} from 'lucide-react';

export const ConstituencyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [community, setCommunity] = useState('');
  const [category, setCategory] = useState<SubmissionCategory>('Road and Infrastructure');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'email' | 'sms'>('phone');
  const [consent, setConsent] = useState(false);

  // Validation & Feedback State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedItem, setSubmittedItem] = useState<CommunitySubmission | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Tracking State
  const [searchReference, setSearchReference] = useState('');
  const [trackedSubmission, setTrackedSubmission] = useState<CommunitySubmission | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  // FAQ open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ajaokutaWards = [
    'Adogo Ward',
    'Geregu Ward',
    'Upake Community',
    'Eganyi Ward',
    'Ebiya Ward',
    'Ajaokuta Native Town',
    'Abodi / Ogigiri Axis',
    'Old Ajaokuta / Riverine Ward',
    'Steel Township / Camp Areas',
    'Other Community / Settlement',
  ];

  const categories: SubmissionCategory[] = [
    'Road and Infrastructure',
    'Water and Sanitation',
    'Healthcare',
    'Education',
    'Community Support',
    'Land-Related Concern',
    'Petition',
    'Other',
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!community.trim()) newErrors.community = 'Please specify your ward or community.';
    if (!subject.trim()) newErrors.subject = 'Please enter a clear subject.';
    if (!description.trim() || description.trim().length < 20) {
      newErrors.description = 'Please provide at least 20 characters describing the issue.';
    }
    if (!consent) {
      newErrors.consent = 'You must consent to data processing for the purpose of this inquiry.';
    }
    if (preferredContact === 'email' && !email.trim()) {
      newErrors.email = 'Email address is required when selecting email contact.';
    }
    if ((preferredContact === 'phone' || preferredContact === 'sms') && !phone.trim()) {
      newErrors.phone = 'Phone number is required when selecting phone or SMS contact.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate safe server registration
    setTimeout(() => {
      const created = createCommunitySubmission({
        fullName: fullName.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        community,
        category,
        subject: subject.trim(),
        description: description.trim(),
        location: location.trim() || undefined,
        preferredContact,
        consent,
      });

      setIsSubmitting(false);
      setSubmittedItem(created);

      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setDescription('');
      setLocation('');
      setConsent(false);
    }, 600);
  };

  const handleTrackLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchReference.trim()) return;

    setTrackSearched(true);
    const found = getSubmissionByReference(searchReference.trim());
    setTrackedSubmission(found || null);
  };

  const copyRefCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const faqs = [
    {
      q: 'How are community requests and petitions handled by the office?',
      a: 'Every submission is automatically logged and assigned a tracking reference code. It is assigned to a dedicated constituency case officer who assesses the scope, liaises with local ward committees, and forwards recommendations to Hon. Jibril Abu II for legislative action or referral to relevant state ministries.',
    },
    {
      q: 'Who can submit a petition or community concern?',
      a: 'Any resident, community leader, youth group, woman leader, or development association within Ajaokuta Constituency can submit requests or petitions regarding community infrastructure, healthcare, water, and social support.',
    },
    {
      q: 'How can I check the status of my submission later?',
      a: 'Retain the unique reference number provided upon submission (e.g., AJK-2025-XXXX). Enter it into the "Track Existing Submission" tab on this portal at any time to review real-time status updates and official staff memos.',
    },
    {
      q: 'Is my personal information kept confidential?',
      a: 'Yes. In strict accordance with Nigerian data protection principles, contact information and sensitive details are accessible solely by authorized constituency staff and are never made publicly searchable.',
    },
  ];

  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1746A2] text-xs font-semibold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5 text-[#D6A84F]" />
            Constituency Engagement Desk
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1739] tracking-tight">
            Community Outreach & Petition Portal
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Submit community development needs, report critical local infrastructure challenges, or track existing petitions with verified reference codes.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300">
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'submit'
                  ? 'bg-white text-[#0B1739] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-[#1746A2]" />
              <span>Submit Request / Petition</span>
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'track'
                  ? 'bg-white text-[#0B1739] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#008751]" />
              <span>Track Existing Submission</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Submit Form */}
        {activeTab === 'submit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Container (lg:col-span-8) */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1739] mb-1">
                Constituency Issue Submission Form
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Please provide accurate details so the constituency liaison team can investigate and process your submission.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Musa Abdullahi or Grace Ojoma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2] ${
                      errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Ward / Community & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Ward or Community <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={community}
                      onChange={(e) => setCommunity(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1746A2] ${
                        errors.community ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                      }`}
                    >
                      <option value="">-- Select Ward or Settlement --</option>
                      {ajaokutaWards.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                    {errors.community && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.community}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Request Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as SubmissionCategory)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1746A2]"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. yourname@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2] ${
                        errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +234 803 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2] ${
                        errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subject / Concern Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Non-functional solar borehole in central market"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2] ${
                      errors.subject ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-600 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Detailed Description of Issue <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Please explain the community issue, how long it has persisted, who is affected, and what action is requested..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2] ${
                      errors.description ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Minimum 20 characters</span>
                    <span>{description.length} characters</span>
                  </div>
                  {errors.description && (
                    <p className="text-xs text-red-600 mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Specific Location & Preferred Response Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Specific Location / Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Upake Community Health Post"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Preferred Response Method
                    </label>
                    <div className="flex items-center gap-4 pt-2">
                      <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={preferredContact === 'phone'}
                          onChange={() => setPreferredContact('phone')}
                        />
                        <span>Phone Call</span>
                      </label>
                      <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="sms"
                          checked={preferredContact === 'sms'}
                          onChange={() => setPreferredContact('sms')}
                        />
                        <span>SMS Text</span>
                      </label>
                      <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={preferredContact === 'email'}
                          onChange={() => setPreferredContact('email')}
                        />
                        <span>Email</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded text-[#1746A2] focus:ring-[#1746A2]"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I have read the privacy notice and consent to the processing of the information submitted for the purpose of reviewing and responding to this request.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-red-600 mt-1">{errors.consent}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Registering Submission...' : 'Submit Community Request'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Sidebar Guide & Process (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#0B1739]">
                  <ShieldCheck className="w-5 h-5 text-[#008751]" />
                  <h3 className="font-bold text-base">How Submissions Are Processed</h3>
                </div>

                <ol className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1746A2] font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span>
                      <strong>Instant Reference Code:</strong> You receive a unique AJK ID immediately upon submission.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1746A2] font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span>
                      <strong>Desk Assessment:</strong> The constituency liaison team reviews the issue within 48–72 hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1746A2] font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <span>
                      <strong>Legislative Action / Referral:</strong> Matters requiring state intervention are channeled to relevant ministries or tabled during plenary.
                    </span>
                  </li>
                </ol>
              </div>

              {/* Sample test codes helper for convenience */}
              <div className="p-5 rounded-2xl bg-[#0B1739] text-white space-y-2">
                <h4 className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
                  Test / Existing Submissions
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You can test the tracking system with these existing sample codes:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      setActiveTab('track');
                      setSearchReference('AJK-2025-8391');
                      const found = getSubmissionByReference('AJK-2025-8391');
                      setTrackedSubmission(found || null);
                      setTrackSearched(true);
                    }}
                    className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 font-mono text-xs text-slate-200 transition cursor-pointer"
                  >
                    AJK-2025-8391
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('track');
                      setSearchReference('AJK-2025-4109');
                      const found = getSubmissionByReference('AJK-2025-4109');
                      setTrackedSubmission(found || null);
                      setTrackSearched(true);
                    }}
                    className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 font-mono text-xs text-slate-200 transition cursor-pointer"
                  >
                    AJK-2025-4109
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Track Existing Submission */}
        {activeTab === 'track' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <h2 className="text-xl font-bold text-[#0B1739] text-center">
                Track Constituency Submission Status
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 text-center max-w-md mx-auto">
                Enter your unique reference tracking code (e.g., AJK-2025-8391) to check official review notes and assigned status.
              </p>

              <form onSubmit={handleTrackLookup} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter reference code (e.g. AJK-2025-8391)..."
                    value={searchReference}
                    onChange={(e) => setSearchReference(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-mono uppercase bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#1746A2]"
                  />
                </div>
                <Button type="submit" variant="primary">
                  Check Status
                </Button>
              </form>
            </div>

            {/* Tracking Result */}
            {trackSearched && (
              <div>
                {trackedSubmission ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6 animate-in fade-in duration-200">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-xs text-slate-500 block">Reference Code</span>
                        <span className="text-xl font-mono font-extrabold text-[#1746A2]">
                          {trackedSubmission.referenceCode}
                        </span>
                      </div>
                      <SubmissionStatusBadge status={trackedSubmission.status} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-xs">Community / Ward:</span>
                        <strong className="text-slate-800">{trackedSubmission.community}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-xs">Category:</span>
                        <strong className="text-slate-800">{trackedSubmission.category}</strong>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 block text-xs">Subject:</span>
                        <strong className="text-slate-900 text-base">{trackedSubmission.subject}</strong>
                      </div>
                    </div>

                    {/* Timeline of Public Updates */}
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      <h4 className="text-sm font-bold text-[#0B1739] flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#1746A2]" />
                        Official Action Timeline & Updates
                      </h4>

                      <div className="relative pl-6 border-l-2 border-slate-200 space-y-4">
                        {trackedSubmission.publicUpdates.map((update, idx) => (
                          <div key={idx} className="relative">
                            <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#008751] border-2 border-white shadow-xs" />
                            <div className="text-xs text-slate-400">
                              {new Date(update.timestamp).toLocaleDateString()} • {update.author}
                            </div>
                            <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                              {update.publicMessage}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                    <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                    <h3 className="text-base font-bold text-slate-800">
                      Reference Code Not Found
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Please double-check the tracking code. Valid codes follow the format <strong>AJK-YYYY-XXXX</strong>.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modal: Submission Confirmation */}
        <Modal
          isOpen={!!submittedItem}
          onClose={() => setSubmittedItem(null)}
          title="Your Submission Has Been Received"
          subtitle="Constituency Records Desk • Reference Generated"
          maxWidth="md"
        >
          {submittedItem && (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#008751] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                  Your Official Reference Tracking Code
                </p>
                <div className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-2xl font-mono font-extrabold text-[#1746A2]">
                    {submittedItem.referenceCode}
                  </span>
                  <button
                    onClick={() => copyRefCode(submittedItem.referenceCode)}
                    className="p-1.5 rounded-lg hover:bg-blue-100 text-[#1746A2] transition"
                    title="Copy reference code"
                  >
                    {copiedCode ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 leading-relaxed space-y-1">
                <p>
                  <strong>Category:</strong> {submittedItem.category}
                </p>
                <p>
                  <strong>Ward / Community:</strong> {submittedItem.community}
                </p>
                <p>
                  <strong>Subject:</strong> {submittedItem.subject}
                </p>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Please copy and save this reference number. You can return to this portal anytime to track progress and view responses from the constituency office.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <Button
                  onClick={() => {
                    const code = submittedItem.referenceCode;
                    setSubmittedItem(null);
                    setActiveTab('track');
                    setSearchReference(code);
                    setTrackedSubmission(submittedItem);
                    setTrackSearched(true);
                  }}
                  variant="primary"
                  size="sm"
                >
                  Track Status Now
                </Button>
                <Button
                  onClick={() => setSubmittedItem(null)}
                  variant="outline"
                  size="sm"
                >
                  Close Window
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Frequently Asked Questions */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 text-[#0B1739]">
            <HelpCircle className="w-5 h-5 text-[#1746A2]" />
            <h3 className="text-xl font-bold">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left font-bold text-sm text-[#0B1739] hover:bg-slate-50 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#1746A2] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
