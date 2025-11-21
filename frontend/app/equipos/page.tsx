'use client';

import { useState, useMemo } from 'react';
import { TeamCard } from '@/components/team-card';
import { SearchBar } from '@/components/search-bar';
import { MOCK_TEAMS, MOCK_GAMES } from '@/config/constants';
import { Users, Filter } from 'lucide-react';

export default function EquiposPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'wins' | 'name' | 'winRate'>('wins');

  const uniqueRegions = Array.from(new Set(MOCK_TEAMS.map(team => team.region))).sort();

  const filteredTeams = useMemo(() => {
    let filtered = MOCK_TEAMS.filter((team) => {
      const matchesSearch = 
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.game.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGame = selectedGame === 'all' || team.game === selectedGame;
      const matchesRegion = selectedRegion === 'all' || team.region === selectedRegion;
      
      return matchesSearch && matchesGame && matchesRegion;
    });

    // Sort teams
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'wins') {
        return b.wins - a.wins;
      } else if (sortBy === 'winRate') {
        const aRate = a.wins / (a.wins + a.losses);
        const bRate = b.wins / (b.wins + b.losses);
        return bRate - aRate;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [searchTerm, selectedGame, selectedRegion, sortBy]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users className="text-purple-500" size={32} />
          <div>
            <h1 className="text-4xl font-bold">Equipos</h1>
            <p className="text-slate-400 mt-2">Descubre los mejores equipos eSports</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-purple-500">{filteredTeams.length}</p>
          <p className="text-slate-400 text-sm">Equipos encontrados</p>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-purple-500" />
          <h3 className="font-semibold text-white">Filtros</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Game Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Juego
            </label>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todos los juegos</option>
              {MOCK_GAMES.map((game) => (
                <option key={game.id} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Región
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todas las regiones</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'wins' | 'name' | 'winRate')}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="wins">Más victorias</option>
              <option value="winRate">Mayor tasa de victoria</option>
              <option value="name">Nombre (A-Z)</option>
            </select>
          </div>

          {/* Active Filters Display */}
          <div className="flex items-end gap-2">
            <div className="flex-1 flex flex-wrap gap-2">
              {selectedGame !== 'all' && (
                <button
                  onClick={() => setSelectedGame('all')}
                  className="bg-purple-600/30 text-purple-300 border border-purple-500/50 rounded-full px-3 py-1 text-sm font-medium hover:bg-purple-600/50 transition"
                >
                  {selectedGame} ✕
                </button>
              )}
              {selectedRegion !== 'all' && (
                <button
                  onClick={() => setSelectedRegion('all')}
                  className="bg-purple-600/30 text-purple-300 border border-purple-500/50 rounded-full px-3 py-1 text-sm font-medium hover:bg-purple-600/50 transition"
                >
                  {selectedRegion} ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredTeams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} {...team} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
          <Users className="text-slate-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            No se encontraron equipos
          </h3>
          <p className="text-slate-400">
            Intenta ajustar tus criterios de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
