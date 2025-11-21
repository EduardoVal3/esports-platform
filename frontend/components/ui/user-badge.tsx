'use client';

import { User } from '@/types';

interface UserBadgeProps {
  user?: User;
}

export function UserBadge({ user }: UserBadgeProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <span className="text-white font-semibold text-sm">
          {user?.username?.[0]?.toUpperCase() ?? 'U'}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-white text-sm font-medium">
          {user?.username ?? 'Usuario'}
        </span>
        <span className="text-slate-400 text-xs">
          {user?.role ?? 'member'}
        </span>
      </div>
    </div>
  );
}
