import React from 'react';
import { Button } from '../components/ui/Button';
import { Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <main id="main-content" className="py-28 px-4 text-center bg-[#F7F8FC]">
      <div className="max-w-md mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="text-6xl font-black text-[#1746A2]">404</div>
        <h1 className="text-2xl font-bold text-[#0B1739]">Page Not Found</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The requested page could not be located on this official portal. It may have been updated, renamed, or moved.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button to="/" variant="primary" icon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
          <Button to="/projects" variant="outline" icon={<Search className="w-4 h-4" />}>
            View Projects
          </Button>
        </div>
      </div>
    </main>
  );
};
