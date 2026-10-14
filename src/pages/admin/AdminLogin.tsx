import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdminUser, getCurrentAdminUser } from '../../lib/storage';
import { Button } from '../../components/ui/Button';
import { UserRole } from '../../types';
import {
  Shield,
  Lock,
  UserCheck,
  AlertCircle,
  ArrowLeft,
  Building,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@honjibrilabu.ng');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = getCurrentAdminUser();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      loginAdminUser(selectedRole);
      setIsLoading(false);
      navigate('/admin/dashboard');
    }, 400);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') setEmail('admin@honjibrilabu.ng');
    if (role === 'editor') setEmail('media@honjibrilabu.ng');
    if (role === 'case_officer') setEmail('liaison@honjibrilabu.ng');
  };

  return (
    <main id="main-content" className="py-16 md:py-24 bg-[#0B1739] min-h-screen text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </Link>
        </div>

        <div className="bg-[#070e24] border-2 border-[#D6A84F]/40 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#D6A84F] mx-auto shadow-md bg-[#0B1739]">
              <img
                src="/images/hon-jibril-abu.jpg"
                alt="Hon. Jibril Abu II"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/fVC3sZmc/Abu-Jib.jpg';
                }}
              />
            </div>

            <h1 className="text-2xl font-black tracking-tight text-white">
              Authorized Staff Portal
            </h1>
            <p className="text-xs text-slate-400">
              Office of Hon. Jibril Abu II • Ajaokuta Constituency
            </p>
          </div>

          {currentUser && (
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800 text-xs text-blue-200 flex items-center justify-between">
              <span>Logged in as: <strong>{currentUser.name}</strong></span>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-xs text-[#D6A84F] font-bold underline"
              >
                Go to Dashboard
              </button>
            </div>
          )}

          {/* Role Selection for testing & preview authorization */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#D6A84F]">
              Select Staff Role:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`py-2 px-1 text-xs rounded-xl font-bold border transition cursor-pointer text-center ${
                  selectedRole === 'admin'
                    ? 'bg-[#1746A2] text-white border-[#D6A84F]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                Admin
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('editor')}
                className={`py-2 px-1 text-xs rounded-xl font-bold border transition cursor-pointer text-center ${
                  selectedRole === 'editor'
                    ? 'bg-[#1746A2] text-white border-[#D6A84F]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                Editor
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('case_officer')}
                className={`py-2 px-1 text-xs rounded-xl font-bold border transition cursor-pointer text-center ${
                  selectedRole === 'case_officer'
                    ? 'bg-[#1746A2] text-white border-[#D6A84F]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                Case Officer
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              {selectedRole === 'admin' && '• Administrator: Full access to news, projects, media, settings, and submissions.'}
              {selectedRole === 'editor' && '• Editor: Manage and publish news, projects, media, and legislative activities.'}
              {selectedRole === 'case_officer' && '• Case Officer: Review citizen petitions, update progress, add audit notes.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Official Staff Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Security Password / Token
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              disabled={isLoading}
              icon={<KeyRound className="w-4 h-4" />}
            >
              {isLoading ? 'Authenticating...' : `Sign In as ${selectedRole.toUpperCase()}`}
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400 border-t border-white/10">
            <p className="flex items-center justify-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#008751]" />
              Secure Institutional Access
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
