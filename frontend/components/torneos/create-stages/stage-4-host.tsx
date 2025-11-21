'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TournamentFormData } from '@/types';

interface Stage4Props {
  data: TournamentFormData;
  onUpdate: (field: keyof TournamentFormData, value: any) => void;
}

export function Stage4Host({ data, onUpdate }: Stage4Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Detalles del Anfitrión</h2>
        <p className="text-slate-400">Información de contacto y redes sociales</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 p-6 space-y-4">
        <div>
          <Label htmlFor="hostContact" className="text-white mb-2 block">
            Contacto del Anfitrión *
          </Label>
          <Input
            id="hostContact"
            placeholder="Ej: email@example.com, Discord: Usuario#1234"
            value={data.hostContact}
            onChange={(e) => onUpdate('hostContact', e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white"
          />
          <p className="text-slate-400 text-sm mt-2">Cómo pueden contactarte los participantes</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Twitch */}
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <Label className="text-white mb-2 block text-sm">URL de Twitch (Opcional)</Label>
          <Input
            placeholder="https://twitch.tv/usuario"
            value={data.twitchUrl || ''}
            onChange={(e) => onUpdate('twitchUrl', e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white text-sm"
          />
        </Card>

        {/* Discord */}
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <Label className="text-white mb-2 block text-sm">URL de Discord (Opcional)</Label>
          <Input
            placeholder="https://discord.gg/invite"
            value={data.discordUrl || ''}
            onChange={(e) => onUpdate('discordUrl', e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white text-sm"
          />
        </Card>

        {/* YouTube */}
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <Label className="text-white mb-2 block text-sm">URL de YouTube (Opcional)</Label>
          <Input
            placeholder="https://youtube.com/usuario"
            value={data.youtubeUrl || ''}
            onChange={(e) => onUpdate('youtubeUrl', e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white text-sm"
          />
        </Card>

        {/* Facebook */}
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <Label className="text-white mb-2 block text-sm">URL de Facebook (Opcional)</Label>
          <Input
            placeholder="https://facebook.com/usuario"
            value={data.facebookUrl || ''}
            onChange={(e) => onUpdate('facebookUrl', e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white text-sm"
          />
        </Card>

        {/* X/Twitter */}
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <Label className="text-white mb-2 block text-sm">URL de X (Opcional)</Label>
          <Input
            placeholder="https://x.com/usuario"
            value={data.xUrl || ''}
            onChange={(e) => onUpdate('xUrl', e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white text-sm"
          />
        </Card>

        {/* Discord Server */}
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <Label className="text-white mb-2 block text-sm">Servidor de Discord (Opcional)</Label>
          <Input
            placeholder="https://discord.gg/servidor"
            value={data.discordServer || ''}
            onChange={(e) => onUpdate('discordServer', e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white text-sm"
          />
        </Card>
      </div>
    </div>
  );
}
