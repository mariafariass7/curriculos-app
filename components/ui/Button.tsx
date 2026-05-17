import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost';
  children: ReactNode;
}

const variants: Record<string, string> = {
  default: 'bg-slate-950 text-white hover:bg-slate-800 focus-visible:ring-slate-300',
  secondary: 'bg-white text-slate-950 border border-slate-200 hover:bg-slate-slate-100 focus-visible:ring-slate-300',
  ghost: 'bg-transparent text-slate-950 hover:bg-slate-100 focus-visible:ring-slate-300',
};

export default function Button({ variant = 'default', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
