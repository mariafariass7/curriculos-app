'use client';

import Link from 'next/link';
import { FiBriefcase, FiHome, FiFileText, FiPlusCircle } from 'react-icons/fi';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-950">
            <FiBriefcase className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-semibold">Currículos App</p>
            <p className="text-xs text-slate-300">Sistema de gestão de currículos</p>
          </div>
        </Link>

        <Nav />
      </div>
    </header>
  );
}
