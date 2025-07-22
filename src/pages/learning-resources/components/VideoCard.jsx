import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoCard = ({ video, onBookmark, isBookmarked, onPlay }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 overflow-hidden hover:shadow-elevation-2 transition-all duration-200">
      <div className="relative aspect-video bg-muted">
        <Image
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </div>
        
        <button
          onClick={() => onPlay(video)}
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200"
        >
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Play" size={20} color="white" />
          </div>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>{video.channel}</span>
          <span>{formatViews(video.views)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>{video.publishedAt}</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(video.id)}
            className={`h-8 w-8 ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;