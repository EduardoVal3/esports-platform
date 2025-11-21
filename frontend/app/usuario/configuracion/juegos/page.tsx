'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';

const GAME_ACCOUNTS = [
  { id: 'psn', label: 'PlayStation Network (PSN)', placeholder: 'Tu ID de PSN' },
  { id: 'xbox', label: 'Xbox Live', placeholder: 'Tu Gamertag de Xbox' },
  { id: 'epic', label: 'Epic Games', placeholder: 'Tu ID de Epic' },
  { id: 'activision', label: 'Activision ID', placeholder: 'Tu Activision ID' },
  { id: 'rogue', label: 'Rogue ID', placeholder: 'Tu Rogue ID' },
  { id: 'apex', label: 'Apex Legends ID', placeholder: 'Tu ID de Apex' },
  { id: 'steam', label: 'Steam', placeholder: 'Tu ID de Steam' },
  { id: 'riot', label: 'Riot ID', placeholder: 'Tu Riot ID (Usuario#TAG)' },
  { id: 'ubisoft', label: 'Ubisoft Connect', placeholder: 'Tu ID de Ubisoft' },
  { id: 'ea', label: 'EA ID', placeholder: 'Tu EA ID' },
];

export default function JuegosPage() {
  const [gameAccounts, setGameAccounts] = useState({
    psn: '',
    xbox: '',
    epic: '',
    activision: '',
    rogue: '',
    apex: '',
    steam: '',
    riot: '',
    ubisoft: '',
    ea: '',
  });

  const handleSave = () => {
    console.log('[v0] Saving game accounts:', gameAccounts);
    alert('Cuentas de juegos guardadas correctamente');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 size={20} />
          Cuentas de Juegos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-slate-400">
          Vincula tus cuentas de juegos para participar en torneos y competencias
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GAME_ACCOUNTS.map((account) => (
            <div key={account.id} className="space-y-2">
              <Label htmlFor={account.id}>{account.label}</Label>
              <Input
                id={account.id}
                value={gameAccounts[account.id as keyof typeof gameAccounts]}
                onChange={(e) =>
                  setGameAccounts({
                    ...gameAccounts,
                    [account.id]: e.target.value,
                  })
                }
                placeholder={account.placeholder}
              />
            </div>
          ))}
        </div>

        <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
          Guardar cambios
        </Button>
      </CardContent>
    </Card>
  );
}
