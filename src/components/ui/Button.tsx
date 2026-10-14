import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  external?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  external,
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'text-xs md:text-sm px-3.5 py-1.5 gap-1.5 shadow-xs',
    md: 'text-sm md:text-base px-5 py-2.5 gap-2 shadow-sm',
    lg: 'text-base md:text-lg px-6 py-3.5 gap-2.5 shadow-md',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#1746A2] hover:bg-[#123884] text-white focus:ring-[#1746A2] border border-transparent',
    secondary:
      'bg-[#0B1739] hover:bg-[#16244f] text-white focus:ring-[#0B1739] border border-transparent',
    outline:
      'border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-[#172033] focus:ring-[#1746A2]',
    gold:
      'bg-[#D6A84F] hover:bg-[#c2953e] text-[#0B1739] font-semibold focus:ring-[#D6A84F] border border-transparent',
    danger:
      'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border border-transparent',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-transparent',
  }[variant];

  const fullClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (to) {
    if (external) {
      return (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className={fullClasses}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </a>
      );
    }
    return (
      <Link to={to} className={fullClasses}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={fullClasses} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
