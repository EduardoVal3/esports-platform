'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Ban, Shield, Mail, MoreVertical } from 'lucide-react';

// Mock data
const mockUsers = [
  { id: 1, nickname: 'ProGamer123', email: 'progamer@example.com', role: 'user', status: 'active', lastLogin: '2024-01-15', tournaments: 23 },
  { id: 2, nickname: 'ElitePlayer', email: 'elite@example.com', role: 'user', status: 'active', lastLogin: '2024-01-14', tournaments: 45 },
  { id: 3, nickname: 'ToxicUser99', email: 'toxic@example.com', role: 'user', status: 'banned', lastLogin: '2024-01-10', tournaments: 12 },
  { id: 4, nickname: 'MasterChief', email: 'master@example.com', role: 'admin', status: 'active', lastLogin: '2024-01-15', tournaments: 67 },
  { id: 5, nickname: 'NinjaWarrior', email: 'ninja@example.com', role: 'user', status: 'active', lastLogin: '2024-01-13', tournaments: 34 },
];

export function UsersModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = mockUsers.filter(user => 
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Gestión de Usuarios</CardTitle>
        <CardDescription>Administra perfiles, roles y permisos de usuarios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Buscar por nickname, email o ID..."
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
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="banned">Baneados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
        <div className="rounded-lg border border-slate-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-800/50">
                <TableHead>ID</TableHead>
                <TableHead>Nickname</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-slate-800">
                  <TableCell className="font-mono text-xs">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.nickname}</TableCell>
                  <TableCell className="text-slate-400">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                      {user.role === 'admin' ? (
                        <><Shield size={12} /> Admin</>
                      ) : (
                        'User'
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                      {user.status === 'active' ? 'Activo' : 'Baneado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm">{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalle de Usuario</DialogTitle>
                          <DialogDescription>
                            Información completa y opciones de moderación
                          </DialogDescription>
                        </DialogHeader>
                        {selectedUser && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-slate-400">Nickname</Label>
                                <p className="font-medium">{selectedUser.nickname}</p>
                              </div>
                              <div>
                                <Label className="text-slate-400">Email</Label>
                                <p className="font-medium">{selectedUser.email}</p>
                              </div>
                              <div>
                                <Label className="text-slate-400">ID Usuario</Label>
                                <p className="font-mono text-sm">{selectedUser.id}</p>
                              </div>
                              <div>
                                <Label className="text-slate-400">Torneos Jugados</Label>
                                <p className="font-medium">{selectedUser.tournaments}</p>
                              </div>
                            </div>

                            <div className="border-t border-slate-800 pt-4">
                              <Label className="text-slate-400 mb-2 block">Datos de Seguridad</Label>
                              <div className="space-y-2 text-sm">
                                <p><span className="text-slate-400">Nombre Real:</span> John Doe</p>
                                <p><span className="text-slate-400">PayPal:</span> john.doe@paypal.com</p>
                                <p><span className="text-slate-400">Dirección:</span> 123 Main St, City</p>
                              </div>
                            </div>

                            <div className="border-t border-slate-800 pt-4">
                              <Label className="text-slate-400 mb-2 block">Gestión de Roles</Label>
                              <Select defaultValue={selectedUser.role}>
                                <SelectTrigger className="bg-slate-800 border-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                        <DialogFooter className="gap-2">
                          <Button variant="outline" className="gap-2">
                            <Mail size={16} />
                            Enviar Reset Password
                          </Button>
                          <Button 
                            variant="destructive" 
                            className="gap-2"
                            disabled={selectedUser?.status === 'banned'}
                          >
                            <Ban size={16} />
                            {selectedUser?.status === 'banned' ? 'Desbanear' : 'Banear Usuario'}
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
