import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new-resource',
      title: 'New Learning Resources Added',
      message: 'Check out the latest videos on Data Science and Machine Learning careers',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
      icon: 'BookOpen',
      color: 'bg-blue-50 border-blue-200 text-blue-600',
      actionText: 'View Resources',
      route: '/learning-resources'
    },
    {
      id: 2,
      type: 'university-update',
      title: 'University Application Deadlines',
      message: 'Reminder: University of Nairobi applications close in 2 weeks',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      icon: 'Calendar',
      color: 'bg-amber-50 border-amber-200 text-amber-600',
      actionText: 'Check Deadlines',
      route: '/university-finder'
    },
    {
      id: 3,
      type: 'assessment-reminder',
      title: 'Complete Your Career Assessment',
      message: 'You\'re 75% done! Finish your assessment to get personalized recommendations',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isRead: true,
      icon: 'Target',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-600',
      actionText: 'Continue Assessment',
      route: '/career-discovery-flow'
    },
    {
      id: 4,
      type: 'platform-update',
      title: 'Platform Enhancement',
      message: 'New AI chat features now available for better career guidance',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      icon: 'Sparkles',
      color: 'bg-purple-50 border-purple-200 text-purple-600',
      actionText: 'Try New Features',
      route: '/ai-career-coach-chat'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d ago`;
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleNavigation = (route, notificationId) => {
    handleMarkAsRead(notificationId);
    window.location.href = route;
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleMarkAllAsRead}
          >
            Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`relative p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-elevation-1 ${
              notification.isRead 
                ? 'bg-muted/30 border-border' 
                : `${notification.color} hover:shadow-elevation-2`
            }`}
            onClick={() => handleNavigation(notification.route, notification.id)}
          >
            {!notification.isRead && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></div>
            )}
            
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                notification.isRead ? 'bg-muted text-muted-foreground' : 'bg-white'
              }`}>
                <Icon name={notification.icon} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-medium ${
                    notification.isRead ? 'text-muted-foreground' : 'text-foreground'
                  }`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                </div>
                
                <p className={`text-sm mb-2 ${
                  notification.isRead ? 'text-muted-foreground' : 'text-foreground/80'
                }`}>
                  {notification.message}
                </p>
                
                <Button 
                  variant="ghost" 
                  size="xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(notification.route, notification.id);
                  }}
                  className={notification.isRead ? 'text-muted-foreground' : 'text-primary'}
                >
                  {notification.actionText}
                  <Icon name="ArrowRight" size={12} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;