import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatHeader = ({ onBack, onMenuToggle, onClearChat, messageCount = 0 }) => {
  return (
    <div className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Bot" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">AI Career Coach</h1>
              <p className="text-xs text-muted-foreground">
                {messageCount > 0 ? `${messageCount} messages` : 'Ready to help with your career journey'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearChat}
            disabled={messageCount === 0}
            title="Clear conversation"
          >
            <Icon name="RotateCcw" size={18} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Icon name="MoreVertical" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;