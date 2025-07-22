import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UniversityCard = ({ university, onViewDetails, onBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState(university.isBookmarked || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(university.id, !isBookmarked);
  };

  const formatCost = (cost) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(cost);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {university.name}
          </h3>
          <p className="text-primary font-medium mb-2">
            {university.program}
          </p>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Icon name="MapPin" size={16} className="mr-1" />
            <span>{university.location}</span>
          </div>
        </div>
        <button
          onClick={handleBookmark}
          className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={20} 
            className={isBookmarked ? "text-primary" : "text-muted-foreground"} 
          />
        </button>
      </div>

      <div className="mb-4">
        <Image
          src={university.image}
          alt={`${university.name} campus`}
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {university.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center mb-1">
            <Icon name="DollarSign" size={16} className="text-success mr-1" />
            <span className="text-xs font-medium text-muted-foreground">Annual Cost</span>
          </div>
          <p className="text-sm font-semibold text-foreground">
            {formatCost(university.cost)}
          </p>
        </div>
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center mb-1">
            <Icon name="Target" size={16} className="text-accent mr-1" />
            <span className="text-xs font-medium text-muted-foreground">Cluster Points</span>
          </div>
          <p className="text-sm font-semibold text-foreground">
            {university.clusterPoints} points
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Icon name="Clock" size={14} className="mr-1" />
            <span>{university.duration}</span>
          </div>
          <div className="flex items-center">
            <Icon name="Users" size={14} className="mr-1" />
            <span>{university.students} students</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          university.type === 'public' ?'bg-success/10 text-success' :'bg-primary/10 text-primary'
        }`}>
          {university.type === 'public' ? 'Public' : 'Private'}
        </div>
      </div>

      {university.scholarships && (
        <div className="flex items-center mb-4 p-2 bg-accent/10 rounded-lg">
          <Icon name="Award" size={16} className="text-accent mr-2" />
          <span className="text-xs text-accent font-medium">Scholarships Available</span>
        </div>
      )}

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={() => onViewDetails(university)}
          className="flex-1"
          iconName="Eye"
          iconPosition="left"
        >
          View Details
        </Button>
        <Button
          variant="default"
          onClick={() => window.open(university.website, '_blank')}
          iconName="ExternalLink"
          iconPosition="right"
        >
          Visit Website
        </Button>
      </div>
    </div>
  );
};

export default UniversityCard;