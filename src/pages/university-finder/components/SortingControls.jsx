import React from 'react';

import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortingControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  resultsCount,
  onToggleFilters 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'cost-low', label: 'Cost: Low to High' },
    { value: 'cost-high', label: 'Cost: High to Low' },
    { value: 'cluster-low', label: 'Cluster Points: Low to High' },
    { value: 'cluster-high', label: 'Cluster Points: High to Low' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{resultsCount}</span> universities found
          </p>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className="md:hidden"
            iconName="Filter"
            iconPosition="left"
          >
            Filters
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-foreground">Sort by:</label>
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              className="min-w-[160px]"
            />
          </div>

          <div className="hidden md:flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              iconName="Grid3X3"
            >
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              iconName="List"
            >
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('map')}
              iconName="Map"
            >
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingControls;