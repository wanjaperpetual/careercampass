import React from 'react';
import Button from '../../../components/ui/Button';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-2 md:space-x-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className="whitespace-nowrap flex-shrink-0"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;