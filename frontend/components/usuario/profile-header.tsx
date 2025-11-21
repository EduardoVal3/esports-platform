'use client';

import { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Award, TrendingUp, Wallet, Trophy } from 'lucide-react';
import Link from 'next/link';

interface ProfileHeaderProps {
  profile: UserProfile;
  isOwnProfile: boolean;
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-700/50 rounded-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={profile.avatar || "/placeholder.svg"}
            alt={profile.nickname}
            className="w-32 h-32 rounded-lg border-2 border-purple-500 object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white">{profile.nickname}</h1>
              <p className="text-slate-400 mt-1">Nivel {profile.level}</p>
            </div>
            {isOwnProfile && (
              <Link href="/usuario/configuracion">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Editar Perfil
                </Button>
              </Link>
            )}
            {!isOwnProfile && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                Agregar Amigo
              </Button>
            )}
          </div>

          {profile.bio && (
            <p className="text-slate-300 mb-4">{profile.bio}</p>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 rounded p-3">
              <p className="text-slate-400 text-sm">XP Total</p>
              <p className="text-white font-bold text-xl">{profile.totalXP.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800/50 rounded p-3">
              <p className="text-slate-400 text-sm">Saldo</p>
              <p className="text-green-400 font-bold text-xl">${profile.balance.toFixed(2)}</p>
            </div>
            <div className="bg-slate-800/50 rounded p-3">
              <p className="text-slate-400 text-sm">Ganancias Totales</p>
              <p className="text-yellow-400 font-bold text-xl">${profile.totalEarnings.toFixed(2)}</p>
            </div>
            <div className="bg-slate-800/50 rounded p-3">
              <p className="text-slate-400 text-sm">Miembro desde</p>
              <p className="text-white font-bold text-sm">{new Date(profile.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
