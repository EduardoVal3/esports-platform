'use client';

import { SearchBar } from '@/components/search-bar';
import { TournamentCard } from '@/components/tournament-card';
import { StatsCard } from '@/components/stats-card';
import { UserBadge } from '@/components/ui/user-badge';
import { MOCK_TOURNAMENTS, MOCK_GAMES } from '@/config/constants';
import { Trophy, Users, GamepadIcon, TrendingUp } from 'lucide-react';

export default function Home() {
  const mockUser = {
    id: '1',
    username: 'ProGamer',
    email: 'pro@esports.com',
    role: 'user' as const,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-slate-400 mt-2">Bienvenido a eSports Hub</p>
        </div>
        <UserBadge user={mockUser} />
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Torneos Activos"
          value="8"
          icon={<Trophy size={32} />}
        />
        <StatsCard
          title="Equipos Registrados"
          value="1,234"
          icon={<Users size={32} />}
        />
        <StatsCard
          title="Juegos"
          value={MOCK_GAMES.length}
          icon={<GamepadIcon size={32} />}
        />
        <StatsCard
          title="Premios Total"
          value="$2.5M"
          icon={<TrendingUp size={32} />}
        />
      </div>

      {/* Featured Tournament */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 border border-purple-500/50">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-2">Torneo Destacado</h2>
          <p className="text-white/90 mb-6">
            Participa en nuestro mayor torneo del año con un premio total de $1M
          </p>
          <button className="bg-white text-purple-600 font-semibold px-6 py-2 rounded-lg hover:bg-slate-100 transition">
            Unirse ahora
          </button>
        </div>
      </div>

      {/* Tournaments Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Próximos Torneos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TOURNAMENTS.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>

      {/* Games */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Juegos Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {MOCK_GAMES.map((game) => (
            <div
              key={game.id}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition cursor-pointer text-center"
            >
              <div className="text-4xl mb-3">{game.icon}</div>
              <h3 className="text-white font-semibold mb-1">{game.name}</h3>
              <p className="text-slate-400 text-sm">{game.tournaments} torneos</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
