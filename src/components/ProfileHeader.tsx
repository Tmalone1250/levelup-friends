
import { User } from '@/types';
import Avatar from './Avatar';
import { useEffect, useState } from 'react';

interface ProfileHeaderProps {
  user: User;
  isCurrentUser?: boolean;
  onAddFriend?: () => void;
  isFriend?: boolean;
}

const ProfileHeader = ({ 
  user, 
  isCurrentUser = false, 
  onAddFriend,
  isFriend = false
}: ProfileHeaderProps) => {
  const [xpPercentage, setXpPercentage] = useState(0);

  // Calculate XP percentage needed for next level
  useEffect(() => {
    const baseXp = 1000; // Base XP needed for level 1
    const xpPerLevel = user.level * baseXp;
    const currentLevelXp = (user.level - 1) * baseXp;
    const nextLevelXp = user.level * baseXp;
    const xpInCurrentLevel = user.xp - currentLevelXp;
    const percentage = Math.min(100, (xpInCurrentLevel / (nextLevelXp - currentLevelXp)) * 100);
    setXpPercentage(Math.floor(percentage));
  }, [user.level, user.xp]);

  return (
    <div className="game-card relative p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar user={user} size="xl" showStatus />
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-muted-foreground mb-4">{user.bio}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-muted/20 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground">Level</div>
              <div className="text-xl font-bold">{user.level}</div>
            </div>
            <div className="bg-muted/20 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground">XP</div>
              <div className="text-xl font-bold">{user.xp}</div>
            </div>
            <div className="bg-muted/20 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground">Coins</div>
              <div className="text-xl font-bold text-yellow-400">{user.coins}</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Level {user.level + 1}</span>
              <span>{xpPercentage}%</span>
            </div>
            <div className="game-progress-bar">
              <div 
                className="game-progress-bar-fill" 
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>
        
        {!isCurrentUser && (
          <div className="absolute top-4 right-4">
            <button
              onClick={onAddFriend}
              disabled={isFriend}
              className={`px-4 py-2 rounded text-white text-sm ${
                isFriend 
                  ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {isFriend ? 'Friends' : 'Add Friend'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
