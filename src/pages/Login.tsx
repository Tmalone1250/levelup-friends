
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // For demo purposes, allow login with any credentials or specific demo account
      if (email === 'demo@example.com' && password === 'password') {
        await login(email, password);
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
        navigate('/');
      } else {
        // For demo, we'll let anyone log in
        await login('demo@example.com', 'password');
        toast({
          title: "Demo Mode",
          description: "Logged in with demo account",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-game-accent">LevelUp</h1>
          <p className="text-muted-foreground">Log in to your account</p>
        </div>
        
        <div className="game-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-muted/30 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-muted/30 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 font-medium disabled:opacity-70"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground mb-4">
              For demo purposes, you can use: <br />
              Email: demo@example.com <br />
              Password: password
            </p>
            <button
              onClick={() => {
                setEmail('demo@example.com');
                setPassword('password');
              }}
              className="w-full py-2 bg-muted text-muted-foreground border border-border rounded-md hover:bg-muted/70 text-sm"
            >
              Use Demo Account
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
