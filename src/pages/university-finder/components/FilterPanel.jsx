import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters,
  isMobile = false 
}) => {
  const kenyanCounties = [
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'eldoret', label: 'Eldoret' },
    { value: 'thika', label: 'Thika' },
    { value: 'malindi', label: 'Malindi' },
    { value: 'kitale', label: 'Kitale' },
    { value: 'garissa', label: 'Garissa' },
    { value: 'kakamega', label: 'Kakamega' }
  ];

  const costRanges = [
    { value: 'under-100k', label: 'Under KES 100,000' },
    { value: '100k-300k', label: 'KES 100,000 - 300,000' },
    { value: '300k-500k', label: 'KES 300,000 - 500,000' },
    { value: '500k-1m', label: 'KES 500,000 - 1,000,000' },
    { value: 'above-1m', label: 'Above KES 1,000,000' }
  ];

  const clusterPointRanges = [
    { value: 'below-30', label: 'Below 30 points' },
    { value: '30-35', label: '30-35 points' },
    { value: '35-40', label: '35-40 points' },
    { value: '40-45', label: '40-45 points' },
    { value: 'above-45', label: 'Above 45 points' }
  ];

  const programDurations = [
    { value: '1-year', label: '1 Year' },
    { value: '2-years', label: '2 Years' },
    { value: '3-years', label: '3 Years' },
    { value: '4-years', label: '4 Years' },
    { value: '5-years', label: '5+ Years' }
  ];

  const universityTypes = [
    { value: 'public', label: 'Public Universities' },
    { value: 'private', label: 'Private Universities' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
      )}

      <div className="space-y-4">
        <Select
          label="Location"
          placeholder="Select county"
          options={kenyanCounties}
          value={filters.location}
          onChange={(value) => handleFilterChange('location', value)}
          searchable
          clearable
        />

        <Select
          label="Cost Range (Annual)"
          placeholder="Select cost range"
          options={costRanges}
          value={filters.costRange}
          onChange={(value) => handleFilterChange('costRange', value)}
        />

        <Select
          label="Cluster Points Required"
          placeholder="Select cluster points"
          options={clusterPointRanges}
          value={filters.clusterPoints}
          onChange={(value) => handleFilterChange('clusterPoints', value)}
        />

        <Select
          label="Program Duration"
          placeholder="Select duration"
          options={programDurations}
          value={filters.duration}
          onChange={(value) => handleFilterChange('duration', value)}
        />

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">University Type</label>
          <div className="space-y-2">
            {universityTypes.map((type) => (
              <Checkbox
                key={type.value}
                label={type.label}
                checked={filters.universityTypes?.includes(type.value) || false}
                onChange={(e) => {
                  const currentTypes = filters.universityTypes || [];
                  const newTypes = e.target.checked
                    ? [...currentTypes, type.value]
                    : currentTypes.filter(t => t !== type.value);
                  handleFilterChange('universityTypes', newTypes);
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Additional Options</label>
          <div className="space-y-2">
            <Checkbox
              label="Accredited Programs Only"
              checked={filters.accreditedOnly || false}
              onChange={(e) => handleFilterChange('accreditedOnly', e.target.checked)}
            />
            <Checkbox
              label="Scholarships Available"
              checked={filters.scholarshipsAvailable || false}
              onChange={(e) => handleFilterChange('scholarshipsAvailable', e.target.checked)}
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="flex-1"
        >
          Clear All
        </Button>
        {isMobile && (
          <Button
            variant="default"
            onClick={onClose}
            className="flex-1"
          >
            Apply Filters
          </Button>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
        )}
        <div className={`fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-xl border-t border-border transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="max-h-[80vh] overflow-y-auto p-6">
            <FilterContent />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
      <h3 className="text-lg font-semibold text-foreground mb-6">Filters</h3>
      <FilterContent />
    </div>
  );
};

export default FilterPanel;