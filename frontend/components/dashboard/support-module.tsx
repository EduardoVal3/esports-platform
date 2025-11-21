'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Eye, Check, X, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const mockNicknameRequests = [
  { 
    id: 'NICK-001', 
    user: 'NewPlayer99', 
    requestedNickname: 'ProGamer', 
    currentOwner: 'InactiveUser123', 
    lastActive: '2022-05-10', 
    paid: true, 
    date: '2024-01-15',
    status: 'pending'
  },
  { 
    id: 'NICK-002', 
    user: 'EliteGamer', 
    requestedNickname: 'Legend', 
    currentOwner: 'OldAccount', 
    lastActive: '2021-12-20', 
    paid: true, 
    date: '2024-01-14',
    status: 'pending'
  },
];

const mockReports = [
  { 
    id: 'REP-001', 
    reporter: 'GoodPlayer123', 
    reported: 'ToxicUser99', 
    reason: 'Comportamiento tóxico y spam en chat', 
    match: 'MATCH-445', 
    date: '2024-01-15',
    status: 'open'
  },
  { 
    id: 'REP-002', 
    reporter: 'FairPlayer', 
    reported: 'CheatUser', 
    reason: 'Uso de cheats/hacks', 
    match: 'MATCH-443', 
    date: '2024-01-14',
    status: 'investigating'
  },
  { 
    id: 'REP-003', 
    reporter: 'CleanGamer', 
    reported: 'Abuser123', 
    reason: 'Abuso verbal y amenazas', 
    match: 'MATCH-441', 
    date: '2024-01-13',
    status: 'resolved'
  },
];

