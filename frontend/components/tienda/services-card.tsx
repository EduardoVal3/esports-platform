'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Service } from '@/types';

interface ServicesCardProps {
  service: Service;
}

export function ServicesCard({ service }: ServicesCardProps) {
  return (
    <Card className="border-slate-700 hover:border-slate-600 transition">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{service.icon}</div>
            <CardTitle className="text-lg font-bold text-white">
              {service.name}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-slate-400">
          {service.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-slate-700">
          <div className="text-2xl font-bold text-white">
            ${service.price.toFixed(2)}
          </div>
          <Button
            size="sm"
            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600"
          >
            Comprar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
