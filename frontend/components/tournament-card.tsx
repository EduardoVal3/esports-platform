import { Tournament } from '@/types';
import { Badge } from '@/components/ui/badge';

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const statusColors = {
    upcoming: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    live: 'bg-red-500/20 text-red-300 border-red-500/50',
    finished: 'bg-slate-500/20 text-slate-300 border-slate-500/50',
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-white font-semibold text-lg">{tournament.name}</h3>
        <Badge className={`${statusColors[tournament.status]} border`}>
          {tournament.status === 'upcoming' ? 'Próximo' : tournament.status === 'live' ? 'En vivo' : 'Finalizado'}
        </Badge>
      </div>
      
      <p className="text-slate-400 text-sm mb-4">{tournament.game}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-slate-500 text-xs font-medium">PREMIO</p>
          <p className="text-white font-bold">${tournament.prizePool.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs font-medium">PARTICIPANTES</p>
          <p className="text-white font-bold">{tournament.participants}/{tournament.maxParticipants}</p>
        </div>
      </div>

      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition">
        Ver detalles
      </button>
    </div>
  );
}
