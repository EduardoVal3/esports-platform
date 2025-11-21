'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Twitter, Instagram, Youtube, Twitch, Facebook, Linkedin } from 'lucide-react';

const SOCIAL_PLATFORMS = [
  { id: 'twitter', label: 'Twitter / X', icon: Twitter, placeholder: 'https://twitter.com/tu-usuario' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/tu-usuario' },
  { id: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@tu-canal' },
  { id: 'twitch', label: 'Twitch', icon: Twitch, placeholder: 'https://twitch.tv/tu-canal' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/tu-perfil' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/tu-perfil' },
];

export default function SocialPage() {
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    instagram: '',
    youtube: '',
    twitch: '',
    facebook: '',
    linkedin: '',
  });

  const handleSave = () => {
    console.log('[v0] Saving social links:', socialLinks);
    alert('Enlaces guardados correctamente');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redes Sociales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {SOCIAL_PLATFORMS.map((platform) => {
          const Icon = platform.icon;
          return (
            <div key={platform.id} className="space-y-2">
              <Label htmlFor={platform.id} className="flex items-center gap-2">
                <Icon size={16} />
                {platform.label}
              </Label>
              <Input
                id={platform.id}
                type="url"
                value={socialLinks[platform.id as keyof typeof socialLinks]}
                onChange={(e) =>
                  setSocialLinks({
                    ...socialLinks,
                    [platform.id]: e.target.value,
                  })
                }
                placeholder={platform.placeholder}
              />
            </div>
          );
        })}

        <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
          Guardar cambios
        </Button>
      </CardContent>
    </Card>
  );
}
