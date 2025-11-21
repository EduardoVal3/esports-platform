'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown } from 'lucide-react';
import type { MembershipTier } from '@/types';

interface MembershipCardProps {
  tier: MembershipTier;
}

export function MembershipCard({ tier }: MembershipCardProps) {
  return (
    <Card className={`relative overflow-hidden border transition-all ${tier.highlighted ? 'border-purple-500/50 ring-2 ring-purple-500/30' : 'border-slate-700'}`}>
      {tier.highlighted && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-purple-600/0 px-3 py-1 text-xs font-bold text-white rounded-bl">
          MÁS POPULAR
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-yellow-400" />
            <div>
              <CardTitle className="text-xl font-bold text-white">
                {tier.name}
              </CardTitle>
              {tier.duration > 0 && (
                <CardDescription>
                  {tier.duration} {tier.durationUnit === 'month' ? 'mes' : 'meses'}
                </CardDescription>
              )}
            </div>
          </div>
          {tier.savings && (
            <div className="bg-green-500/20 border border-green-500/50 rounded px-2 py-1 text-xs font-semibold text-green-400">
              -{tier.savings}%
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="text-3xl font-bold text-white">
            ${tier.price.toFixed(2)}
          </div>
          {tier.originalPrice && (
            <div className="text-xs text-slate-400">
              <span className="line-through">${tier.originalPrice.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="space-y-2 py-4 border-y border-slate-700">
          {tier.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-slate-300">{benefit}</span>
            </div>
          ))}
        </div>

        <Button
          className={`w-full font-semibold ${
            tier.price === 0
              ? 'bg-slate-700 hover:bg-slate-600 text-white'
              : tier.highlighted
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
          }`}
        >
          {tier.price === 0 ? 'Tu Plan Actual' : 'Suscribirse Ahora'}
        </Button>
      </CardContent>
    </Card>
  );
}
