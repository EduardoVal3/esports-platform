'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, X, Award, DollarSign } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

// Mock data
const mockTournaments = [
  { 
    id: 'TOUR-001', 
    name: 'Call of Duty Championship', 
    game: 'COD: MW3', 
    host: 'ProGamer123', 
    status: 'active',
    players: 32,
    maxPlayers: 64,
    prizePool: 500,
    fee: 50,
    region: 'NA',
    date: '2024-01-20'
  },
  { 
    id: 'TOUR-002', 
    name: 'FIFA 24 League', 
    game: 'FIFA 24', 
    host: 'ElitePlayer', 
    status: 'upcoming',
    players: 12,
    maxPlayers: 16,
    prizePool: 200,
    fee: 20,
    region: 'EU',
    date: '2024-01-25'
  },
  { 
    id: 'TOUR-003', 
    name: 'LoL Tournament', 
    game: 'League of Legends', 
    host: 'NinjaWarrior', 
    status: 'completed',
    players: 10,
    maxPlayers: 10,
    prizePool: 1000,
    fee: 100,
    region: 'SA',
    date: '2024-01-10'
  },
];

export function TournamentsModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTournament, setSelectedTournament] = useState<any>(null);

  const filteredTournaments = mockTournaments.filter(tournament => 
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'upcoming':
        return 'secondary';
      case 'completed':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'En Curso';
      case 'upcoming':
        return 'Próximamente';
      case 'completed':
        return 'Finalizado';
      default:
        return status;
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Gestión de Torneos</CardTitle>
        <CardDescription>Supervisa torneos activos y resuelve disputas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Buscar por nombre o juego..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-700">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">En Curso</SelectItem>
              <SelectItem value="upcoming">Próximamente</SelectItem>
              <SelectItem value="completed">Finalizados</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-700">
              <SelectValue placeholder="Región" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="na">NA</SelectItem>
              <SelectItem value="eu">EU</SelectItem>
              <SelectItem value="sa">SA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tournaments Table */}
        <div className="rounded-lg border border-slate-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-800/50">
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Juego</TableHead>
                <TableHead>Anfitrión</TableHead>
                <TableHead>Jugadores</TableHead>
                <TableHead>Premio</TableHead>
                <TableHead>Comisión</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTournaments.map((tournament) => (
                <TableRow key={tournament.id} className="border-slate-800">
                  <TableCell className="font-mono text-xs">{tournament.id}</TableCell>
                  <TableCell className="font-medium">{tournament.name}</TableCell>
                  <TableCell className="text-slate-400">{tournament.game}</TableCell>
                  <TableCell className="text-slate-400">{tournament.host}</TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {tournament.players}/{tournament.maxPlayers}
                    </span>
                  </TableCell>
                  <TableCell className="text-green-500 font-medium">
                    ${tournament.prizePool}
                  </TableCell>
                  <TableCell className="text-purple-500 font-medium">
                    ${tournament.fee}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(tournament.status)}>
                      {getStatusLabel(tournament.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedTournament(tournament)}
                        >
                          <Eye size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalle del Torneo</DialogTitle>
                          <DialogDescription>
                            Información completa y opciones de moderación
                          </DialogDescription>
                        </DialogHeader>
                        {selectedTournament && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-slate-400">ID Torneo</Label>
                                <p className="font-mono text-sm">{selectedTournament.id}</p>
                              </div>
                              <div>
                                <Label className="text-slate-400">Estado</Label>
                                <Badge variant={getStatusColor(selectedTournament.status)} className="mt-1">
                                  {getStatusLabel(selectedTournament.status)}
                                </Badge>
                              </div>
                              <div>
                                <Label className="text-slate-400">Nombre</Label>
                                <p className="font-medium">{selectedTournament.name}</p>
                              </div>
                              <div>
                                <Label className="text-slate-400">Juego</Label>
                                <p className="font-medium">{selectedTournament.game}</p>
                              </div>
                              <div>
                                <Label className="text-slate-400">Anfitrión</Label>
                                <p className="font-medium">{selectedTournament.host}</p>
                              </div>
                              <div>
                                <Label className="text-slate-400">Región</Label>
                                <p className="font-medium">{selectedTournament.region}</p>
                              </div>
                              <div>
                                <Label className="text-slate-400">Jugadores</Label>
                                <p className="font-medium">
                                  {selectedTournament.players}/{selectedTournament.maxPlayers}
                                </p>
                              </div>
                              <div>
                                <Label className="text-slate-400">Fecha</Label>
                                <p className="font-medium">{selectedTournament.date}</p>
                              </div>
                            </div>

                            <div className="border-t border-slate-800 pt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-800 rounded-lg">
                                  <Label className="text-slate-400 text-xs">Pozo de Premio</Label>
                                  <p className="text-2xl font-bold text-green-500 mt-1">
                                    ${selectedTournament.prizePool}
                                  </p>
                                </div>
                                <div className="p-4 bg-slate-800 rounded-lg">
                                  <Label className="text-slate-400 text-xs">Comisión Plataforma</Label>
                                  <p className="text-2xl font-bold text-purple-500 mt-1">
                                    ${selectedTournament.fee}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-slate-800 pt-4">
                              <Label className="text-slate-400 mb-2 block">Acciones de Moderación</Label>
                              <div className="space-y-2">
                                <Button variant="outline" className="w-full gap-2">
                                  <Award size={16} />
                                  Forzar Resultado Manual
                                </Button>
                                <Button variant="outline" className="w-full gap-2">
                                  <DollarSign size={16} />
                                  Ajustar Premios
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="destructive" className="gap-2">
                            <X size={16} />
                            Cancelar Torneo
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
