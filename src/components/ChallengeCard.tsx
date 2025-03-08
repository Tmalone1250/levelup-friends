
import { Challenge } from '@/types';
import Badge from './Badge';

interface ChallengeCardProps {
  challenge: Challenge;
  progress?: number;
  onClick?: () => void;
}

const ChallengeCard = ({ challenge, progress = 0, onClick }: ChallengeCardProps) => {
  const difficultyVariant = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger'
  } as const;

  const daysLeft = Math.ceil(
    (new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div 
      className="game-card p-4 flex flex-col h-full cursor-pointer hover:translate-y-[-2px] transition-all"
      onClick={onClick}
    >
      <div className="relative">
        {/* Placeholder for challenge image */}
        <div className="bg-game-dark h-40 rounded-md mb-3 overflow-hidden">
          <div className="bg-gradient-to-r from-game-primary/20 to-game-secondary/20 h-full w-full flex items-center justify-center">
            <span className="text-4xl">🏆</span>
          </div>
        </div>
        
        <div className="absolute top-2 right-2">
          <Badge 
            label={challenge.difficulty} 
            variant={difficultyVariant[challenge.difficulty]} 
          />
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
      
      <div className="mt-auto">
        {progress > 0 && (
          <div className="mb-2">
            <div className="game-progress-bar">
              <div 
                className="game-progress-bar-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-right mt-1">{progress}% complete</p>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-game-accent">+{challenge.xpReward} XP</span>
            <span className="text-sm font-medium text-yellow-400">+{challenge.coinReward} coins</span>
          </div>
          <span className="text-sm text-muted-foreground">{daysLeft} days left</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
