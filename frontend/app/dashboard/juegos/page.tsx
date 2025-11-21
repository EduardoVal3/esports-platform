'use client';

import { GamesModule } from '@/components/dashboard/games-module';

export default function JuegosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-balance">Gestión de Juegos</h1>
        <p className="text-slate-400 mt-2">Administra catálogo, plataformas y modos de juego</p>
      </div>
      
      <GamesModule />
    </div>
  );
}
