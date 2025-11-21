'use client';

import Link from 'next/link';
import { NAVIGATION_ITEMS, SITE_NAME } from '@/config/constants';
import { Menu, X } from 'lucide-react';
import { useSidebar } from '@/hooks/use-sidebar';

export function Sidebar() {
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-40 md:hidden p-2 hover:bg-slate-800 rounded-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 transform transition-transform duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold text-white">{SITE_NAME}</h1>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <p className="text-xs text-slate-500">v1.0.0</p>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggle}
        />
      )}
    </>
  );
}
