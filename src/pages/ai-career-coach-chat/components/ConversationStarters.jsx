import React from 'react';
import Button from '../../../components/ui/Button';

const ConversationStarters = ({ onStarterClick }) => {
  const starters = [
    {
      id: 1,
      text: "I\'m good at mathematics and science. What careers could suit me?",
      category: "Academic Strengths"
    },
    {
      id: 2,
      text: "I love helping people and want to make a difference. What options do I have?",
      category: "Personal Values"
    },
    {
      id: 3,
      text: "I\'m interested in technology and innovation. What careers are trending?",
      category: "Industry Interests"
    },
    {
      id: 4,
      text: "I want to study in Kenya but don't know which universities to consider.",
      category: "Education Planning"
    },
    {
      id: 5,
      text: "What skills should I develop for the future job market?",
      category: "Skill Development"
    },
    {
      id: 6,
      text: "How do I choose between different career paths I'm interested in?",
      category: "Decision Making"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Welcome to Your AI Career Coach! 👋
        </h3>
        <p className="text-muted-foreground text-sm">
          I'm here to help you discover career paths that match your interests and strengths. 
          Start with one of these questions or ask me anything!
        </p>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Popular Questions:</h4>
        <div className="grid gap-3">
          {starters.map((starter) => (
            <Button
              key={starter.id}
              variant="outline"
              className="text-left h-auto p-4 justify-start"
              onClick={() => onStarterClick(starter.text)}
            >
              <div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {starter.text}
                </div>
                <div className="text-xs text-muted-foreground">
                  {starter.category}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          💡 Tip: Be specific about your interests, subjects you enjoy, and goals for the best guidance!
        </p>
      </div>
    </div>
  );
};

export default ConversationStarters;