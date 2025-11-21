'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MOCK_GAMES } from '@/config/constants';
import { ChevronDown, X } from 'lucide-react';

interface TournamentFiltersProps {
  selectedGame: string;
  onGameChange: (game: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  sortBy: 'prize' | 'date' | 'participants';
  onSortChange: (sort: 'prize' | 'date' | 'participants') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function TournamentFilters({
  selectedGame,
  onGameChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange,
}: TournamentFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = selectedGame !== 'all' || selectedStatus !== 'all' || searchTerm !== '';

  return (
    <div className="space-y-4">
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <div className="bg-purple-600/20 border border-purple-500/50 rounded-full px-3 py-1 flex items-center gap-2">
              <span className="text-sm text-purple-300">{searchTerm}</span>
              <button
                onClick={() => onSearchChange('')}
                className="hover:text-purple-200 transition"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {selectedGame !== 'all' && (
            <div className="bg-blue-600/20 border border-blue-500/50 rounded-full px-3 py-1 flex items-center gap-2">
              <span className="text-sm text-blue-300">{selectedGame}</span>
              <button
                onClick={() => onGameChange('all')}
                className="hover:text-blue-200 transition"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {selectedStatus !== 'all' && (
            <div className="bg-green-600/20 border border-green-500/50 rounded-full px-3 py-1 flex items-center gap-2">
              <span className="text-sm text-green-300">
                {selectedStatus === 'upcoming' ? 'Próximos' : selectedStatus === 'live' ? 'En vivo' : 'Finalizados'}
              </span>
              <button
                onClick={() => onStatusChange('all')}
                className="hover:text-green-200 transition"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full md:hidden"
        >
          <span className="font-semibold">Filtros</span>
          <ChevronDown
            size={20}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${!isOpen && 'hidden md:grid'}`}>
          {/* Game Filter */}
          <Select value={selectedGame} onValueChange={onGameChange}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Juego" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">Todos los juegos</SelectItem>
              {MOCK_GAMES.map((game) => (
                <SelectItem key={game.id} value={game.name}>
                  {game.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="upcoming">Próximos</SelectItem>
              <SelectItem value="live">En vivo</SelectItem>
              <SelectItem value="finished">Finalizados</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as 'prize' | 'date' | 'participants')}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="date">Por fecha</SelectItem>
              <SelectItem value="prize">Por premio</SelectItem>
              <SelectItem value="participants">Por participantes</SelectItem>
            </SelectContent>
          </Select>

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button
              onClick={() => {
                onGameChange('all');
                onStatusChange('all');
                onSearchChange('');
              }}
              variant="outline"
              className="border-slate-600 hover:bg-slate-700"
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
