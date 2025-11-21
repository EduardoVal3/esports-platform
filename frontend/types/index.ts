// Types for the eSports platform

export interface Tournament {
  id: string;
  name: string;
  game: string;
  prizePool: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'live' | 'finished';
  participants: number;
  maxParticipants: number;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  members: number;
  wins: number;
  losses: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
}

export interface UserProfile {
  id: string;
  nickname: string;
  avatar?: string;
  bio?: string;
  level: number;
  totalXP: number;
  balance: number;
  totalEarnings: number;
  joinDate: string;
  gameStats: GameStats[];
  achievements: Achievement[];
  trophies: Trophy[];
  friends: UserPreview[];
}

export interface UserPreview {
  id: string;
  nickname: string;
  avatar?: string;
  level: number;
}

export interface GameStats {
  id: string;
  game: string;
  wins: number;
  losses: number;
  winRate: number;
  totalMatches: number;
  bestRank?: string;
  currentRank?: string;
  totalHours: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedDate: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Trophy {
  id: string;
  title: string;
  tournament: string;
  date: string;
  placement: number;
  prizeAmount: number;
}

export interface Game {
  id: string;
  name: string;
  icon: string;
  tournaments: number;
}

export interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  savings?: number;
  highlighted?: boolean;
}

export interface MembershipTier {
  id: string;
  name: string;
  duration: number;
  durationUnit: 'month' | 'months';
  price: number;
  originalPrice?: number;
  savings?: number;
  benefits: string[];
  highlighted?: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'profile' | 'stats' | 'support';
}

// Types for creation of tournaments
export interface GameWithDetails {
  id: string;
  name: string;
  icon: string;
  tournaments: number;
  platforms: string[];
  gameModes: string[];
}

export interface TournamentFormData {
  // Stage 1: Basic Info
  title: string;
  description: string;
  registrationStart: string;
  registrationEnd: string;
  tournamentStart: string;

  // Stage 2: Tournament Details
  gameId: string;
  platform: string;
  gameMode: string;
  region: string;
  tournamentType: string;
  bestOf: number;
  format: string;
  isClosed: boolean;
  rulesType: 'basic' | 'custom';
  customRules: string;
  allowPC: boolean;
  requireStream: boolean;
  requireWebcam: boolean;
  inputType: string;
  maxParticipants: number;

  // Stage 3: Prizes
  entryFee: number;
  totalPrizePool: number;
  hostCommissionPercentage: number;
  firstPlacePercentage: number;
  secondPlacePercentage: number;

  // Stage 4: Host Details
  hostContact: string;
  twitchUrl?: string;
  discordUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  xUrl?: string;
  discordServer?: string;

  // Stage 5: Graphics
  bannerImage?: File;
  thumbnailImage?: File;

  // Stage 6: Finalize
  isReady: boolean;
}
