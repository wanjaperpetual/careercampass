import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'registration',
      user: 'Sarah Wanjiku',
      action: 'registered as a new student',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      icon: 'UserPlus',
      color: 'success'
    },
    {
      id: 2,
      type: 'chat',
      user: 'Michael Ochieng',
      action: 'started a career coaching session',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      icon: 'MessageCircle',
      color: 'primary'
    },
    {
      id: 3,
      type: 'resource',
      user: 'Grace Muthoni',
      action: 'downloaded Engineering career guide PDF',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'Download',
      color: 'accent'
    },
    {
      id: 4,
      type: 'university',
      user: 'David Kiprop',
      action: 'searched for Computer Science programs',
      timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
      icon: 'GraduationCap',
      color: 'secondary'
    },
    {
      id: 5,
      type: 'registration',
      user: 'Faith Akinyi',
      action: 'completed career discovery assessment',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'Compass',
      color: 'warning'
    },
    {
      id: 6,
      type: 'chat',
      user: 'John Kamau',
      action: 'received AI career recommendations',
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      icon: 'Bot',
      color: 'primary'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activity', count: activities.length },
    { value: 'registration', label: 'Registrations', count: activities.filter(a => a.type === 'registration').length },
    { value: 'chat', label: 'Chat Sessions', count: activities.filter(a => a.type === 'chat').length },
    { value: 'resource', label: 'Resources', count: activities.filter(a => a.type === 'resource').length }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const getColorClasses = (color) => {
    const colors = {
      primary: "bg-primary/10 text-primary",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      secondary: "bg-secondary/10 text-secondary",
      accent: "bg-accent/10 text-accent"
    };
    return colors[color] || colors.primary;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest user interactions and system events</p>
        </div>
        <Button variant="ghost" size="icon">
          <Icon name="RefreshCw" size={20} />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={filter === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(option.value)}
            className="text-xs"
          >
            {option.label}
            <span className="ml-2 px-1.5 py-0.5 bg-muted rounded-full text-xs">
              {option.count}
            </span>
          </Button>
        ))}
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`p-2 rounded-lg flex-shrink-0 ${getColorClasses(activity.color)}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-muted-foreground ml-1">{activity.action}</span>
                </p>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No recent activity found</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;