'use client';

import { use } from 'react';
import { ProfileHeader } from '@/components/usuario/profile-header';
import { GameStatsSection } from '@/components/usuario/game-stats-section';
import { AchievementsSection } from '@/components/usuario/achievements-section';
import { TrophiesSection } from '@/components/usuario/trophies-section';
import { FriendsSection } from '@/components/usuario/friends-section';
import { MOCK_USER_PROFILES } from '@/config/constants';
import { UserProfile } from '@/types';
import { AlertCircle } from 'lucide-react';

interface ProfilePageProps {
  params: Promise<{
    nickname: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { nickname } = use(params);

  // Get current user (in a real app, this would come from auth)
  const currentUserNickname = 'ProGamer';

  // Get the profile to display
  const profile = MOCK_USER_PROFILES[nickname as keyof typeof MOCK_USER_PROFILES] as UserProfile | undefined;

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Perfil no encontrado</h1>
          <p className="text-slate-400">El usuario "{nickname}" no existe</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = nickname === currentUserNickname;

  return (
    <div className="space-y-8">
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GameStatsSection gameStats={profile.gameStats} />
          <AchievementsSection achievements={profile.achievements} />
          <TrophiesSection trophies={profile.trophies} />
        </div>

        <div>
          <FriendsSection friends={profile.friends} isOwnProfile={isOwnProfile} />
        </div>
      </div>
    </div>
  );
}
