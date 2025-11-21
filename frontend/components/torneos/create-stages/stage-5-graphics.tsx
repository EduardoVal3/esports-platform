'use client';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { TournamentFormData } from '@/types';
import { Upload } from 'lucide-react';

interface Stage5Props {
  data: TournamentFormData;
  onUpdate: (field: keyof TournamentFormData, value: any) => void;
}

export function Stage5Graphics({ data, onUpdate }: Stage5Props) {
  const handleFileChange = (field: 'bannerImage' | 'thumbnailImage', file: File | undefined) => {
    onUpdate(field, file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Gráficos Personalizados</h2>
        <p className="text-slate-400">Añade imágenes representativas de tu torneo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Banner */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-4 block font-semibold">Banner Personalizado (Opcional)</Label>
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('bannerImage', e.target.files?.[0])}
              className="hidden"
              id="banner-input"
            />
            <label htmlFor="banner-input" className="cursor-pointer block">
              <Upload className="w-12 h-12 text-slate-500 mx-auto mb-2 group-hover:text-purple-500 transition-colors" />
              <p className="text-slate-300 font-medium">Haz clic para cargar</p>
              <p className="text-slate-500 text-sm mt-1">PNG, JPG hasta 5MB</p>
              {data.bannerImage && (
                <p className="text-purple-400 text-sm mt-2">✓ {data.bannerImage.name}</p>
              )}
            </label>
          </div>
          <p className="text-slate-400 text-xs mt-3">Recomendado: 1200x400px</p>
        </Card>

        {/* Miniatura */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <Label className="text-white mb-4 block font-semibold">Miniatura (Opcional)</Label>
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('thumbnailImage', e.target.files?.[0])}
              className="hidden"
              id="thumbnail-input"
            />
            <label htmlFor="thumbnail-input" className="cursor-pointer block">
              <Upload className="w-12 h-12 text-slate-500 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
              <p className="text-slate-300 font-medium">Haz clic para cargar</p>
              <p className="text-slate-500 text-sm mt-1">PNG, JPG hasta 5MB</p>
              {data.thumbnailImage && (
                <p className="text-blue-400 text-sm mt-2">✓ {data.thumbnailImage.name}</p>
              )}
            </label>
          </div>
          <p className="text-slate-400 text-xs mt-3">Recomendado: 300x300px</p>
        </Card>
      </div>
    </div>
  );
}
