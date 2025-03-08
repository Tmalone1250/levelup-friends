
import { Friend, User } from '@/types';
import Avatar from './Avatar';
import Badge from './Badge';

interface FriendListItemProps {
  friend: Friend & { user?: User };
  onAccept?: () => void;
  onReject?: () => void;
  isPending?: boolean;
}

const FriendListItem = ({ friend, onAccept, onReject, isPending = false }: FriendListItemProps) => {
  if (!friend.user) return null;

  return (
    <div className="game-card p-3 flex items-center space-x-3">
      <Avatar user={friend.user} showStatus size="md" />
      
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="font-medium">{friend.user.username}</h3>
          {friend.user.online && (
            <Badge label="Online" variant="success" className="ml-2" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">Level {friend.user.level}</p>
      </div>
      
      {isPending ? (
        <div className="flex space-x-2">
          <button
            onClick={onAccept}
            className="px-3 py-1 bg-game-success rounded text-white text-sm"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="px-3 py-1 bg-game-error rounded text-white text-sm"
          >
            Reject
          </button>
        </div>
      ) : (
        <button className="px-3 py-1 bg-primary rounded text-white text-sm">
          Message
        </button>
      )}
    </div>
  );
};

export default FriendListItem;
