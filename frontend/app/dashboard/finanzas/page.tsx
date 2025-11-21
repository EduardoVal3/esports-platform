'use client';

import { FinanceModule } from '@/components/dashboard/finance-module';

export default function FinanzasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-balance">Gestión Financiera</h1>
        <p className="text-slate-400 mt-2">Control de transacciones, retiros y configuración de precios</p>
      </div>
      
      <FinanceModule />
    </div>
  );
}
