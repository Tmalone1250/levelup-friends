
import { Reward } from '@/types';

interface RewardCardProps {
  reward: Reward;
  canAfford: boolean;
  onPurchase: () => void;
}

const RewardCard = ({ reward, canAfford, onPurchase }: RewardCardProps) => {
  return (
    <div className="game-card p-4 flex flex-col">
      <div className="bg-game-dark h-32 rounded-md mb-3 overflow-hidden">
        <div className="bg-gradient-to-r from-game-primary/20 to-game-secondary/20 h-full w-full flex items-center justify-center">
          <span className="text-4xl">🎁</span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-1">{reward.name}</h3>
      <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="text-yellow-400 font-medium">{reward.cost} coins</span>
        <button
          onClick={onPurchase}
          disabled={!canAfford}
          className={`px-4 py-2 rounded text-sm font-medium ${
            canAfford
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {canAfford ? 'Purchase' : 'Not enough coins'}
        </button>
      </div>
    </div>
  );
};

export default RewardCard;
