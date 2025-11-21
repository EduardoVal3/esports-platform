'use client';

import { useState, useMemo } from 'react';
import { TournamentList } from '@/components/torneos/tournament-list';
import { TournamentFilters } from '@/components/torneos/tournament-filters';
import { SearchBar } from '@/components/search-bar';
import { MOCK_TOURNAMENTS } from '@/config/constants';
import { Trophy, Plus } from 'lucide-react';
import Link from 'next/link';

export default function TorneosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'prize' | 'date' | 'participants'>('date');

  const filteredTournaments = useMemo(() => {
    let filtered = MOCK_TOURNAMENTS.filter((tournament) => {
      const matchesSearch = 
        tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.game.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGame = selectedGame === 'all' || tournament.game === selectedGame;
      const matchesStatus = selectedStatus === 'all' || tournament.status === selectedStatus;
      
      return matchesSearch && matchesGame && matchesStatus;
    });

    // Sort tournaments
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'prize') {
        return b.prizePool - a.prizePool;
      } else if (sortBy === 'date') {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      } else {
        return b.participants - a.participants;
      }
    });

    return sorted;
  }, [searchTerm, selectedGame, selectedStatus, sortBy]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Trophy className="text-purple-500" size={32} />
          <div>
            <h1 className="text-4xl font-bold">Torneos</h1>
            <p className="text-slate-400 mt-2">Explora todos los torneos disponibles</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-500">{filteredTournaments.length}</p>
            <p className="text-slate-400 text-sm">Torneos encontrados</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <SearchBar />
        <TournamentFilters
          selectedGame={selectedGame}
          onGameChange={setSelectedGame}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {/* Results */}
      {filteredTournaments.length > 0 ? (
        <TournamentList tournaments={filteredTournaments} />
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
          <Trophy className="text-slate-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No se encontraron torneos</h3>
          <p className="text-slate-400">Intenta ajustar tus criterios de búsqueda</p>
        </div>
      )}
    </div>
  );
}
