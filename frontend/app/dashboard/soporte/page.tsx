'use client';

import { SupportModule } from '@/components/dashboard/support-module';

export default function SoportePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-balance">Centro de Soporte</h1>
        <p className="text-slate-400 mt-2">Gestiona reclamos de nicknames y reportes de usuarios</p>
      </div>
      
      <SupportModule />
    </div>
  );
}
