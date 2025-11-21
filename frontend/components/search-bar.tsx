'use client';

import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-3 text-slate-400" size={20} />
      <input
        type="text"
        placeholder="Buscar torneos, equipos..."
        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
}
