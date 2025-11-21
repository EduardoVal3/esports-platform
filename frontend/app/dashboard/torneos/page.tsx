'use client';

import { TournamentsModule } from '@/components/dashboard/tournaments-module';

export default function TorneosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-balance">Gestión de Torneos</h1>
        <p className="text-slate-400 mt-2">Supervisa torneos, comisiones y moderación</p>
      </div>
      
      <TournamentsModule />
    </div>
  );
}
