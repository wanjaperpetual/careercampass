import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 'manage-users',
      title: 'Manage Users',
      description: 'View and edit user roles',
      icon: 'Users',
      color: 'primary',
      action: () => console.log('Navigate to user management')
    },
    {
      id: 'content-moderation',
      title: 'Content Review',
      description: 'Review flagged content',
      icon: 'Shield',
      color: 'warning',
      badge: '3',
      action: () => console.log('Navigate to content moderation')
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: 'Settings',
      color: 'secondary',
      action: () => console.log('Navigate to system settings')
    },
    {
      id: 'export-data',
      title: 'Export Reports',
      description: 'Download analytics data',
      icon: 'Download',
      color: 'success',
      action: () => console.log('Export data')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
      success: "bg-success/10 text-success border-success/20 hover:bg-success/20",
      warning: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
      secondary: "bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20"
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Common administrative tasks</p>
        </div>
        <Button variant="ghost" size="icon">
          <Icon name="MoreHorizontal" size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`relative p-4 rounded-lg border transition-all duration-200 text-left hover:shadow-elevation-1 ${getColorClasses(action.color)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${getColorClasses(action.color)}`}>
                <Icon name={action.icon} size={20} />
              </div>
              {action.badge && (
                <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
                  {action.badge}
                </span>
              )}
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-1">{action.title}</h4>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
            
            <div className="absolute top-4 right-4">
              <Icon name="ArrowUpRight" size={16} className="opacity-50" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;