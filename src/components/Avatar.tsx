
import { cn } from "@/lib/utils";
import { User } from "@/types";

interface AvatarProps {
  user: Partial<User>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

const Avatar = ({ user, size = 'md', showStatus = false, className }: AvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  const statusSize = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
    xl: 'h-5 w-5'
  };

  const defaultAvatar = '/avatars/default.png';
  const statusClass = user.online ? 'bg-game-success' : 'bg-muted';

  return (
    <div className="relative">
      <div 
        className={cn(
          "game-avatar",
          user.online ? "game-avatar-online" : "game-avatar-offline",
          sizeClasses[size],
          className
        )}
      >
        <img 
          src={user.avatar || defaultAvatar} 
          alt={user.username || 'User'} 
          className="h-full w-full object-cover"
        />
      </div>
      
      {showStatus && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background",
            statusSize[size],
            statusClass
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
