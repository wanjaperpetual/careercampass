import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const StudentBottomTabs = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/student-dashboard',
      icon: 'Home',
      tooltip: 'Your personal dashboard'
    },
    {
      label: 'Chat',
      path: '/ai-career-coach-chat',
      icon: 'MessageCircle',
      tooltip: 'AI Career Coach'
    },
    {
      label: 'Discover',
      path: '/career-discovery-flow',
      icon: 'Compass',
      tooltip: 'Career Discovery'
    },
    {
      label: 'Universities',
      path: '/university-finder',
      icon: 'GraduationCap',
      tooltip: 'Find Universities'
    },
    {
      label: 'Resources',
      path: '/learning-resources',
      icon: 'BookOpen',
      tooltip: 'Learning Resources'
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border safe-area-bottom md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`nav-item flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
              }`}
              title={item.tooltip}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className={`mb-1 ${isActive ? 'text-primary-foreground' : ''}`}
              />
              <span className={`text-xs font-medium truncate ${
                isActive ? 'text-primary-foreground' : ''
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default StudentBottomTabs;