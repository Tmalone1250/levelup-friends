
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Avatar from './Avatar';
import { Home, Users, Award, Trophy, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Friends', path: '/friends' },
    { icon: Award, label: 'Challenges', path: '/challenges' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: ShoppingCart, label: 'Rewards', path: '/rewards' },
  ];

  return (
    <nav className="bg-card border-b border-border py-2 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <h1 className="text-xl font-bold text-game-accent mr-6">LevelUp</h1>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-accent/10 text-foreground'
                    }`}
                  >
                    <item.icon size={18} className="mr-1" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center">
                <div className="flex flex-col items-end mr-3">
                  <div className="text-yellow-400 font-medium">{user.coins} coins</div>
                  <div className="text-sm text-muted-foreground">Level {user.level}</div>
                </div>
                <Avatar user={user} size="sm" />
              </div>
              <button 
                onClick={logout}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded bg-primary text-white text-sm hover:bg-primary/90"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden flex justify-between mt-2 border-t border-border pt-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center px-1 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon size={22} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
