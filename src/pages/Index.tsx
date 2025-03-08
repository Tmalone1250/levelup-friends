
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import ProfileHeader from '@/components/ProfileHeader';
import ChallengeCard from '@/components/ChallengeCard';
import LeaderboardItem from '@/components/LeaderboardItem';
import FriendListItem from '@/components/FriendListItem';
import { Challenge, Friend, LeaderboardEntry, UserChallenge } from '@/types';
import { api } from '@/lib/mockApi';

const Dashboard = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<UserChallenge[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const [userChallenges, userFriends, leaderboardData] = await Promise.all([
          api.getUserChallenges(user.id),
          api.getFriends(user.id),
          api.getLeaderboard()
        ]);
        
        setChallenges(userChallenges);
        setFriends(userFriends);
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to LevelUp</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Join our gamified social platform for gamers! Connect with friends, complete challenges, and earn rewards.
          </p>
          <div className="flex gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-card border border-border text-foreground rounded-md hover:bg-muted/30 font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProfileHeader user={user} isCurrentUser />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Challenges</h2>
              <Link to="/challenges" className="text-primary text-sm">
                View All
              </Link>
            </div>
            
            {loading ? (
              <div className="text-center py-10">Loading challenges...</div>
            ) : challenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.slice(0, 2).map(userChallenge => (
                  <ChallengeCard 
                    key={userChallenge.id}
                    challenge={userChallenge.challenge!}
                    progress={userChallenge.progress}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-card rounded-lg">
                <p className="text-muted-foreground mb-4">You haven't started any challenges yet</p>
                <Link
                  to="/challenges"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Browse Challenges
                </Link>
              </div>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Leaderboard</h2>
              <Link to="/leaderboard" className="text-primary text-sm">
                View All
              </Link>
            </div>
            
            {loading ? (
              <div className="text-center py-10">Loading leaderboard...</div>
            ) : (
              <div className="space-y-3">
                {leaderboard.slice(0, 3).map(entry => (
                  <LeaderboardItem 
                    key={entry.userId}
                    entry={entry}
                    isCurrentUser={entry.userId === user.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4">Friends</h2>
            
            {loading ? (
              <div className="text-center py-10">Loading friends...</div>
            ) : friends.length > 0 ? (
              <div className="space-y-3">
                {friends.map(friend => (
                  <FriendListItem key={friend.id} friend={friend} />
                ))}
                
                {friends.length > 3 && (
                  <Link 
                    to="/friends"
                    className="block text-center text-primary text-sm mt-4"
                  >
                    View All Friends
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-10 bg-card rounded-lg">
                <p className="text-muted-foreground mb-4">You haven't added any friends yet</p>
                <Link
                  to="/friends"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Find Friends
                </Link>
              </div>
            )}
          </div>
          
          <div className="game-card p-4 bg-gradient-to-br from-game-primary/20 to-game-secondary/20">
            <h3 className="font-bold mb-2">Daily Tip</h3>
            <p className="text-sm text-muted-foreground">
              Complete daily challenges to earn bonus coins and XP. 
              The more consistent you are, the more rewards you'll earn!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
