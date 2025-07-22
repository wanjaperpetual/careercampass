import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, searchQuery, suggestedTerms = [] }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearch(value);
    setShowSuggestions(value.length > 0 && suggestedTerms.length > 0);
  };

  const handleSuggestionClick = (term) => {
    onSearch(term);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search videos, PDFs, and resources..."
          value={searchQuery}
          onChange={handleInputChange}
          className="pl-10 pr-4"
        />
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearch('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 z-50 bg-card border border-border rounded-lg shadow-elevation-2 mt-1">
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2 px-2">Suggested searches:</p>
            {suggestedTerms.slice(0, 5).map((term, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(term)}
                className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded transition-colors"
              >
                <Icon name="Search" size={14} className="inline mr-2 text-muted-foreground" />
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;