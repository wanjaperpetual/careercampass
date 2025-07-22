import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = () => {
  const recentActivities = [
    {
      id: 1,
      type: 'chat',
      title: 'Career Chat Session',
      description: 'Discussed software engineering career paths and required skills',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'MessageCircle',
      color: 'bg-blue-50 text-blue-600',
      actionText: 'Continue Chat',
      route: '/ai-career-coach-chat'
    },
    {
      id: 2,
      type: 'university',
      title: 'University Bookmarked',
      description: 'Saved University of Nairobi - Computer Science program',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      icon: 'Bookmark',
      color: 'bg-emerald-50 text-emerald-600',
      actionText: 'View Details',
      route: '/university-finder'
    },
    {
      id: 3,
      type: 'resource',
      title: 'Resource Viewed',
      description: 'Watched "Introduction to Data Science" video tutorial',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'Play',
      color: 'bg-amber-50 text-amber-600',
      actionText: 'View Resources',
      route: '/learning-resources'
    },
    {
      id: 4,
      type: 'assessment',
      title: 'Assessment Progress',
      description: 'Completed interests evaluation - 3 of 4 sections done',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'CheckCircle',
      color: 'bg-purple-50 text-purple-600',
      actionText: 'Continue Assessment',
      route: '/career-discovery-flow'
    },
    {
      id: 5,
      type: 'chat',
      title: 'Career Exploration',
      description: 'Explored medical field careers and education requirements',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: 'Search',
      color: 'bg-rose-50 text-rose-600',
      actionText: 'View Chat',
      route: '/ai-career-coach-chat'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const handleNavigation = (route) => {
    window.location.href = route;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <Button variant="ghost" size="sm">
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>

      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
            onClick={() => handleNavigation(activity.route)}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.color}`}>
              <Icon name={activity.icon} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {activity.title}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {activity.description}
              </p>
              
              <Button 
                variant="ghost" 
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation(activity.route);
                }}
                className="text-primary hover:text-primary/80"
              >
                {activity.actionText}
                <Icon name="ArrowRight" size={12} className="ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          fullWidth
          onClick={() => handleNavigation('/student-dashboard')}
        >
          View All Activity
          <Icon name="ExternalLink" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;