export function SupportModule() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'open':
        return 'secondary';
      case 'investigating':
        return 'default';
      case 'resolved':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'open':
        return 'Abierto';
      case 'investigating':
        return 'Investigando';
      case 'resolved':
        return 'Resuelto';
      default:
        return status;
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Soporte y Tickets</CardTitle>
        <CardDescription>Gestiona solicitudes especiales y reportes de usuarios</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nicknames" className="space-y-4">
          <TabsList>
            <TabsTrigger value="nicknames">Reclamos de Nickname</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="nicknames" className="space-y-4">
            <div className="rounded-lg border border-slate-800 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-800/50">
                    <TableHead>ID</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Nickname Solicitado</TableHead>
                    <TableHead>Propietario Actual</TableHead>
                    <TableHead>Última Actividad</TableHead>
                    <TableHead>Pago</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockNicknameRequests.map((request) => (
                    <TableRow key={request.id} className="border-slate-800">
                      <TableCell className="font-mono text-xs">{request.id}</TableCell>
                      <TableCell className="font-medium">{request.user}</TableCell>
                      <TableCell className="text-purple-400 font-medium">
                        {request.requestedNickname}
                      </TableCell>
                      <TableCell className="text-slate-400">{request.currentOwner}</TableCell>
                      <TableCell className="text-slate-400 text-sm">{request.lastActive}</TableCell>
                      <TableCell>
                        <Badge variant={request.paid ? 'default' : 'destructive'}>
                          {request.paid ? '$9.99 Pagado' : 'No Pagado'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(request.status)}>
                          {getStatusLabel(request.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-900 border-slate-700">
                            <DialogHeader>
                              <DialogTitle>Solicitud de Reclamo de Nickname</DialogTitle>
                              <DialogDescription>
                                Revisa la información antes de liberar el nickname
                              </DialogDescription>
                            </DialogHeader>
                            {selectedRequest && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-slate-400">ID Solicitud</Label>
                                    <p className="font-mono text-sm">{selectedRequest.id}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-400">Fecha</Label>
                                    <p className="text-sm">{selectedRequest.date}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-400">Solicitante</Label>
                                    <p className="font-medium">{selectedRequest.user}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-400">Pago</Label>
                                    <Badge variant="default" className="mt-1">$9.99 Verificado</Badge>
                                  </div>
                                </div>

                                <div className="border-t border-slate-800 pt-4">
                                  <Label className="text-slate-400 mb-2 block">Nickname Solicitado</Label>
                                  <p className="text-2xl font-bold text-purple-400">
                                    {selectedRequest.requestedNickname}
                                  </p>
                                </div>

                                <div className="border-t border-slate-800 pt-4">
                                  <Label className="text-slate-400 mb-2 block">
                                    Información del Propietario Actual
                                  </Label>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-slate-400">Usuario:</span> {selectedRequest.currentOwner}</p>
                                    <p><span className="text-slate-400">Última Actividad:</span> {selectedRequest.lastActive}</p>
                                    <p><span className="text-slate-400">Días de Inactividad:</span> 600+ días</p>
                                  </div>
                                </div>

                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                                  <div className="flex gap-2">
                                    <AlertTriangle className="text-yellow-500" size={18} />
                                    <div className="text-sm">
                                      <p className="font-medium text-yellow-500">Advertencia</p>
                                      <p className="text-slate-300">
                                        Esta acción liberará el nickname del usuario inactivo y lo asignará al solicitante. 
                                        Esta acción no se puede deshacer.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <DialogFooter className="gap-2">
                              <Button variant="outline">
                                <X size={16} className="mr-2" />
                                Rechazar
                              </Button>
                              <Button className="bg-purple-600 hover:bg-purple-700">
                                <Check size={16} className="mr-2" />
                                Liberar y Asignar Nickname
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
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input placeholder="Buscar reportes..." className="bg-slate-800 border-slate-700" />
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="open">Abiertos</SelectItem>
                  <SelectItem value="investigating">Investigando</SelectItem>
                  <SelectItem value="resolved">Resueltos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border border-slate-800 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-800/50">
                    <TableHead>ID</TableHead>
                    <TableHead>Reportador</TableHead>
                    <TableHead>Usuario Reportado</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Match</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReports.map((report) => (
                    <TableRow key={report.id} className="border-slate-800">
                      <TableCell className="font-mono text-xs">{report.id}</TableCell>
                      <TableCell className="font-medium">{report.reporter}</TableCell>
                      <TableCell className="text-red-400 font-medium">{report.reported}</TableCell>
                      <TableCell className="text-slate-400 text-sm max-w-[200px] truncate">
                        {report.reason}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-slate-400">{report.match}</TableCell>
                      <TableCell className="text-slate-400 text-sm">{report.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(report.status)}>
                          {getStatusLabel(report.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedReport(report)}
                            >
                              <Eye size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detalle del Reporte</DialogTitle>
                              <DialogDescription>
                                Revisa la información y toma acción sobre el usuario reportado
                              </DialogDescription>
                            </DialogHeader>
                            {selectedReport && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-slate-400">ID Reporte</Label>
                                    <p className="font-mono text-sm">{selectedReport.id}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-400">Fecha</Label>
                                    <p className="text-sm">{selectedReport.date}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-400">Reportador</Label>
                                    <p className="font-medium">{selectedReport.reporter}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-400">Usuario Reportado</Label>
                                    <p className="font-medium text-red-400">{selectedReport.reported}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-400">Match ID</Label>
                                    <p className="font-mono text-sm">{selectedReport.match}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-400">Estado</Label>
                                    <Badge variant={getStatusColor(selectedReport.status)} className="mt-1">
                                      {getStatusLabel(selectedReport.status)}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="border-t border-slate-800 pt-4">
                                  <Label className="text-slate-400 mb-2 block">Motivo del Reporte</Label>
                                  <p className="text-sm">{selectedReport.reason}</p>
                                </div>

                                <div className="border-t border-slate-800 pt-4">
                                  <Label className="text-slate-400 mb-2 block">Historial del Reportado</Label>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-slate-400">Reportes previos:</span> 3</p>
                                    <p><span className="text-slate-400">Bans previos:</span> 1 (temporal 7 días)</p>
                                    <p><span className="text-slate-400">Cuenta desde:</span> 2023-06-15</p>
                                  </div>
                                </div>

                                <div className="border-t border-slate-800 pt-4">
                                  <Label className="text-slate-400 mb-2 block">Cambiar Estado</Label>
                                  <Select defaultValue={selectedReport.status}>
                                    <SelectTrigger className="bg-slate-800 border-slate-700">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="open">Abierto</SelectItem>
                                      <SelectItem value="investigating">Investigando</SelectItem>
                                      <SelectItem value="resolved">Resuelto</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                            <DialogFooter className="gap-2">
                              <Button variant="outline">Cerrar sin Acción</Button>
                              <Button variant="secondary">Ban Temporal (7 días)</Button>
                              <Button variant="destructive">Ban Permanente</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
