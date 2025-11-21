'use client';

import { Trophy } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrophyIcon } from 'lucide-react';

interface TrophiesSectionProps {
  trophies: Trophy[];
}

export function TrophiesSection({ trophies }: TrophiesSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <TrophyIcon className="w-6 h-6" />
        Vitrina de Trofeos ({trophies.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trophies.map((trophy) => (
          <Card key={trophy.id} className="bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border-yellow-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-400">{trophy.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-300">
                <span className="text-slate-400">Torneo:</span> {trophy.tournament}
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Posición:</span>{' '}
                <span className={trophy.placement === 1 ? 'text-yellow-400 font-bold' : trophy.placement === 2 ? 'text-slate-300' : 'text-orange-400'}>
                  #{trophy.placement}
                </span>
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Fecha:</span> {new Date(trophy.date).toLocaleDateString()}
              </p>
              <p className="text-green-400 font-semibold">
                Premios: ${trophy.prizeAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
