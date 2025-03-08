
import { User, Friend, Challenge, UserChallenge, Reward, LeaderboardEntry } from '@/types';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'GamerPro123',
    email: 'gamer@example.com',
    avatar: '/avatars/default.png',
    level: 5,
    xp: 2500,
    coins: 750,
    bio: 'Passionate gamer who loves FPS and RPG games!',
    createdAt: new Date().toISOString(),
    online: true
  },
  {
    id: '2',
    username: 'GameMaster42',
    email: 'master@example.com',
    avatar: '/avatars/user2.png',
    level: 8,
    xp: 4200,
    coins: 1200,
    bio: 'Strategy game enthusiast. Always planning my next move.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    online: false
  },
  {
    id: '3',
    username: 'QuestHunter',
    email: 'quest@example.com',
    avatar: '/avatars/user3.png',
    level: 6,
    xp: 3100,
    coins: 830,
    bio: 'RPG lover. Always on a quest for the next adventure!',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    online: true
  },
  {
    id: '4',
    username: 'PixelWarrior',
    email: 'pixel@example.com',
    avatar: '/avatars/user4.png',
    level: 4,
    xp: 1800,
    coins: 500,
    bio: 'Indie games are my passion. Pixel art forever!',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    online: false
  },
  {
    id: '5',
    username: 'StrategyKing',
    email: 'strategy@example.com',
    avatar: '/avatars/user5.png',
    level: 7,
    xp: 3600,
    coins: 920,
    bio: 'Chess, MOBA, RTS - if it requires strategy, I'm in!',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    online: true
  }
];

const mockFriends: Friend[] = [
  {
    id: '1',
    userId: '1',
    friendId: '2',
    status: 'accepted',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    userId: '1',
    friendId: '3',
    status: 'accepted',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    userId: '1',
    friendId: '4',
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'First Victory',
    description: 'Win your first match in any game',
    xpReward: 100,
    coinReward: 50,
    difficulty: 'easy',
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: '/challenges/first-win.png',
    completedBy: 245
  },
  {
    id: '2',
    title: 'Social Butterfly',
    description: 'Add 5 friends to your network',
    xpReward: 200,
    coinReward: 100,
    difficulty: 'easy',
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: '/challenges/social.png',
    completedBy: 183
  },
  {
    id: '3',
    title: 'Winning Streak',
    description: 'Win 3 matches in a row in any competitive game',
    xpReward: 300,
    coinReward: 150,
    difficulty: 'medium',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: '/challenges/streak.png',
    completedBy: 92
  },
  {
    id: '4',
    title: 'Achievement Hunter',
    description: 'Unlock 10 achievements in any game',
    xpReward: 400,
    coinReward: 200,
    difficulty: 'medium',
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: '/challenges/achievements.png',
    completedBy: 67
  },
  {
    id: '5',
    title: 'Legendary Player',
    description: 'Reach the top rank in any competitive game',
    xpReward: 1000,
    coinReward: 500,
    difficulty: 'hard',
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: '/challenges/legendary.png',
    completedBy: 12
  }
];

const mockUserChallenges: UserChallenge[] = [
  {
    id: '1',
    userId: '1',
    challengeId: '1',
    progress: 100,
    completed: true,
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    userId: '1',
    challengeId: '2',
    progress: 60,
    completed: false,
    completedAt: null,
  },
  {
    id: '3',
    userId: '1',
    challengeId: '3',
    progress: 33,
    completed: false,
    completedAt: null,
  }
];

const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Golden Sword Avatar',
    description: 'Show off your warrior spirit with this golden sword avatar',
    imageUrl: '/rewards/golden-sword.png',
    cost: 500,
    type: 'avatar'
  },
  {
    id: '2',
    name: 'Dragon Slayer Badge',
    description: 'A badge of honor for those who have conquered dragons',
    imageUrl: '/rewards/dragon-badge.png',
    cost: 300,
    type: 'badge'
  },
  {
    id: '3',
    name: 'Neon Theme',
    description: 'Light up your profile with this vibrant neon theme',
    imageUrl: '/rewards/neon-theme.png',
    cost: 800,
    type: 'theme'
  },
  {
    id: '4',
    name: 'Mystery Box',
    description: 'Contains a random reward. What will you get?',
    imageUrl: '/rewards/mystery-box.png',
    cost: 1000,
    type: 'avatar'
  },
  {
    id: '5',
    name: 'Champion Crown',
    description: 'A crown fit for a gaming champion',
    imageUrl: '/rewards/crown.png',
    cost: 1500,
    type: 'avatar'
  }
];

