'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditsCard } from './credits-card';
import { MembershipCard } from './membership-card';
import { ServicesCard } from './services-card';
import { MOCK_CREDIT_PACKAGES, MOCK_MEMBERSHIP_TIERS, MOCK_SERVICES } from '@/config/constants';
import { Zap, Crown, Gift } from 'lucide-react';

export function StoreTabs() {
  return (
    <Tabs defaultValue="credits" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-slate-700 mb-8">
        <TabsTrigger value="credits" className="flex items-center gap-2">
          <Zap size={16} />
          <span className="hidden sm:inline">Créditos</span>
        </TabsTrigger>
        <TabsTrigger value="membership" className="flex items-center gap-2">
          <Crown size={16} />
          <span className="hidden sm:inline">Afiliación</span>
        </TabsTrigger>
        <TabsTrigger value="services" className="flex items-center gap-2">
          <Gift size={16} />
          <span className="hidden sm:inline">Servicios</span>
        </TabsTrigger>
      </TabsList>

      {/* Créditos Tab */}
      <TabsContent value="credits" className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Comprar Créditos</h3>
          <p className="text-slate-400 mb-6">1 crédito = $1.00</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_CREDIT_PACKAGES.map((pkg) => (
            <CreditsCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </TabsContent>

      {/* Membresía Tab */}
      <TabsContent value="membership" className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Planes de Membresía</h3>
          <p className="text-slate-400 mb-6">Elige el plan perfecto para ti y disfruta de beneficios exclusivos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_MEMBERSHIP_TIERS.map((tier) => (
            <MembershipCard key={tier.id} tier={tier} />
          ))}
        </div>
      </TabsContent>

      {/* Servicios Tab */}
      <TabsContent value="services" className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Servicios Adicionales</h3>
          <p className="text-slate-400 mb-6">Personaliza tu experiencia con servicios especiales</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_SERVICES.map((service) => (
            <ServicesCard key={service.id} service={service} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
