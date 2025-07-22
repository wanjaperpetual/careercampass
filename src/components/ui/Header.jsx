import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Compass" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">CareerCompass</span>
    </div>
  );

  const StudentNavigation = () => (
    <nav className="hidden md:flex items-center space-x-8">
      <a 
        href="/student-dashboard" 
        className={`nav-item px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          location.pathname === '/student-dashboard' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
        }`}
      >
        Dashboard
      </a>
      <a 
        href="/ai-career-coach-chat" 
        className={`nav-item px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          location.pathname === '/ai-career-coach-chat' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
        }`}
      >
        Chat
      </a>
      <a 
        href="/career-discovery-flow" 
        className={`nav-item px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          location.pathname === '/career-discovery-flow' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
        }`}
      >
        Discover
      </a>
      <a 
        href="/university-finder" 
        className={`nav-item px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          location.pathname === '/university-finder' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
        }`}
      >
        Universities
      </a>
      <a 
        href="/learning-resources" 
        className={`nav-item px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          location.pathname === '/learning-resources' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
        }`}
      >
        Resources
      </a>
    </nav>
  );

  const AdminNavigation = () => (
    <nav className="hidden md:flex items-center space-x-8">
      <a 
        href="/admin-dashboard" 
        className={`nav-item px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          location.pathname === '/admin-dashboard' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
        }`}
      >
        Dashboard
      </a>
    </nav>
  );

  const UserActions = () => (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="icon" className="relative">
        <Icon name="Bell" size={20} />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full"></span>
      </Button>
      <Button variant="ghost" size="icon">
        <Icon name="User" size={20} />
      </Button>
    </div>
  );

  const MobileMenu = () => (
    <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
      <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
        {isAdminRoute ? (
          <a 
            href="/admin-dashboard" 
            className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
              location.pathname === '/admin-dashboard' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
            }`}
          >
            Dashboard
          </a>
        ) : (
          <>
            <a 
              href="/student-dashboard" 
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                location.pathname === '/student-dashboard' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
              }`}
            >
              Dashboard
            </a>
            <a 
              href="/ai-career-coach-chat" 
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                location.pathname === '/ai-career-coach-chat' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
              }`}
            >
              Chat
            </a>
            <a 
              href="/career-discovery-flow" 
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                location.pathname === '/career-discovery-flow' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
              }`}
            >
              Discover
            </a>
            <a 
              href="/university-finder" 
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                location.pathname === '/university-finder' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
              }`}
            >
              Universities
            </a>
            <a 
              href="/learning-resources" 
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                location.pathname === '/learning-resources' ?'bg-primary text-primary-foreground' :'text-foreground hover:text-primary hover:bg-muted/50'
              }`}
            >
              Resources
            </a>
          </>
        )}
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          {isAdminRoute ? <AdminNavigation /> : <StudentNavigation />}
          
          <div className="flex items-center space-x-4">
            <UserActions />
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      <MobileMenu />
    </header>
  );
};

export default Header;