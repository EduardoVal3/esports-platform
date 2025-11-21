'use client';

import { StoreTabs } from '@/components/tienda/store-tabs';
import { UserBadge } from '@/components/ui/user-badge';
import { ShoppingCart, Wallet } from 'lucide-react';

export default function TiendaPage() {
  const mockUser = {
    id: '1',
    username: 'ProGamer',
    email: 'pro@esports.com',
    role: 'user' as const,
  };

  const userBalance = 150.00;
  const userCredits = 45;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <ShoppingCart size={36} />
            Tienda
          </h1>
          <p className="text-slate-400 mt-2">Compra créditos, membresías y servicios especiales</p>
        </div>
        <UserBadge user={mockUser} />
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Credits Balance */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-slate-400 text-sm">Créditos Disponibles</p>
              <p className="text-3xl font-bold text-white">{userCredits}</p>
            </div>
            <div className="bg-yellow-500/20 p-4 rounded-lg">
              <Wallet className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Money Balance */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-slate-400 text-sm">Saldo en Cuenta</p>
              <p className="text-3xl font-bold text-white">${userBalance.toFixed(2)}</p>
            </div>
            <div className="bg-green-500/20 p-4 rounded-lg">
              <ShoppingCart className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Store Tabs */}
      <StoreTabs />
    </div>
  );
}
