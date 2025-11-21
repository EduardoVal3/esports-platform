'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function PreferenciasPage() {
  const [preferences, setPreferences] = useState({
    enableChallenges: true,
  });

  const handleSave = () => {
    console.log('[v0] Saving preferences:', preferences);
    alert('Preferencias guardadas correctamente');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias</CardTitle>
        <CardDescription>
          Configura tus preferencias de la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-800">
          <div className="space-y-1">
            <Label htmlFor="enableChallenges" className="text-base cursor-pointer">
              Habilitar desafíos
            </Label>
            <p className="text-sm text-slate-400">
              Permite que otros jugadores te desafíen a partidas
            </p>
          </div>
          <Switch
            id="enableChallenges"
            checked={preferences.enableChallenges}
            onCheckedChange={(checked) =>
              setPreferences({ ...preferences, enableChallenges: checked })
            }
          />
        </div>

        <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
          Guardar cambios
        </Button>
      </CardContent>
    </Card>
  );
}
