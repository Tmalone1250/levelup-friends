
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import LeaderboardItem from '@/components/LeaderboardItem';
import { LeaderboardEntry } from '@/types';
import { api } from '@/lib/mockApi';
import { useAuth } from '@/context/AuthContext';

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await api.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">
          See how you rank against other players based on challenge completions and achievements
        </p>
      </div>
      
      {loading ? (
        <div className="text-center py-10">Loading leaderboard...</div>
      ) : leaderboard.length > 0 ? (
        <div className="space-y-4">
          {leaderboard.map(entry => (
            <LeaderboardItem 
              key={entry.userId}
              entry={entry}
              isCurrentUser={user?.id === entry.userId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-card rounded-lg">
          <p className="text-muted-foreground">Leaderboard data is not available</p>
        </div>
      )}
    </Layout>
  );
};

export default Leaderboard;
