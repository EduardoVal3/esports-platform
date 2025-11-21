'use client';

import { GameStats } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2 } from 'lucide-react';

interface GameStatsSectionProps {
  gameStats: GameStats[];
}

export function GameStatsSection({ gameStats }: GameStatsSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Gamepad2 className="w-6 h-6" />
        Estadísticas por Juego
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gameStats.map((stat) => (
          <Card key={stat.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg">{stat.game}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-slate-400 text-sm">Victorias</p>
                  <p className="text-white font-bold">{stat.wins}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Derrotas</p>
                  <p className="text-white font-bold">{stat.losses}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Tasa Ganancia</p>
                  <p className="text-green-400 font-bold">{stat.winRate.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Total Partidas</p>
                  <p className="text-white font-bold">{stat.totalMatches}</p>
                </div>
              </div>
              <div className="border-t border-slate-700 pt-3 space-y-1 text-sm">
                {stat.currentRank && (
                  <p className="text-slate-300">
                    Rango Actual: <span className="text-purple-400 font-semibold">{stat.currentRank}</span>
                  </p>
                )}
                {stat.bestRank && (
                  <p className="text-slate-300">
                    Mejor Rango: <span className="text-yellow-400 font-semibold">{stat.bestRank}</span>
                  </p>
                )}
                <p className="text-slate-300">
                  Horas Jugadas: <span className="font-semibold">{stat.totalHours.toLocaleString()}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
