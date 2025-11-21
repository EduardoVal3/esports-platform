'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

// Mock data
const mockGames = [
  { 
    id: 1, 
    name: 'Call of Duty: Modern Warfare III', 
    platforms: ['Xbox', 'PlayStation', 'PC'], 
    modes: ['Battle Royale', 'Multijugador 5v5', 'Search and Destroy'],
    active: true 
  },
  { 
    id: 2, 
    name: 'FIFA 24', 
    platforms: ['Xbox', 'PlayStation', 'PC'], 
    modes: ['Ultimate Team', '1v1', '2v2'],
    active: true 
  },
  { 
    id: 3, 
    name: 'League of Legends', 
    platforms: ['PC'], 
    modes: ['5v5 Summoners Rift', 'ARAM'],
    active: true 
  },
  { 
    id: 4, 
    name: 'Fortnite', 
    platforms: ['Xbox', 'PlayStation', 'PC', 'Nintendo Switch'], 
    modes: ['Battle Royale', 'Zero Build', 'Team Rumble'],
    active: false 
  },
];

const availablePlatforms = ['Xbox', 'PlayStation', 'PC', 'Nintendo Switch', 'Mobile'];

export function GamesModule() {
  const [games, setGames] = useState(mockGames);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGame, setNewGame] = useState({
    name: '',
    platforms: [] as string[],
    modes: [''],
  });

  const togglePlatform = (platform: string) => {
    setNewGame(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const addMode = () => {
    setNewGame(prev => ({
      ...prev,
      modes: [...prev.modes, '']
    }));
  };

  const updateMode = (index: number, value: string) => {
    setNewGame(prev => ({
      ...prev,
      modes: prev.modes.map((mode, i) => i === index ? value : mode)
    }));
  };

  const removeMode = (index: number) => {
    setNewGame(prev => ({
      ...prev,
      modes: prev.modes.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestión de Juegos y Plataformas</CardTitle>
            <CardDescription>Administra juegos, plataformas y modos disponibles</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                Agregar Juego
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Juego</DialogTitle>
                <DialogDescription>
                  Completa la información del juego, plataformas y modos
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nombre del Juego</Label>
                  <Input 
                    placeholder="Ej: Call of Duty: Modern Warfare III"
                    value={newGame.name}
                    onChange={(e) => setNewGame({...newGame, name: e.target.value})}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Cover/Banner del Juego</Label>
                  <Button variant="outline" className="w-full gap-2">
                    <Upload size={16} />
                    Subir Imagen
                  </Button>
                </div>

                <div>
                  <Label className="mb-2 block">Plataformas Disponibles</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availablePlatforms.map((platform) => (
                      <div 
                        key={platform}
                        className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700"
                        onClick={() => togglePlatform(platform)}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          newGame.platforms.includes(platform) 
                            ? 'bg-purple-600 border-purple-600' 
                            : 'border-slate-600'
                        }`}>
                          {newGame.platforms.includes(platform) && (
                            <div className="w-2 h-2 bg-white rounded-sm" />
                          )}
                        </div>
                        <span className="text-sm">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Modos de Juego</Label>
                    <Button variant="outline" size="sm" onClick={addMode} className="gap-2">
                      <Plus size={14} />
                      Agregar Modo
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {newGame.modes.map((mode, index) => (
                      <div key={index} className="flex gap-2">
                        <Input 
                          placeholder="Ej: Battle Royale"
                          value={mode}
                          onChange={(e) => updateMode(index, e.target.value)}
                          className="bg-slate-800 border-slate-700"
                        />
                        {newGame.modes.length > 1 && (
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => removeMode(index)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => {
                  // Add game logic here
                  setIsAddDialogOpen(false);
                }}>
                  Guardar Juego
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <Card key={game.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{game.name}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {game.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={game.active} />
                    <Button variant="ghost" size="icon">
                      <Edit size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-slate-400 text-xs">Modos de Juego:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {game.modes.map((mode, idx) => (
                      <Badge key={idx} className="text-xs">
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
