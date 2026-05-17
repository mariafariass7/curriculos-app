'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiFileText, FiPlusCircle } from 'react-icons/fi';

const menuItems = [
  { label: 'Home', href: '/', icon: FiHome },
  { label: 'Currículos', href: '/sistema/paginas/curriculos', icon: FiFileText },
  { label: 'Novo currículo', href: '/sistema/paginas/curriculos/novo', icon: FiPlusCircle },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-100">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              isActive
                ? 'flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-slate-950 shadow-sm'
                : 'flex items-center gap-2 rounded-full px-4 py-2 text-slate-200 transition hover:bg-slate-800 hover:text-white'
            }
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
