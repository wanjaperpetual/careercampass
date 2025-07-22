import React from 'react';
import Icon from '../../../components/AppIcon';

const InterestSelection = ({ selectedInterests, onInterestToggle, onNext, onBack }) => {
  const interestCategories = [
    {
      id: 'technology',
      name: 'Technology & Innovation',
      icon: 'Laptop',
      description: 'Software development, AI, cybersecurity, data science',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Medicine',
      icon: 'Heart',
      description: 'Medicine, nursing, pharmacy, medical research',
      color: 'bg-red-100 text-red-700'
    },
    {
      id: 'business',
      name: 'Business & Finance',
      icon: 'TrendingUp',
      description: 'Entrepreneurship, banking, accounting, marketing',
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'education',
      name: 'Education & Training',
      icon: 'GraduationCap',
      description: 'Teaching, curriculum development, educational leadership',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'creative',
      name: 'Creative Arts',
      icon: 'Palette',
      description: 'Design, photography, writing, film production',
      color: 'bg-pink-100 text-pink-700'
    },
    {
      id: 'engineering',
      name: 'Engineering',
      icon: 'Settings',
      description: 'Civil, mechanical, electrical, software engineering',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      id: 'agriculture',
      name: 'Agriculture & Environment',
      icon: 'Leaf',
      description: 'Farming, environmental science, veterinary medicine',
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 'law',
      name: 'Law & Governance',
      icon: 'Scale',
      description: 'Legal practice, public administration, policy making',
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      id: 'media',
      name: 'Media & Communication',
      icon: 'Radio',
      description: 'Journalism, broadcasting, public relations, social media',
      color: 'bg-cyan-100 text-cyan-700'
    },
    {
      id: 'sports',
      name: 'Sports & Recreation',
      icon: 'Trophy',
      description: 'Professional sports, coaching, sports management',
      color: 'bg-amber-100 text-amber-700'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          What interests you most?
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose the fields that excite you. You can select multiple areas of interest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {interestCategories.map((category) => {
          const isSelected = selectedInterests.includes(category.id);
          
          return (
            <button
              key={category.id}
              onClick={() => onInterestToggle(category.id)}
              className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:scale-102 ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-elevation-2'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'bg-primary text-primary-foreground' : category.color
                }`}>
                  <Icon name={category.icon} size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-lg mb-2 ${
                    isSelected ? 'text-primary' : 'text-foreground'
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={16} color="white" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors duration-200"
        >
          Back to Subjects
        </button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Selected {selectedInterests.length} interests
          </p>
          <button
            onClick={onNext}
            disabled={selectedInterests.length === 0}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedInterests.length > 0
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Continue to Strengths
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestSelection;