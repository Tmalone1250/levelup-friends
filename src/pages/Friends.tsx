
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import FriendListItem from '@/components/FriendListItem';
import { Friend, User } from '@/types';
import { api } from '@/lib/mockApi';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Search } from 'lucide-react';

const Friends = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'find'>('friends');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const [userFriends, friendRequests] = await Promise.all([
          api.getFriends(user.id),
          api.getFriendRequests(user.id)
        ]);
        
        setFriends(userFriends);
        setPendingRequests(friendRequests);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user]);

  const handleSearch = async () => {
    if (!searchQuery) return;
    
    try {
      setLoading(true);
      // In a real app, this would search the API
      // For the MVP, we'll just filter the mock users
      const mockUsers = [
        { id: '2', username: 'GameMaster42', avatar: '/avatars/user2.png' },
        { id: '3', username: 'QuestHunter', avatar: '/avatars/user3.png' },
        { id: '4', username: 'PixelWarrior', avatar: '/avatars/user4.png' },
        { id: '5', username: 'StrategyKing', avatar: '/avatars/user5.png' }
      ];
      
      const results = mockUsers.filter(mockUser => 
        mockUser.username.toLowerCase().includes(searchQuery.toLowerCase())
      ) as User[];
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (friendId: string) => {
    if (!user) return;
    
    try {
      await api.sendFriendRequest(user.id, friendId);
      toast({
        title: "Friend Request Sent",
        description: "Your friend request has been sent"
      });
      
      // Update UI
      setSearchResults(prev => 
        prev.filter(result => result.id !== friendId)
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send friend request",
        variant: "destructive"
      });
    }
  };

  const handleAcceptRequest = async (friendId: string) => {
    try {
      await api.respondToFriendRequest(friendId, true);
      toast({
        title: "Friend Request Accepted",
        description: "You are now friends"
      });
      
      // Update UI
      setPendingRequests(prev => 
        prev.filter(request => request.id !== friendId)
      );
      // In a real app, we would refresh the friends list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept friend request",
        variant: "destructive"
      });
    }
  };

  const handleRejectRequest = async (friendId: string) => {
    try {
      await api.respondToFriendRequest(friendId, false);
      toast({
        title: "Friend Request Rejected",
        description: "Friend request has been rejected"
      });
      
      // Update UI
      setPendingRequests(prev => 
        prev.filter(request => request.id !== friendId)
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject friend request",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Friends</h1>
        <p className="text-muted-foreground">
          Connect with other gamers and stay updated on their achievements
        </p>
      </div>
      
      <div className="flex border-b border-border mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'friends'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('friends')}
        >
          Friends {friends.length > 0 && `(${friends.length})`}
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'requests'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('requests')}
        >
          Requests {pendingRequests.length > 0 && `(${pendingRequests.length})`}
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'find'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('find')}
        >
          Find Friends
        </button>
      </div>
      
      {activeTab === 'friends' && (
        <>
          {loading ? (
            <div className="text-center py-10">Loading friends...</div>
          ) : friends.length > 0 ? (
            <div className="space-y-4">
              {friends.map(friend => (
                <FriendListItem key={friend.id} friend={friend} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-card rounded-lg">
              <p className="text-muted-foreground mb-4">You haven't added any friends yet</p>
              <button
                onClick={() => setActiveTab('find')}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Find Friends
              </button>
            </div>
          )}
        </>
      )}
      
      {activeTab === 'requests' && (
        <>
          {loading ? (
            <div className="text-center py-10">Loading friend requests...</div>
          ) : pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.map(request => (
                <FriendListItem 
                  key={request.id} 
                  friend={request} 
                  isPending
                  onAccept={() => handleAcceptRequest(request.id)}
                  onReject={() => handleRejectRequest(request.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-card rounded-lg">
              <p className="text-muted-foreground">You don't have any pending friend requests</p>
            </div>
          )}
        </>
      )}
      
      {activeTab === 'find' && (
        <>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-2 pl-10 bg-muted/30 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search 
                className="absolute left-3 top-2.5 text-muted-foreground" 
                size={18} 
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1.5 px-3 py-1 bg-primary text-white rounded-md text-sm"
              >
                Search
              </button>
            </div>
          </div>
          
          {searchQuery && (
            <>
              {loading ? (
                <div className="text-center py-10">Searching...</div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map(result => (
                    <div key={result.id} className="game-card p-3 flex items-center space-x-3">
                      <div className="game-avatar h-12 w-12">
                        <img
                          src={result.avatar || '/avatars/default.png'}
                          alt={result.username}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium">{result.username}</h3>
                      </div>
                      
                      <button
                        onClick={() => handleAddFriend(result.id)}
                        className="px-3 py-1 bg-primary rounded text-white text-sm"
                      >
                        Add Friend
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-card rounded-lg">
                  <p className="text-muted-foreground">No users found matching "{searchQuery}"</p>
                </div>
              )}
            </>
          )}
          
          {!searchQuery && (
            <div className="text-center py-10 bg-card rounded-lg">
              <p className="text-muted-foreground">
                Search for users by username to add them as friends
              </p>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Friends;
