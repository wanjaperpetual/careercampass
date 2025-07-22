import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentlyViewed = ({ recentItems, onItemClick, onClearHistory }) => {
  if (recentItems.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="Clock" size={40} className="text-muted-foreground mb-3 mx-auto" />
        <h3 className="font-semibold text-foreground mb-2">No Recent Activity</h3>
        <p className="text-muted-foreground text-sm">
          Your recently viewed resources will appear here
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recently Viewed</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          iconName="Trash2"
          iconPosition="left"
          iconSize={14}
        >
          Clear
        </Button>
      </div>

      <div className="space-y-3">
        {recentItems.slice(0, 5).map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            onClick={() => onItemClick(item)}
            className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg hover:shadow-elevation-1 cursor-pointer transition-all duration-200"
          >
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                item.type === 'video' ? 'bg-primary/10' : 'bg-secondary/10'
              }`}>
                <Icon 
                  name={item.type === 'video' ? 'Play' : 'FileText'} 
                  size={20} 
                  className={item.type === 'video' ? 'text-primary' : 'text-secondary'}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground line-clamp-1 mb-1">
                {item.title}
              </h4>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className="capitalize">{item.type}</span>
                <span>•</span>
                <span>{item.viewedAt}</span>
                {item.type === 'video' && (
                  <>
                    <span>•</span>
                    <span>{item.channel}</span>
                  </>
                )}
              </div>
            </div>

            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;