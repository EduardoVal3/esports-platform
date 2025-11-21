'use client';

import { UserPreview } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FriendsSectionProps {
  friends: UserPreview[];
  isOwnProfile: boolean;
}

export function FriendsSection({ friends, isOwnProfile }: FriendsSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users className="w-6 h-6" />
        Amigos ({friends.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {friends.map((friend) => (
          <Card key={friend.id} className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <img
                  src={friend.avatar || "/placeholder.svg"}
                  alt={friend.nickname}
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border border-slate-600"
                />
                <h3 className="font-bold text-white mb-1">{friend.nickname}</h3>
                <p className="text-slate-400 text-sm mb-3">Nivel {friend.level}</p>
                {isOwnProfile && (
                  <Button variant="ghost" size="sm" className="w-full text-slate-300 hover:text-white">
                    Ver Perfil
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
