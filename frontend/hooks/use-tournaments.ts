'use client';

import { useMemo } from 'react';
import { Tournament } from '@/types';

interface UseTournamentsOptions {
  tournaments: Tournament[];
  searchTerm?: string;
  game?: string;
  status?: 'upcoming' | 'live' | 'finished' | 'all';
  sortBy?: 'prize' | 'date' | 'participants';
}

export function useTournaments({
  tournaments,
  searchTerm = '',
  game = 'all',
  status = 'all',
  sortBy = 'date',
}: UseTournamentsOptions) {
  return useMemo(() => {
    let filtered = tournaments.filter((tournament) => {
      const matchesSearch =
        tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.game.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGame = game === 'all' || tournament.game === game;
      const matchesStatus = status === 'all' || tournament.status === status;

      return matchesSearch && matchesGame && matchesStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'prize') {
        return b.prizePool - a.prizePool;
      } else if (sortBy === 'date') {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      } else {
        return b.participants - a.participants;
      }
    });

    return sorted;
  }, [tournaments, searchTerm, game, status, sortBy]);
}
