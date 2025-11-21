'use client';

import { Badge } from '@/components/ui/badge';

interface TeamCardProps {
  id: string;
  name: string;
  logo: string;
  game: string;
  members: number;
  wins: number;
  losses: number;
  region: string;
}

export function TeamCard({ id, name, logo, game, members, wins, losses, region }: TeamCardProps) {
  const winRate = ((wins / (wins + losses)) * 100).toFixed(1);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{logo}</div>
          <div>
            <h3 className="text-white font-semibold text-lg">{name}</h3>
            <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs mt-1">
              {region}
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-4">{game}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <p className="text-slate-500 text-xs font-medium">JUGADORES</p>
          <p className="text-white font-bold text-lg">{members}</p>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <p className="text-slate-500 text-xs font-medium">VICTORIAS</p>
          <p className="text-white font-bold text-lg">{wins}</p>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <p className="text-slate-500 text-xs font-medium">TASA WIN</p>
          <p className="text-green-400 font-bold text-lg">{winRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm">
          Ver detalles
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition text-sm">
          Contactar
        </button>
      </div>
    </div>
  );
}
