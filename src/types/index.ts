
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  bio: string;
  createdAt: string;
  online: boolean;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  user?: User;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  coinReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  endDate: string;
  imageUrl: string;
  completedBy: number;
}

export interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  progress: number;
  completed: boolean;
  completedAt: string | null;
  challenge?: Challenge;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  cost: number;
  type: 'avatar' | 'badge' | 'theme';
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
}
