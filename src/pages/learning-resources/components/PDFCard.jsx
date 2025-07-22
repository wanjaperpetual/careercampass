import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PDFCard = ({ pdf, onDownload, onPreview, onBookmark, isBookmarked }) => {
  const formatFileSize = (bytes) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    } else if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${bytes} bytes`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-elevation-1 transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={24} className="text-secondary" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
            {pdf.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {pdf.description}
          </p>

          <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="File" size={12} />
              <span>{formatFileSize(pdf.size)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={12} />
              <span>{pdf.downloads} downloads</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{pdf.uploadedAt}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => onDownload(pdf)}
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Download
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPreview(pdf)}
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
            >
              Preview
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onBookmark(pdf.id)}
              className={`h-8 w-8 ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFCard;