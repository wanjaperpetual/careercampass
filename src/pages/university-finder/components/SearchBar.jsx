import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const mockSuggestions = [
    "Computer Science",
    "Medicine",
    "Engineering",
    "Business Administration",
    "Law",
    "Education",
    "Agriculture",
    "Nursing",
    "Architecture",
    "Economics",
    "Psychology",
    "Journalism",
    "Information Technology",
    "Mechanical Engineering",
    "Civil Engineering"
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search by career or program (e.g., Computer Science, Medicine)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pr-12"
        />
        <button
          onClick={onSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <Icon name="Search" size={20} />
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-lg shadow-elevation-2 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 flex items-center space-x-3"
            >
              <Icon name="Search" size={16} className="text-muted-foreground" />
              <span className="text-foreground">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;