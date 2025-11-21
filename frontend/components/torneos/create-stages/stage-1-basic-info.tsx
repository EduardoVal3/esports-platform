'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TournamentFormData } from '@/types';

interface Stage1Props {
  data: TournamentFormData;
  onUpdate: (field: keyof TournamentFormData, value: any) => void;
}

export function Stage1BasicInfo({ data, onUpdate }: Stage1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Información Básica</h2>
        <p className="text-slate-400">Completa los detalles generales de tu torneo</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 p-6 space-y-6">
        {/* Título */}
        <div>
          <Label htmlFor="title" className="text-white mb-2 block">
            Título del Torneo *
          </Label>
          <Input
            id="title"
            placeholder="Ej: Campeonato Global de LoL 2024"
            value={data.title}
            onChange={(e) => onUpdate('title', e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>

        {/* Descripción */}
        <div>
          <Label htmlFor="description" className="text-white mb-2 block">
            Descripción *
          </Label>
          <textarea
            id="description"
            placeholder="Describe tu torneo, incluye detalles importantes..."
            value={data.description}
            onChange={(e) => onUpdate('description', e.target.value)}
            rows={4}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="registrationStart" className="text-white mb-2 block">
              Inicio de Registro *
            </Label>
            <Input
              id="registrationStart"
              type="datetime-local"
              value={data.registrationStart}
              onChange={(e) => onUpdate('registrationStart', e.target.value)}
              className="bg-slate-900/50 border-slate-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="registrationEnd" className="text-white mb-2 block">
              Fin de Registro *
            </Label>
            <Input
              id="registrationEnd"
              type="datetime-local"
              value={data.registrationEnd}
              onChange={(e) => onUpdate('registrationEnd', e.target.value)}
              className="bg-slate-900/50 border-slate-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="tournamentStart" className="text-white mb-2 block">
              Inicio del Torneo *
            </Label>
            <Input
              id="tournamentStart"
              type="datetime-local"
              value={data.tournamentStart}
              onChange={(e) => onUpdate('tournamentStart', e.target.value)}
              className="bg-slate-900/50 border-slate-600 text-white"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
