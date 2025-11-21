'use client';

import { Achievement } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const rarityColors = {
  common: 'bg-slate-700 border-slate-600',
  rare: 'bg-blue-700/50 border-blue-600',
  epic: 'bg-purple-700/50 border-purple-600',
  legendary: 'bg-yellow-700/50 border-yellow-600',
};

const rarityLabels = {
  common: 'Común',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Legendario',
};

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Award className="w-6 h-6" />
        Logros ({achievements.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`${rarityColors[achievement.rarity]} border-2`}
          >
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="text-4xl flex-shrink-0">{achievement.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white">{achievement.name}</h3>
                  <p className="text-slate-300 text-sm mt-1">{achievement.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-400">
                      {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      achievement.rarity === 'common' ? 'text-slate-300' :
                      achievement.rarity === 'rare' ? 'text-blue-300' :
                      achievement.rarity === 'epic' ? 'text-purple-300' :
                      'text-yellow-300'
                    }`}>
                      {rarityLabels[achievement.rarity]}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
