'use client';

import { AdminStatsCards } from '@/components/dashboard/admin-stats-cards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, Users, Gamepad2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-balance">Dashboard Administrativo</h1>
        <p className="text-slate-400 mt-2">Vista general de la plataforma</p>
      </div>

      {/* Stats Overview */}
      <AdminStatsCards />

      {/* Activity Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="text-purple-500" size={20} />
              Actividad Reciente
            </CardTitle>
            <CardDescription>Últimos eventos del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Nuevo usuario registrado', user: 'ProGamer123', time: 'Hace 5 min' },
                { action: 'Torneo creado', user: 'Admin', time: 'Hace 15 min' },
                { action: 'Retiro aprobado', user: 'ElitePlayer', time: 'Hace 1 hora' },
                { action: 'Juego actualizado', user: 'Admin', time: 'Hace 2 horas' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-slate-400">{activity.user}</p>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-green-500" size={20} />
              Estadísticas del Mes
            </CardTitle>
            <CardDescription>Métricas clave de rendimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Nuevos usuarios', value: '1,234', change: '+12%', positive: true },
                { label: 'Torneos activos', value: '45', change: '+8%', positive: true },
                { label: 'Ingresos totales', value: '$12,450', change: '+23%', positive: true },
                { label: 'Reportes resueltos', value: '89%', change: '+5%', positive: true },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <span className={`text-sm font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
