import React from 'react';
import Icon from '../../../components/AppIcon';

const StrengthAssessment = ({ strengths, onStrengthChange, onNext, onBack }) => {
  const strengthCategories = [
    {
      id: 'leadership',
      name: 'Leadership',
      icon: 'Users',
      description: 'Ability to guide and motivate others'
    },
    {
      id: 'analytical',
      name: 'Analytical Thinking',
      icon: 'Brain',
      description: 'Problem-solving and logical reasoning'
    },
    {
      id: 'communication',
      name: 'Communication',
      icon: 'MessageCircle',
      description: 'Speaking, writing, and presenting ideas'
    },
    {
      id: 'creativity',
      name: 'Creativity',
      icon: 'Lightbulb',
      description: 'Innovation and artistic expression'
    },
    {
      id: 'technical',
      name: 'Technical Skills',
      icon: 'Code',
      description: 'Working with technology and tools'
    },
    {
      id: 'teamwork',
      name: 'Teamwork',
      icon: 'HandHeart',
      description: 'Collaborating effectively with others'
    },
    {
      id: 'organization',
      name: 'Organization',
      icon: 'Calendar',
      description: 'Planning and managing tasks efficiently'
    },
    {
      id: 'empathy',
      name: 'Empathy',
      icon: 'Heart',
      description: 'Understanding and helping others'
    }
  ];

  const getStrengthLevel = (value) => {
    if (value <= 2) return { label: 'Developing', color: 'text-orange-600' };
    if (value <= 4) return { label: 'Good', color: 'text-blue-600' };
    if (value <= 6) return { label: 'Strong', color: 'text-green-600' };
    if (value <= 8) return { label: 'Very Strong', color: 'text-emerald-600' };
    return { label: 'Exceptional', color: 'text-primary' };
  };

  const canProceed = Object.values(strengths).every(value => value > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Rate your strengths
        </h2>
        <p className="text-muted-foreground text-lg">
          Be honest about your current abilities. This helps us match you with suitable careers.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {strengthCategories.map((strength) => {
          const currentValue = strengths[strength.id] || 0;
          const level = getStrengthLevel(currentValue);
          
          return (
            <div key={strength.id} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={strength.icon} size={24} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {strength.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {strength.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {currentValue}/10
                  </div>
                  <div className={`text-sm font-medium ${level.color}`}>
                    {level.label}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentValue}
                    onChange={(e) => onStrengthChange(strength.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${currentValue * 10}%, var(--color-muted) ${currentValue * 10}%, var(--color-muted) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <span key={num} className={currentValue >= num ? 'text-primary' : ''}>
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors duration-200"
        >
          Back to Interests
        </button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            {canProceed ? 'Ready to see your results!' : 'Please rate all strengths to continue'}
          </p>
          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              canProceed
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Get My Career Matches
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrengthAssessment;