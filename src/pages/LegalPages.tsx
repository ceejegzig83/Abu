import React from 'react';
import { Shield, FileText, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1746A2] hover:text-[#0B1739] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="flex items-center gap-3 text-[#0B1739]">
            <Shield className="w-8 h-8 text-[#1746A2]" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">Privacy Notice</h1>
              <p className="text-xs text-slate-400">
                Effective Date: 2025 • Office of Hon. Jibril Abu II (Wisdombank)
              </p>
            </div>
          </div>

          <p>
            The Office of Hon. Jibril Abu II, representing Ajaokuta Constituency in the Kogi State House of Assembly, is committed to safeguarding the privacy and personal data of constituents, community leaders, and website visitors.
          </p>

          <h2 className="text-lg font-bold text-[#0B1739] pt-2">
            1. Scope and Information Collected
          </h2>
          <p>
            When you interact with our Constituency Engagement Portal or Contact Forms, we collect only information strictly necessary to review and address your community concern or inquiry:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Your name, ward, or community of residence in Ajaokuta Constituency.</li>
            <li>Contact coordinates (phone number and/or email address) for follow-up notifications.</li>
            <li>Description of the community request, infrastructure issue, or petition.</li>
          </ul>

          <h2 className="text-lg font-bold text-[#0B1739] pt-2">
            2. Use of Information
          </h2>
          <p>
            Your information is utilized exclusively for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Logging, assessing, and assigning your petition to designated liaison staff.</li>
            <li>Communicating progress and resolutions back to you using your preferred contact channel.</li>
            <li>Channeling community requirements into official legislative motions, budget advocacy, or executive referrals.</li>
          </ul>

          <h2 className="text-lg font-bold text-[#0B1739] pt-2">
            3. Protection and Non-Disclosure
          </h2>
          <p>
            We do not sell, rent, commercialize, or publicly disclose citizen phone numbers, email addresses, or identities. Personal contact information is accessible only to vetted legislative assistants and case officers bound by institutional discretion.
          </p>

          <h2 className="text-lg font-bold text-[#0B1739] pt-2">
            4. Inquiries & Corrections
          </h2>
          <p>
            To request updates or deletions of records submitted to the constituency office, please contact{' '}
            <span className="font-semibold text-[#1746A2]">privacy@honjibrilabu.ng</span>.
          </p>
        </div>
      </div>
    </main>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <main id="main-content" className="py-12 md:py-20 bg-[#F7F8FC]">
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1746A2] hover:text-[#0B1739] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="flex items-center gap-3 text-[#0B1739]">
            <FileText className="w-8 h-8 text-[#D6A84F]" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">Terms of Use</h1>
              <p className="text-xs text-slate-400">
                Official Digital Platform Notice
              </p>
            </div>
          </div>

          <p>
            Welcome to the official website of Hon. Jibril Abu II (Wisdombank), Member Representing Ajaokuta Constituency in the Kogi State House of Assembly and Chairman of the House Committee on Lands.
          </p>

          <h2 className="text-lg font-bold text-[#0B1739] pt-2">
            1. Institutional Status Disclaimer
          </h2>
          <p>
            This website provides public information regarding the legislative activities, community programs, and constituency engagement of Hon. Jibril Abu II. This platform does not substitute for statutory gazettes, official votes and proceedings, or judicial notices issued by the Kogi State House of Assembly or the Kogi State Government.
          </p>

          <h2 className="text-lg font-bold text-[#0B1739] pt-2">
            2. Project Status & Factual Accuracy
          </h2>
          <p>
            Project descriptions and status indicators ("Proposed", "Announced", "Approved", "Ongoing", "Completed", "Awaiting Verification") reflect documented records and progress reports at their respective publication dates.
          </p>

          <h2 className="text-lg font-bold text-[#0B1739] pt-2">
            3. Appropriate Use of Citizen Portal
          </h2>
          <p>
            Users agree not to submit fraudulent petitions, spam, abusive materials, or false claims through the civic portal. Submissions found to contain deliberate falsehoods may be archived or disregarded.
          </p>

          <h2 className="text-lg font-bold text-[#0B1739] pt-2">
            4. Content Corrections
          </h2>
          <p>
            The media office welcomes verifiable corrections to public dates, publications, or names. Inquiries may be addressed to{' '}
            <span className="font-semibold text-[#1746A2]">media@honjibrilabu.ng</span>.
          </p>
        </div>
      </div>
    </main>
  );
};
