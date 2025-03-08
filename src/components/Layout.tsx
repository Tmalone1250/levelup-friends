
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      <footer className="bg-card py-4 border-t border-border text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} LevelUp - Gamified Social Platform</p>
      </footer>
    </div>
  );
};

export default Layout;
