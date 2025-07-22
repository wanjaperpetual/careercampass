import React from 'react';
import Icon from '../../../components/AppIcon';

const MapView = ({ universities, onUniversitySelect }) => {
  const handleMarkerClick = (university) => {
    onUniversitySelect(university);
  };

  const formatCost = (cost) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(cost);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Map" size={20} className="mr-2" />
          University Locations
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {universities.length} universities shown on map
        </p>
      </div>

      <div className="relative h-96 lg:h-full">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="University Locations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=-1.2921,36.8219&z=10&output=embed"
          className="border-0"
        />

        {/* University Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {universities.slice(0, 5).map((university, index) => (
            <div
              key={university.id}
              className={`absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`
              }}
              onClick={() => handleMarkerClick(university)}
            >
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow-elevation-2 hover:scale-110 transition-transform">
                <Icon name="MapPin" size={16} />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2 min-w-[200px]">
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {university.name}
                  </h4>
                  <p className="text-xs text-primary mb-1">{university.program}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatCost(university.cost)}</span>
                    <span>{university.clusterPoints} pts</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Universities</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Navigation" size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground">Click markers for details</span>
            </div>
          </div>
          <button
            onClick={() => window.open('https://maps.google.com', '_blank')}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            View in Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapView;