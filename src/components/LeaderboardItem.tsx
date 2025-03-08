
import { LeaderboardEntry } from '@/types';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
}

const LeaderboardItem = ({ entry, isCurrentUser = false }: LeaderboardItemProps) => {
  // Determine rank styling
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400'; // Gold
      case 2: return 'text-gray-300'; // Silver
      case 3: return 'text-amber-600'; // Bronze
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn(
      "game-card p-3 flex items-center space-x-3",
      isCurrentUser && "border-primary border-2"
    )}>
      <div className={cn(
        "font-bold text-xl w-8 text-center",
        getRankColor(entry.rank)
      )}>
        {entry.rank}
      </div>
      
      <Avatar 
        user={{ username: entry.username, avatar: entry.avatar }} 
        size="md" 
      />
      
      <div className="flex-1">
        <h3 className="font-medium">{entry.username}</h3>
      </div>
      
      <div className="text-right">
        <div className="font-bold text-lg">{entry.score}</div>
        <div className="text-xs text-muted-foreground">Points</div>
      </div>
    </div>
  );
};

export default LeaderboardItem;
