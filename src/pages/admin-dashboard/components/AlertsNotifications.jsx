import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsNotifications = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'High API Usage Detected',
      message: 'AI service usage has exceeded 90% of daily quota. Consider upgrading plan.',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Deployment',
      message: 'University matching algorithm v2.1 has been successfully deployed.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily database backup completed successfully at 02:00 AM.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'error',
      title: 'Failed Login Attempts',
      message: '5 failed login attempts detected from IP 192.168.1.100. Account temporarily locked.',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      isRead: false,
      priority: 'high'
    }
  ]);

  const getAlertIcon = (type) => {
    const icons = {
      warning: 'AlertTriangle',
      info: 'Info',
      success: 'CheckCircle',
      error: 'XCircle'
    };
    return icons[type] || icons.info;
  };

  const getAlertColor = (type) => {
    const colors = {
      warning: 'text-warning bg-warning/10 border-warning/20',
      info: 'text-primary bg-primary/10 border-primary/20',
      success: 'text-success bg-success/10 border-success/20',
      error: 'text-error bg-error/10 border-error/20'
    };
    return colors[type] || colors.info;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-secondary text-secondary-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-muted text-muted-foreground'
    };
    return colors[priority] || colors.low;
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

  const markAsRead = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">System Alerts</h3>
          {unreadCount > 0 && (
            <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Settings
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="MoreHorizontal" size={20} />
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-lg border transition-all duration-200 ${
              alert.isRead ? 'bg-muted/30' : 'bg-card hover:shadow-elevation-1'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg flex-shrink-0 ${getAlertColor(alert.type)}`}>
                <Icon name={getAlertIcon(alert.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className={`font-medium ${alert.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {alert.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(alert.priority)}`}>
                      {alert.priority}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatTimestamp(alert.timestamp)}
                  </span>
                </div>
                
                <p className={`text-sm mb-3 ${alert.isRead ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  {alert.message}
                </p>
                
                <div className="flex items-center space-x-2">
                  {!alert.isRead && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => markAsRead(alert.id)}
                    >
                      <Icon name="Check" size={14} className="mr-1" />
                      Mark as Read
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                  >
                    <Icon name="X" size={14} className="mr-1" />
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No alerts at this time</p>
          <p className="text-sm text-muted-foreground mt-1">System is running smoothly</p>
        </div>
      )}
    </div>
  );
};

export default AlertsNotifications;