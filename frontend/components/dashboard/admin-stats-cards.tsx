'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Trophy, TrendingUp } from 'lucide-react';

export function AdminStatsCards() {
  // Mock data
  const stats = [
    {
      title: 'Usuarios Totales',
      value: '12,543',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Ingresos Mensuales',
      value: '$45,231',
      change: '+23.1%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Torneos Activos',
      value: '89',
      change: '+5.4%',
      icon: Trophy,
      color: 'text-purple-500',
    },
    {
      title: 'Tasa de Crecimiento',
      value: '18.2%',
      change: '+2.3%',
      icon: TrendingUp,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {stat.title}
              </CardTitle>
              <Icon className={`${stat.color}`} size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-500 mt-1">{stat.change} vs mes anterior</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
