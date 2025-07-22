import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonPanel = ({ 
  selectedUniversities, 
  onRemoveFromComparison, 
  onClearComparison,
  isOpen,
  onToggle 
}) => {
  const formatCost = (cost) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(cost);
  };

  if (selectedUniversities.length === 0) return null;

  return (
    <>
      {/* Floating Compare Button */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-40">
        <Button
          variant="default"
          onClick={onToggle}
          className="shadow-elevation-3"
          iconName="GitCompare"
          iconPosition="left"
        >
          Compare ({selectedUniversities.length})
        </Button>
      </div>

      {/* Comparison Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-black/50" onClick={onToggle} />
            
            <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-elevation-3 rounded-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">
                  University Comparison
                </h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearComparison}
                    iconName="Trash2"
                  >
                    Clear All
                  </Button>
                  <Button variant="ghost" size="icon" onClick={onToggle}>
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="p-6 overflow-x-auto">
                <div className="min-w-full">
                  <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${selectedUniversities.length}, 1fr)` }}>
                    {/* Headers */}
                    <div className="font-medium text-muted-foreground">University</div>
                    {selectedUniversities.map((university) => (
                      <div key={university.id} className="text-center">
                        <div className="relative">
                          <h3 className="font-semibold text-foreground mb-1">
                            {university.name}
                          </h3>
                          <p className="text-sm text-primary">{university.program}</p>
                          <button
                            onClick={() => onRemoveFromComparison(university.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center hover:bg-error/80 transition-colors"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Location */}
                    <div className="font-medium text-muted-foreground">Location</div>
                    {selectedUniversities.map((university) => (
                      <div key={university.id} className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Icon name="MapPin" size={16} className="text-primary" />
                          <span className="text-sm text-foreground">{university.location}</span>
                        </div>
                      </div>
                    ))}

                    {/* Cost */}
                    <div className="font-medium text-muted-foreground">Annual Cost</div>
                    {selectedUniversities.map((university) => (
                      <div key={university.id} className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Icon name="DollarSign" size={16} className="text-success" />
                          <span className="text-sm font-semibold text-foreground">
                            {formatCost(university.cost)}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Cluster Points */}
                    <div className="font-medium text-muted-foreground">Cluster Points</div>
                    {selectedUniversities.map((university) => (
                      <div key={university.id} className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Icon name="Target" size={16} className="text-accent" />
                          <span className="text-sm font-semibold text-foreground">
                            {university.clusterPoints} points
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Duration */}
                    <div className="font-medium text-muted-foreground">Duration</div>
                    {selectedUniversities.map((university) => (
                      <div key={university.id} className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Icon name="Clock" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-foreground">{university.duration}</span>
                        </div>
                      </div>
                    ))}

                    {/* Type */}
                    <div className="font-medium text-muted-foreground">University Type</div>
                    {selectedUniversities.map((university) => (
                      <div key={university.id} className="text-center">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          university.type === 'public' ?'bg-success/10 text-success' :'bg-primary/10 text-primary'
                        }`}>
                          {university.type === 'public' ? 'Public' : 'Private'}
                        </span>
                      </div>
                    ))}

                    {/* Scholarships */}
                    <div className="font-medium text-muted-foreground">Scholarships</div>
                    {selectedUniversities.map((university) => (
                      <div key={university.id} className="text-center">
                        {university.scholarships ? (
                          <div className="flex items-center justify-center space-x-1 text-success">
                            <Icon name="Check" size={16} />
                            <span className="text-sm">Available</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-1 text-muted-foreground">
                            <Icon name="X" size={16} />
                            <span className="text-sm">Not Available</span>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Actions */}
                    <div className="font-medium text-muted-foreground">Actions</div>
                    {selectedUniversities.map((university) => (
                      <div key={university.id} className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(university.website, '_blank')}
                          iconName="ExternalLink"
                          iconPosition="right"
                        >
                          Visit Website
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComparisonPanel;