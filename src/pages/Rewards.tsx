
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import RewardCard from '@/components/RewardCard';
import { Reward } from '@/types';
import { api } from '@/lib/mockApi';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Rewards = () => {
  const { user } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);
        const data = await api.getRewards();
        setRewards(data);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  const handlePurchase = async (reward: Reward) => {
    if (!user) return;
    
    if (user.coins < reward.cost) {
      toast({
        title: "Insufficient Funds",
        description: `You need ${reward.cost - user.coins} more coins to purchase this reward`,
        variant: "destructive"
      });
      return;
    }
    
    try {
      await api.purchaseReward(user.id, reward.id);
      toast({
        title: "Reward Purchased",
        description: `You have successfully purchased ${reward.name}`
      });
      
      // Update user coins in a real app
      // For MVP, we'll just simulate it
      user.coins -= reward.cost;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase reward",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Rewards Shop</h1>
            <p className="text-muted-foreground">
              Spend your hard-earned coins on exclusive rewards
            </p>
          </div>
          
          {user && (
            <div className="bg-card p-3 rounded-lg">
              <div className="text-sm text-muted-foreground">Your Balance</div>
              <div className="text-xl font-bold text-yellow-400">{user.coins} coins</div>
            </div>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-10">Loading rewards...</div>
      ) : rewards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map(reward => (
            <RewardCard 
              key={reward.id}
              reward={reward}
              canAfford={user ? user.coins >= reward.cost : false}
              onPurchase={() => handlePurchase(reward)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-card rounded-lg">
          <p className="text-muted-foreground">No rewards available at this time</p>
        </div>
      )}
    </Layout>
  );
};

export default Rewards;
