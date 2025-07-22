import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'BarChart3',
      tooltip: 'Analytics & Overview'
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileOpen(false);
  };

  const Logo = () => (
    <div className="flex items-center space-x-3 px-6 py-4 border-b border-border">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon name="Compass" size={20} color="white" />
      </div>
      {!isCollapsed && (
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-foreground truncate">CareerCompass</h1>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
      )}
    </div>
  );

  const NavigationItems = () => (
    <nav className="flex-1 px-4 py-6 space-y-2">
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`nav-item w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:text-primary hover:bg-muted/50'
            }`}
            title={isCollapsed ? item.tooltip : ''}
          >
            <Icon 
              name={item.icon} 
              size={20} 
              className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : ''}`}
            />
            {!isCollapsed && (
              <span className={`font-medium truncate ${
                isActive ? 'text-primary-foreground' : ''
              }`}>
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  const CollapseToggle = () => (
    <div className="px-4 py-4 border-t border-border">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full"
      >
        <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
      </Button>
    </div>
  );

  // Mobile Overlay
  const MobileOverlay = () => (
    <div 
      className={`fixed inset-0 z-200 bg-black/50 transition-opacity duration-300 md:hidden ${
        isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setIsMobileOpen(false)}
    />
  );

  // Mobile Toggle Button
  const MobileToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsMobileOpen(true)}
      className="fixed top-4 left-4 z-300 md:hidden bg-card shadow-elevation-2"
    >
      <Icon name="Menu" size={20} />
    </Button>
  );

  return (
    <>
      <MobileToggle />
      <MobileOverlay />
      
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex fixed left-0 top-0 h-full bg-card border-r border-border z-200 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        <div className="flex flex-col w-full">
          <Logo />
          <NavigationItems />
          <CollapseToggle />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-300 transform transition-transform duration-300 md:hidden ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Compass" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">CareerCompass</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          <NavigationItems />
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;