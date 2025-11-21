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
import { DollarSign, TrendingUp, Download, Check, X, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const mockTransactions = [
  { id: 'TRX-001', user: 'ProGamer123', type: 'purchase', amount: 50, credits: 5000, date: '2024-01-15 14:30', status: 'completed' },
  { id: 'TRX-002', user: 'ElitePlayer', type: 'membership', amount: 19.99, plan: '1 mes', date: '2024-01-15 12:15', status: 'completed' },
  { id: 'TRX-003', user: 'NinjaWarrior', type: 'tournament', amount: -10, credits: -1000, date: '2024-01-14 18:45', status: 'completed' },
  { id: 'TRX-004', user: 'MasterChief', type: 'purchase', amount: 100, credits: 11000, date: '2024-01-14 10:20', status: 'completed' },
];

const mockWithdrawals = [
  { id: 'WTH-001', user: 'ProGamer123', amount: 250, paypal: 'progamer@paypal.com', date: '2024-01-15', status: 'pending' },
  { id: 'WTH-002', user: 'ElitePlayer', amount: 500, paypal: 'elite@paypal.com', date: '2024-01-14', status: 'approved' },
  { id: 'WTH-003', user: 'ChampionX', amount: 150, paypal: 'champion@paypal.com', date: '2024-01-13', status: 'processing' },
  { id: 'WTH-004', user: 'ToxicUser99', amount: 1000, paypal: 'toxic@paypal.com', date: '2024-01-12', status: 'rejected' },
];

const mockPricing = [
  { id: 1, type: 'credits', name: 'Paquete Básico', amount: '1,000 créditos', price: 10 },
  { id: 2, type: 'credits', name: 'Paquete Pro', amount: '5,000 créditos', price: 50 },
  { id: 3, type: 'credits', name: 'Paquete Elite', amount: '11,000 créditos', price: 100 },
  { id: 4, type: 'membership', name: 'Membresía 1 mes', amount: '1 mes', price: 19.99 },
  { id: 5, type: 'membership', name: 'Membresía 3 meses', amount: '3 meses', price: 49.99 },
  { id: 6, type: 'service', name: 'Cambio de Nickname', amount: '1 vez', price: 9.99 },
  { id: 7, type: 'service', name: 'Reinicio de Stats', amount: '1 vez', price: 14.99 },
];

export function FinanceModule() {
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'default';
      case 'pending':
      case 'processing':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'approved':
        return 'Aprobado';
      case 'pending':
        return 'Pendiente';
      case 'processing':
        return 'En Revisión';
      case 'rejected':
        return 'Rechazado';
      default:
        return status;
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Gestión Financiera</CardTitle>
        <CardDescription>Control de transacciones, retiros y configuración de precios</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
            <TabsTrigger value="withdrawals">Retiros</TabsTrigger>
            <TabsTrigger value="pricing">Configuración de Precios</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input placeholder="Buscar transacciones..." className="bg-slate-800 border-slate-700" />
              <Button variant="outline" className="gap-2">
                <Download size={16} />
                Exportar
              </Button>
            </div>

            <div className="rounded-lg border border-slate-800 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-800/50">
                    <TableHead>ID</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Detalles</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((tx) => (
                    <TableRow key={tx.id} className="border-slate-800">
                      <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                      <TableCell className="font-medium">{tx.user}</TableCell>
                      <TableCell className="capitalize">{tx.type}</TableCell>
                      <TableCell className={tx.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                        ${Math.abs(tx.amount)}
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {tx.credits && `${tx.credits > 0 ? '+' : ''}${tx.credits} créditos`}
                        {tx.plan && tx.plan}
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">{tx.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(tx.status)}>
                          {getStatusLabel(tx.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-4">
            <div className="rounded-lg border border-slate-800 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-800/50">
                    <TableHead>ID</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>PayPal</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWithdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id} className="border-slate-800">
                      <TableCell className="font-mono text-xs">{withdrawal.id}</TableCell>
                      <TableCell className="font-medium">{withdrawal.user}</TableCell>
                      <TableCell className="text-green-500 font-medium">
                        ${withdrawal.amount}
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">{withdrawal.paypal}</TableCell>
                      <TableCell className="text-slate-400 text-sm">{withdrawal.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(withdrawal.status)}>
                          {getStatusLabel(withdrawal.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedWithdrawal(withdrawal)}
                              >
                                <Eye size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-900 border-slate-700">
                              <DialogHeader>
                                <DialogTitle>Detalle de Retiro</DialogTitle>
                                <DialogDescription>
                                  Revisa la información antes de aprobar o rechazar
                                </DialogDescription>
                              </DialogHeader>
                              {selectedWithdrawal && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-slate-400">ID Solicitud</Label>
                                      <p className="font-mono text-sm">{selectedWithdrawal.id}</p>
                                    </div>
                                    <div>
                                      <Label className="text-slate-400">Usuario</Label>
                                      <p className="font-medium">{selectedWithdrawal.user}</p>
                                    </div>
                                    <div>
                                      <Label className="text-slate-400">Monto</Label>
                                      <p className="text-green-500 font-bold text-lg">
                                        ${selectedWithdrawal.amount}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="text-slate-400">Cuenta PayPal</Label>
                                      <p className="font-medium">{selectedWithdrawal.paypal}</p>
                                    </div>
                                  </div>
                                  <div className="border-t border-slate-800 pt-4">
                                    <Label className="text-slate-400 mb-2 block">
                                      Datos del Usuario para Verificación
                                    </Label>
                                    <div className="space-y-2 text-sm">
                                      <p><span className="text-slate-400">Nombre:</span> John Doe</p>
                                      <p><span className="text-slate-400">Dirección:</span> 123 Main St</p>
                                      <p><span className="text-slate-400">ID Verificado:</span> Sí</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter className="gap-2">
                                <Button variant="destructive" className="gap-2">
                                  <X size={16} />
                                  Rechazar
                                </Button>
                                <Button className="gap-2">
                                  <Check size={16} />
                                  Aprobar Pago
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPricing.map((item) => (
                <Card key={item.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2 capitalize">
                          {item.type}
                        </Badge>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription className="mt-1">{item.amount}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div>
                        <Label className="text-slate-400 text-xs">Precio Actual</Label>
                        <p className="text-2xl font-bold text-green-500">${item.price}</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">Editar</Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-900 border-slate-700">
                          <DialogHeader>
                            <DialogTitle>Editar Precio</DialogTitle>
                            <DialogDescription>
                              Ajusta el precio de {item.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Nuevo Precio (USD)</Label>
                              <Input 
                                type="number" 
                                defaultValue={item.price}
                                className="bg-slate-800 border-slate-700"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancelar</Button>
                            <Button>Guardar Cambios</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
