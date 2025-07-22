import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ userName = "John" }) => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  const motivationalMessages = [
    "Your future career awaits! Let\'s explore your possibilities today.",
    "Every great career starts with a single step. Take yours now!",
    "Discover the path that aligns with your passion and purpose.",
    "Your journey to career success begins with understanding yourself.",
    "Transform your interests into a meaningful career path."
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {getGreeting()}, {userName}! 👋
          </h1>
          <p className="text-primary-foreground/90 text-base md:text-lg mb-4 max-w-2xl">
            {randomMessage}
          </p>
          <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
            <Icon name="Calendar" size={16} />
            <span>{new Date().toLocaleDateString('en-KE', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-24 h-24 bg-primary-foreground/10 rounded-full flex items-center justify-center">
            <Icon name="Compass" size={48} className="text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;