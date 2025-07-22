import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onAction, lastMessage = null }) => {
  const actions = [
    {
      id: 'save',
      label: 'Save Advice',
      icon: 'Bookmark',
      variant: 'outline',
      disabled: !lastMessage || lastMessage.isUser
    },
    {
      id: 'universities',
      label: 'Find Universities',
      icon: 'GraduationCap',
      variant: 'outline',
      disabled: false
    },
    {
      id: 'resources',
      label: 'Learning Resources',
      icon: 'BookOpen',
      variant: 'outline',
      disabled: false
    },
    {
      id: 'share',
      label: 'Share Chat',
      icon: 'Share2',
      variant: 'ghost',
      disabled: !lastMessage
    }
  ];

  const handleAction = (actionId) => {
    switch (actionId) {
      case 'save': onAction('save', lastMessage);
        break;
      case 'universities':
        window.location.href = '/university-finder';
        break;
      case 'resources':
        window.location.href = '/learning-resources';
        break;
      case 'share': onAction('share', lastMessage);
        break;
      default:
        break;
    }
  };

  return (
    <div className="border-t border-border bg-muted/30 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={16} className="text-accent" />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            size="sm"
            disabled={action.disabled}
            onClick={() => handleAction(action.id)}
            className="justify-start h-auto p-3"
          >
            <Icon name={action.icon} size={16} className="mr-2" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-xs text-muted-foreground">
          💡 Save important advice or explore universities based on our conversation
        </p>
      </div>
    </div>
  );
};

export default QuickActions;