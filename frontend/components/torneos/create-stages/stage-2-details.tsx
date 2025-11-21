'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TournamentFormData } from '@/types';
import {
  MOCK_GAMES_WITH_DETAILS,
  REGIONS,
  INPUT_TYPES,
  TOURNAMENT_TYPES,
  BEST_OF_OPTIONS,
  FORMATS,
} from '@/config/constants';

interface Stage2Props {
  data: TournamentFormData;
  onUpdate: (field: keyof TournamentFormData, value: any) => void;
}

export function Stage2Details({ data, onUpdate }: Stage2Props) {
  const selectedGame = MOCK_GAMES_WITH_DETAILS.find((g) => g.id === data.gameId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Detalles del Torneo</h2>
        <p className="text-slate-400">Configura los parámetros específicos de tu torneo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Juego */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Juego *</Label>
          <Select value={data.gameId} onValueChange={(v) => {
            const game = MOCK_GAMES_WITH_DETAILS.find((g) => g.id === v);
            onUpdate('gameId', v);
            if (game?.platforms) {
              onUpdate('platform', game.platforms[0]);
            }
          }}>
            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
              <SelectValue placeholder="Selecciona un juego" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {MOCK_GAMES_WITH_DETAILS.map((game) => (
                <SelectItem key={game.id} value={game.id}>
                  {game.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Plataforma */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Plataforma *</Label>
          <Select value={data.platform} onValueChange={(v) => onUpdate('platform', v)} disabled={!selectedGame}>
            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
              <SelectValue placeholder="Selecciona plataforma" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {selectedGame?.platforms?.map((platform) => (
                <SelectItem key={platform} value={platform}>
                  {platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Modo de Juego */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Modo de Juego *</Label>
          <Select value={data.gameMode} onValueChange={(v) => onUpdate('gameMode', v)} disabled={!selectedGame}>
            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
              <SelectValue placeholder="Selecciona modo" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {selectedGame?.gameModes?.map((mode) => (
                <SelectItem key={mode} value={mode}>
                  {mode}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Región */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Región *</Label>
          <Select value={data.region} onValueChange={(v) => onUpdate('region', v)}>
            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
              <SelectValue placeholder="Selecciona región" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {REGIONS.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Tipo de Torneo */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Tipo de Torneo *</Label>
          <Select value={data.tournamentType} onValueChange={(v) => onUpdate('tournamentType', v)}>
            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
              <SelectValue placeholder="Selecciona tipo" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {TOURNAMENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Al Mejor de */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Al Mejor de *</Label>
          <Select value={data.bestOf.toString()} onValueChange={(v) => onUpdate('bestOf', parseInt(v))}>
            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {BEST_OF_OPTIONS.map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Formato */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Formato *</Label>
          <Select value={data.format} onValueChange={(v) => onUpdate('format', v)}>
            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
              <SelectValue placeholder="Selecciona formato" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {FORMATS.map((format) => (
                <SelectItem key={format} value={format}>
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Capacidad */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Máximo de Participantes *</Label>
          <Input
            type="number"
            min="2"
            max="256"
            value={data.maxParticipants}
            onChange={(e) => onUpdate('maxParticipants', parseInt(e.target.value))}
            className="bg-slate-900/50 border-slate-600 text-white"
          />
        </Card>

        {/* Tipo de Entrada */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-3 block">Tipo de Entrada *</Label>
          <Select value={data.inputType} onValueChange={(v) => onUpdate('inputType', v)}>
            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
              <SelectValue placeholder="Selecciona tipo" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {INPUT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>
      </div>

      {/* Opciones Adicionales */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <Label className="text-white mb-4 block font-semibold">Opciones Adicionales</Label>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.isClosed}
              onChange={(e) => onUpdate('isClosed', e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900/50 border-slate-600"
            />
            <span className="text-white">Torneo Cerrado (solo por invitación)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.allowPC}
              onChange={(e) => onUpdate('allowPC', e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900/50 border-slate-600"
            />
            <span className="text-white">Jugadores de PC permitidos</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.requireStream}
              onChange={(e) => onUpdate('requireStream', e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900/50 border-slate-600"
            />
            <span className="text-white">Se requiere transmisión</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.requireWebcam}
              onChange={(e) => onUpdate('requireWebcam', e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900/50 border-slate-600"
            />
            <span className="text-white">Se requiere cámara web</span>
          </label>
        </div>
      </Card>

      {/* Reglas */}
      <Card className="bg-slate-800/50 border-slate-700 p-6 space-y-4">
        <div>
          <Label className="text-white mb-3 block font-semibold">Conjunto de Reglas</Label>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={data.rulesType === 'basic'}
                onChange={() => onUpdate('rulesType', 'basic')}
                className="w-4 h-4"
              />
              <span className="text-white">Básicas del juego</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={data.rulesType === 'custom'}
                onChange={() => onUpdate('rulesType', 'custom')}
                className="w-4 h-4"
              />
              <span className="text-white">Personalizadas</span>
            </label>
          </div>
        </div>
        {data.rulesType === 'custom' && (
          <textarea
            placeholder="Escribe tus reglas personalizadas..."
            value={data.customRules}
            onChange={(e) => onUpdate('customRules', e.target.value)}
            rows={4}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        )}
      </Card>
    </div>
  );
}
