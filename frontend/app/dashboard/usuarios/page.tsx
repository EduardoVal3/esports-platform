'use client';

import { UsersModule } from '@/components/dashboard/users-module';

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-balance">Gestión de Usuarios</h1>
        <p className="text-slate-400 mt-2">Administra usuarios, perfiles y permisos</p>
      </div>
      
      <UsersModule />
    </div>
  );
}
