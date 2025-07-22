import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    // Define route mappings
    const routeMap = {
      'student-dashboard': 'Dashboard',
      'ai-career-coach-chat': 'AI Career Coach',
      'career-discovery-flow': 'Career Discovery',
      'university-finder': 'University Finder',
      'learning-resources': 'Learning Resources',
      'admin-dashboard': 'Admin Dashboard'
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeMap[segment] || segment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      breadcrumbs.push({
        label,
        path: currentPath,
        isLast: index === pathSegments.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs for simple single-level routes
  if (breadcrumbs.length <= 2 && !customBreadcrumbs) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path !== location.pathname) {
      window.location.href = path;
    }
  };

  return (
    <nav className="sticky top-16 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-3">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground mx-2" 
                />
              )}
              
              {crumb.isLast ? (
                <span className="font-medium text-foreground truncate">
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={() => handleNavigation(crumb.path)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 truncate"
                >
                  {crumb.label}
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default NavigationBreadcrumbs;