const mockLeaderboard: LeaderboardEntry[] = [
  { userId: '5', username: 'StrategyKing', avatar: '/avatars/user5.png', score: 8700, rank: 1 },
  { userId: '2', username: 'GameMaster42', avatar: '/avatars/user2.png', score: 7400, rank: 2 },
  { userId: '3', username: 'QuestHunter', avatar: '/avatars/user3.png', score: 6100, rank: 3 },
  { userId: '1', username: 'GamerPro123', avatar: '/avatars/default.png', score: 5400, rank: 4 },
  { userId: '4', username: 'PixelWarrior', avatar: '/avatars/user4.png', score: 3900, rank: 5 }
];

// Mock API functions
export const api = {
  // User related
  getCurrentUser: async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers[0];
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers.find(user => user.id === id);
  },

  updateUserProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) throw new Error('User not found');
    
    const updatedUser = { ...mockUsers[userIndex], ...data };
    return updatedUser;
  },

  // Friends related
  getFriends: async (userId: string): Promise<Friend[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockFriends
      .filter(friend => friend.userId === userId && friend.status === 'accepted')
      .map(friend => {
        const friendUser = mockUsers.find(user => user.id === friend.friendId);
        return { ...friend, user: friendUser };
      });
  },

  getFriendRequests: async (userId: string): Promise<Friend[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockFriends
      .filter(friend => friend.userId === userId && friend.status === 'pending')
      .map(friend => {
        const friendUser = mockUsers.find(user => user.id === friend.friendId);
        return { ...friend, user: friendUser };
      });
  },

  sendFriendRequest: async (userId: string, friendId: string): Promise<Friend> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newFriend: Friend = {
      id: Math.random().toString(36).substring(2, 9),
      userId,
      friendId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    return newFriend;
  },

  respondToFriendRequest: async (friendId: string, accept: boolean): Promise<Friend> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const friendIndex = mockFriends.findIndex(friend => friend.id === friendId);
    if (friendIndex === -1) throw new Error('Friend request not found');
    
    const updatedFriend = { 
      ...mockFriends[friendIndex], 
      status: accept ? 'accepted' as const : 'rejected' as const 
    };
    return updatedFriend;
  },

  // Challenges related
  getChallenges: async (): Promise<Challenge[]> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockChallenges;
  },

  getUserChallenges: async (userId: string): Promise<UserChallenge[]> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockUserChallenges
      .filter(challenge => challenge.userId === userId)
      .map(userChallenge => {
        const challenge = mockChallenges.find(c => c.id === userChallenge.challengeId);
        return { ...userChallenge, challenge };
      });
  },

  updateChallengeProgress: async (
    userChallengeId: string, 
    progress: number
  ): Promise<UserChallenge> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const challengeIndex = mockUserChallenges.findIndex(
      challenge => challenge.id === userChallengeId
    );
    if (challengeIndex === -1) throw new Error('Challenge not found');
    
    const isCompleted = progress >= 100;
    const updatedChallenge = { 
      ...mockUserChallenges[challengeIndex], 
      progress, 
      completed: isCompleted,
      completedAt: isCompleted ? new Date().toISOString() : null
    };
    return updatedChallenge;
  },

  // Rewards related
  getRewards: async (): Promise<Reward[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockRewards;
  },

  purchaseReward: async (userId: string, rewardId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    // In a real app, this would deduct coins and add the reward to the user's inventory
    return true;
  },

  // Leaderboard related
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockLeaderboard;
  }
};
