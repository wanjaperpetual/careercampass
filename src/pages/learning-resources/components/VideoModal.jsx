import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoModal = ({ video, isOpen, onClose, relatedVideos = [] }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !video) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-200 bg-black/80 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground line-clamp-1">
            {video.title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4">
          <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
            <div className="text-center">
              <Icon name="Play" size={48} className="text-primary mb-2" />
              <p className="text-muted-foreground">Video Player Placeholder</p>
              <p className="text-sm text-muted-foreground">
                In production, integrate with YouTube API
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <h3 className="font-semibold text-foreground mb-2">{video.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <span>{video.channel}</span>
                <span>{video.views >= 1000000 ? `${(video.views / 1000000).toFixed(1)}M` : `${(video.views / 1000).toFixed(1)}K`} views</span>
                <span>{video.publishedAt}</span>
              </div>
              <p className="text-muted-foreground">
                {video.description || "This video provides comprehensive insights into career development and educational pathways relevant to Kenyan students."}
              </p>
            </div>

            {relatedVideos.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-3">Related Videos</h4>
                <div className="space-y-3">
                  {relatedVideos.slice(0, 3).map((relatedVideo) => (
                    <div key={relatedVideo.id} className="flex space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
                      <div className="w-20 h-12 bg-muted rounded flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2 mb-1">{relatedVideo.title}</p>
                        <p className="text-xs text-muted-foreground">{relatedVideo.channel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;