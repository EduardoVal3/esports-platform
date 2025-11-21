'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Trophy, Users, ShoppingCart, User, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

const mainNavigation = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/torneos', label: 'Torneos', icon: Trophy },
  { href: '/equipos', label: 'Equipos', icon: Users },
  { href: '/tienda', label: 'Tienda', icon: ShoppingCart },
  { href: '/usuario', label: 'Perfil', icon: User },
];

export function MainSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 transform transition-all duration-300 z-40',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center justify-between gap-3">
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-white">eSports Hub</h1>
                  <p className="text-xs text-slate-400">Plataforma de Competición</p>
                </div>
              )}
              {isCollapsed && (
                <div className="mx-auto">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">
                    E
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {mainNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                    isCollapsed && 'justify-center'
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Footer with Collapse Button */}
          <div className="p-4 border-t border-slate-800">
            {!isCollapsed && (
              <div className="mb-3 flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Usuario</p>
                  <p className="text-xs text-slate-400 truncate">user@example.com</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                'w-full flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors',
                isCollapsed && 'justify-center'
              )}
              title={isCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              {!isCollapsed && <span className="text-sm">Contraer</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
