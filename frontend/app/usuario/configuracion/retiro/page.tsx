'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function RetiroPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retiro de Fondos</CardTitle>
        <CardDescription>
          Sistema de retiro de ganancias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
            <AlertCircle size={32} className="text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Próximamente</h3>
            <p className="text-slate-400 max-w-md">
              La funcionalidad de retiro de fondos estará disponible próximamente.
              Asegúrate de completar tu información de seguridad para poder retirar
              tus ganancias cuando esta función esté activa.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
