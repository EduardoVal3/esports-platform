'use client';

import { Card } from '@/components/ui/card';
import { TournamentFormData } from '@/types';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { MOCK_GAMES_WITH_DETAILS } from '@/config/constants';

interface Stage6Props {
  data: TournamentFormData;
  onUpdate: (field: keyof TournamentFormData, value: any) => void;
}

export function Stage6Finalize({ data, onUpdate }: Stage6Props) {
  const selectedGame = MOCK_GAMES_WITH_DETAILS.find((g) => g.id === data.gameId);

  const isComplete =
    data.title &&
    data.description &&
    data.registrationStart &&
    data.registrationEnd &&
    data.tournamentStart &&
    data.gameId &&
    data.platform &&
    data.gameMode &&
    data.region &&
    data.format &&
    data.hostContact &&
    data.totalPrizePool > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Finalizar Torneo</h2>
        <p className="text-slate-400">Revisa tu información antes de publicar</p>
      </div>

      {!isComplete && (
        <Card className="bg-orange-900/30 border-orange-700/50 p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-orange-300 font-medium">Información Incompleta</p>
            <p className="text-orange-200 text-sm">Completa todos los campos requeridos antes de publicar</p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen Básico */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Información Básica</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Título:</span>
              <span className="text-white font-medium">{data.title || 'No especificado'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Juego:</span>
              <span className="text-white font-medium">{selectedGame?.name || 'No seleccionado'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Región:</span>
              <span className="text-white font-medium">{data.region || 'No especificada'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Formato:</span>
              <span className="text-white font-medium">{data.format || 'No especificado'}</span>
            </div>
          </div>
        </Card>

        {/* Resumen Premios */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Premios</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Cuota de Inscripción:</span>
              <span className="text-white font-medium">${data.entryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fondo Total:</span>
              <span className="text-purple-400 font-bold">${data.totalPrizePool.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Comisión Anfitrión:</span>
              <span className="text-orange-400 font-medium">{data.hostCommissionPercentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Máx. Participantes:</span>
              <span className="text-white font-medium">{data.maxParticipants}</span>
            </div>
          </div>
        </Card>

        {/* Resumen Configuración */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Configuración</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              {data.isClosed ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <div className="w-4 h-4 border border-slate-600 rounded-full" />
              )}
              <span className="text-slate-300">Torneo {data.isClosed ? 'Cerrado' : 'Abierto'}</span>
            </div>
            <div className="flex items-center gap-2">
              {data.requireStream ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <div className="w-4 h-4 border border-slate-600 rounded-full" />
              )}
              <span className="text-slate-300">Transmisión {data.requireStream ? 'Requerida' : 'Opcional'}</span>
            </div>
            <div className="flex items-center gap-2">
              {data.requireWebcam ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <div className="w-4 h-4 border border-slate-600 rounded-full" />
              )}
              <span className="text-slate-300">Cámara {data.requireWebcam ? 'Requerida' : 'Opcional'}</span>
            </div>
          </div>
        </Card>

        {/* Resumen Contacto */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Contacto</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-slate-400 block mb-1">Cómo Contactarte:</span>
              <span className="text-white">{data.hostContact || 'No especificado'}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Estados */}
      <Card className="bg-slate-800/50 border-slate-700 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-purple-700/50">
        <h3 className="text-lg font-bold text-white mb-2">Información Importante</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex gap-2">
            <span className="text-purple-400 font-bold">•</span>
            El estado del torneo será "Próximamente" al publicar
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400 font-bold">•</span>
            Los cambios se guardarán en el sistema
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400 font-bold">•</span>
            Los participantes podrán registrarse dentro del período establecido
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400 font-bold">•</span>
            Recibirás ganancias del fondo de premios después de comisiones
          </li>
        </ul>
      </Card>
    </div>
  );
}
