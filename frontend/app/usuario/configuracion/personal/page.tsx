'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const GENDERS = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'];
const TIMEZONES = [
  'UTC-12:00',
  'UTC-11:00',
  'UTC-10:00',
  'UTC-09:00',
  'UTC-08:00',
  'UTC-07:00',
  'UTC-06:00',
  'UTC-05:00',
  'UTC-04:00',
  'UTC-03:00',
  'UTC-02:00',
  'UTC-01:00',
  'UTC+00:00',
  'UTC+01:00',
  'UTC+02:00',
  'UTC+03:00',
  'UTC+04:00',
  'UTC+05:00',
  'UTC+06:00',
  'UTC+07:00',
  'UTC+08:00',
  'UTC+09:00',
  'UTC+10:00',
  'UTC+11:00',
  'UTC+12:00',
];

export default function PersonalPage() {
  const [formData, setFormData] = useState({
    nickname: 'ProGamer',
    aboutMe: 'Competitive eSports player | League of Legends & Valorant enthusiast',
    gender: 'Prefiero no decir',
    timezone: 'UTC-05:00',
  });

  const handleSave = () => {
    console.log('[v0] Saving personal info:', formData);
    alert('Información guardada correctamente');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            value={formData.nickname}
            disabled
            className="bg-slate-900 text-slate-500 cursor-not-allowed"
          />
          <p className="text-xs text-slate-500">
            El nickname no se puede modificar
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="aboutMe">Sobre ti</Label>
          <textarea
            id="aboutMe"
            value={formData.aboutMe}
            onChange={(e) =>
              setFormData({ ...formData, aboutMe: e.target.value })
            }
            rows={4}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500/20 outline-none"
            placeholder="Cuéntanos sobre ti..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Género</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) =>
              setFormData({ ...formData, gender: value })
            }
          >
            <SelectTrigger id="gender" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Zona horaria</Label>
          <Select
            value={formData.timezone}
            onValueChange={(value) =>
              setFormData({ ...formData, timezone: value })
            }
          >
            <SelectTrigger id="timezone" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
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
