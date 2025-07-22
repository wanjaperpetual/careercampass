import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCards = () => {
  const location = useLocation();

  const actionCards = [
    {
      id: 'chat',
      title: 'Start Career Chat',
      description: 'Get personalized career guidance from our AI coach',
      icon: 'MessageCircle',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      route: '/ai-career-coach-chat',
      preview: 'Ask me anything about careers, skills, or education paths',
      buttonText: 'Start Chatting',
      buttonVariant: 'default'
    },
    {
      id: 'universities',
      title: 'Discover Universities',
      description: 'Find the perfect university programs for your career goals',
      icon: 'GraduationCap',
      color: 'bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600',
      route: '/university-finder',
      preview: 'Search 200+ universities and programs across Kenya',
      buttonText: 'Explore Universities',
      buttonVariant: 'outline'
    },
    {
      id: 'resources',
      title: 'Browse Resources',
      description: 'Access curated learning materials and career guides',
      icon: 'BookOpen',
      color: 'bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
      route: '/learning-resources',
      preview: 'Videos, PDFs, and guides for every career path',
      buttonText: 'View Resources',
      buttonVariant: 'outline'
    },
    {
      id: 'discovery',
      title: 'Career Discovery',
      description: 'Take our assessment to find careers that match your interests',
      icon: 'Compass',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      route: '/career-discovery-flow',
      preview: 'Discover careers based on your strengths and interests',
      buttonText: 'Start Assessment',
      buttonVariant: 'outline'
    }
  ];

  const handleNavigation = (route) => {
    window.location.href = route;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actionCards.map((card) => (
          <div
            key={card.id}
            className={`${card.color} border rounded-xl p-6 hover:shadow-elevation-2 transition-all duration-200 cursor-pointer group`}
            onClick={() => handleNavigation(card.route)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center ${card.iconColor}`}>
                <Icon name={card.icon} size={24} />
              </div>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            
            <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {card.description}
            </p>
            
            <div className="bg-white/50 rounded-lg p-3 mb-4">
              <p className="text-xs text-muted-foreground italic">
                {card.preview}
              </p>
            </div>
            
            <Button
              variant={card.buttonVariant}
              size="sm"
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation(card.route);
              }}
            >
              {card.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionCards;