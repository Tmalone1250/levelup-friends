
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import ChallengeCard from '@/components/ChallengeCard';
import { Challenge, UserChallenge } from '@/types';
import { api } from '@/lib/mockApi';
import { useAuth } from '@/context/AuthContext';

const Challenges = () => {
  const { user } = useAuth();
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const [challenges, userChallengesData] = await Promise.all([
          api.getChallenges(),
          api.getUserChallenges(user.id)
        ]);
        
        setAllChallenges(challenges);
        setUserChallenges(userChallengesData);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [user]);

  const filteredChallenges = () => {
    switch (activeTab) {
      case 'active':
        return userChallenges.filter(uc => !uc.completed);
      case 'completed':
        return userChallenges.filter(uc => uc.completed);
      case 'all':
      default:
        // For "all", show all challenges, but include progress if the user has started them
        return allChallenges.map(challenge => {
          const userChallenge = userChallenges.find(uc => uc.challengeId === challenge.id);
          return userChallenge 
            ? { ...userChallenge, challenge } 
            : { id: '', userId: user?.id || '', challengeId: challenge.id, progress: 0, completed: false, completedAt: null, challenge };
        });
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Challenges</h1>
        <p className="text-muted-foreground">
          Complete challenges to earn XP, coins, and climb the leaderboard
        </p>
      </div>
      
      <div className="flex border-b border-border mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'all'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Challenges
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'active'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'completed'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-10">Loading challenges...</div>
      ) : filteredChallenges().length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges().map(item => (
            <ChallengeCard 
              key={`${item.challengeId}-${item.id}`}
              challenge={item.challenge!}
              progress={item.progress}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-card rounded-lg">
          <p className="text-muted-foreground">
            {activeTab === 'completed' 
              ? "You haven't completed any challenges yet" 
              : activeTab === 'active' 
                ? "You haven't started any challenges yet" 
                : "No challenges available at the moment"}
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Challenges;
