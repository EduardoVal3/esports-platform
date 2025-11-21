'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TournamentFormData } from '@/types';
import { useMemo } from 'react';

interface Stage3Props {
  data: TournamentFormData;
  onUpdate: (field: keyof TournamentFormData, value: any) => void;
}

export function Stage3Prizes({ data, onUpdate }: Stage3Props) {
  const calculations = useMemo(() => {
    const totalAfterFee = data.totalPrizePool * (1 - data.hostCommissionPercentage / 100);
    const hostCommissionTotal = data.totalPrizePool - totalAfterFee;
    const firstPlacePrize = totalAfterFee * (data.firstPlacePercentage / 100);
    const secondPlacePrize = totalAfterFee * (data.secondPlacePercentage / 100);

    return {
      totalAfterFee,
      hostCommissionTotal,
      firstPlacePrize,
      secondPlacePrize,
    };
  }, [data.totalPrizePool, data.hostCommissionPercentage, data.firstPlacePercentage, data.secondPlacePercentage]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Premios</h2>
        <p className="text-slate-400">Configura los premios y la distribución</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cuota de Inscripción */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Cuota de Inscripción (Créditos)</Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={data.entryFee}
            onChange={(e) => onUpdate('entryFee', parseFloat(e.target.value))}
            placeholder="0.00"
            className="bg-slate-900/50 border-slate-600 text-white"
          />
          <p className="text-slate-400 text-sm mt-2">Déjalo en 0 para acceso gratuito</p>
        </Card>

        {/* Fondo de Premios Total */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Total del Fondo de Premios *</Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={data.totalPrizePool}
            onChange={(e) => onUpdate('totalPrizePool', parseFloat(e.target.value))}
            placeholder="0.00"
            className="bg-slate-900/50 border-slate-600 text-white"
          />
        </Card>

        {/* Comisión del Anfitrión */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Comisión del Anfitrión (%)</Label>
          <Input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={data.hostCommissionPercentage}
            onChange={(e) => onUpdate('hostCommissionPercentage', parseFloat(e.target.value))}
            className="bg-slate-900/50 border-slate-600 text-white"
          />
        </Card>

        {/* Fondo Después de Comisión */}
        <Card className="bg-slate-800/50 border-slate-700 p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-700/50">
          <Label className="text-white mb-3 block">Fondo después de Comisión</Label>
          <div className="text-3xl font-bold text-purple-400">${calculations.totalAfterFee.toFixed(2)}</div>
        </Card>

        {/* Comisión Total */}
        <Card className="bg-slate-800/50 border-slate-700 p-6 bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700/50">
          <Label className="text-white mb-3 block">Comisión Total del Anfitrión</Label>
          <div className="text-3xl font-bold text-orange-400">${calculations.hostCommissionTotal.toFixed(2)}</div>
        </Card>
      </div>

      {/* Distribución de Premios */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <Label className="text-white mb-4 block font-semibold">Distribución de Premios</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-slate-300 mb-2 block">1.er Lugar (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={data.firstPlacePercentage}
              onChange={(e) => onUpdate('firstPlacePercentage', parseFloat(e.target.value))}
              className="bg-slate-900/50 border-slate-600 text-white"
            />
            <div className="mt-2 p-2 bg-slate-900/50 rounded text-purple-400 font-semibold">
              ${calculations.firstPlacePrize.toFixed(2)}
            </div>
          </div>
          <div>
            <Label className="text-slate-300 mb-2 block">2.do Lugar (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={data.secondPlacePercentage}
              onChange={(e) => onUpdate('secondPlacePercentage', parseFloat(e.target.value))}
              className="bg-slate-900/50 border-slate-600 text-white"
            />
            <div className="mt-2 p-2 bg-slate-900/50 rounded text-blue-400 font-semibold">
              ${calculations.secondPlacePrize.toFixed(2)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
