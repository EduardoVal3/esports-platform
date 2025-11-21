'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import type { CreditPackage } from '@/types';

interface CreditsCardProps {
  package: CreditPackage;
}

export function CreditsCard({ package: pkg }: CreditsCardProps) {
  return (
    <Card className={`relative overflow-hidden border transition-all hover:border-purple-500/50 ${pkg.highlighted ? 'border-purple-500/50 ring-2 ring-purple-500/30' : 'border-slate-700'}`}>
      {pkg.highlighted && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-purple-600/0 px-3 py-1 text-xs font-bold text-white rounded-bl">
          RECOMENDADO
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                {pkg.credits}
              </CardTitle>
              <CardDescription>Créditos</CardDescription>
            </div>
          </div>
          {pkg.savings && (
            <div className="bg-green-500/20 border border-green-500/50 rounded px-2 py-1 text-xs font-semibold text-green-400">
              -{pkg.savings}%
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="text-3xl font-bold text-white">
            ${pkg.price.toFixed(2)}
          </div>
          {pkg.savings && (
            <div className="text-xs text-slate-400">
              ${(pkg.credits * 1.0).toFixed(2)} normalmente
            </div>
          )}
        </div>

        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
        >
          Comprar Créditos
        </Button>
      </CardContent>
    </Card>
  );
}
