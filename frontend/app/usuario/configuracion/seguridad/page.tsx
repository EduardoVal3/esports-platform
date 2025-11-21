'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Shield } from 'lucide-react';

const COUNTRIES = [
  'Argentina',
  'Bolivia',
  'Brasil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Ecuador',
  'El Salvador',
  'España',
  'Guatemala',
  'Honduras',
  'México',
  'Nicaragua',
  'Panamá',
  'Paraguay',
  'Perú',
  'Puerto Rico',
  'República Dominicana',
  'Uruguay',
  'Venezuela',
];

const CURRENCIES = ['USD', 'EUR', 'MXN', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];

export default function SeguridadPage() {
  const [securityData, setSecurityData] = useState({
    paypalAddress: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    currency: 'USD',
  });

  const handleSave = () => {
    console.log('[v0] Saving security data:', securityData);
    alert('Información de seguridad guardada correctamente');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield size={20} />
          Seguridad y Pagos
        </CardTitle>
        <CardDescription>
          Información necesaria para procesar tus pagos y retiros
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="paypalAddress">Dirección de PayPal</Label>
          <Input
            id="paypalAddress"
            type="email"
            value={securityData.paypalAddress}
            onChange={(e) =>
              setSecurityData({ ...securityData, paypalAddress: e.target.value })
            }
            placeholder="tu-email@paypal.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input
              id="firstName"
              value={securityData.firstName}
              onChange={(e) =>
                setSecurityData({ ...securityData, firstName: e.target.value })
              }
              placeholder="Tu nombre"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              value={securityData.lastName}
              onChange={(e) =>
                setSecurityData({ ...securityData, lastName: e.target.value })
              }
              placeholder="Tu apellido"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="tel"
            value={securityData.phone}
            onChange={(e) =>
              setSecurityData({ ...securityData, phone: e.target.value })
            }
            placeholder="+1234567890"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            value={securityData.address}
            onChange={(e) =>
              setSecurityData({ ...securityData, address: e.target.value })
            }
            placeholder="Calle y número"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              value={securityData.city}
              onChange={(e) =>
                setSecurityData({ ...securityData, city: e.target.value })
              }
              placeholder="Tu ciudad"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">Estado / Provincia</Label>
            <Input
              id="state"
              value={securityData.state}
              onChange={(e) =>
                setSecurityData({ ...securityData, state: e.target.value })
              }
              placeholder="Tu estado"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="zipCode">Código postal</Label>
            <Input
              id="zipCode"
              value={securityData.zipCode}
              onChange={(e) =>
                setSecurityData({ ...securityData, zipCode: e.target.value })
              }
              placeholder="12345"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Select
              value={securityData.country}
              onValueChange={(value) =>
                setSecurityData({ ...securityData, country: value })
              }
            >
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Selecciona tu país" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Divisa preferida</Label>
          <Select
            value={securityData.currency}
            onValueChange={(value) =>
              setSecurityData({ ...securityData, currency: value })
            }
          >
            <SelectTrigger id="currency" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
          Guardar cambios
        </Button>
      </CardContent>
    </Card>
  );
}
