import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsCards = () => {
  const statisticsData = [
    {
      id: 'careers-explored',
      title: 'Careers Explored',
      value: 12,
      change: '+3',
      changeType: 'increase',
      icon: 'Compass',
      color: 'bg-blue-500',
      description: 'Career paths discovered'
    },
    {
      id: 'universities-bookmarked',
      title: 'Universities Saved',
      value: 8,
      change: '+2',
      changeType: 'increase',
      icon: 'Bookmark',
      color: 'bg-emerald-500',
      description: 'Universities bookmarked'
    },
    {
      id: 'resources-accessed',
      title: 'Resources Viewed',
      value: 24,
      change: '+5',
      changeType: 'increase',
      icon: 'BookOpen',
      color: 'bg-amber-500',
      description: 'Learning materials accessed'
    },
    {
      id: 'chat-sessions',
      title: 'Chat Sessions',
      value: 15,
      change: '+4',
      changeType: 'increase',
      icon: 'MessageCircle',
      color: 'bg-purple-500',
      description: 'AI coach conversations'
    }
  ];

  const getChangeIcon = (changeType) => {
    return changeType === 'increase' ? 'TrendingUp' : 'TrendingDown';
  };

  const getChangeColor = (changeType) => {
    return changeType === 'increase' ? 'text-success' : 'text-error';
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-foreground mb-4">Your Statistics</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statisticsData.map((stat) => (
          <div
            key={stat.id}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-elevation-2 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} className="text-white" />
              </div>
              <div className={`flex items-center space-x-1 ${getChangeColor(stat.changeType)}`}>
                <Icon name={getChangeIcon(stat.changeType)} size={16} />
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm font-medium text-foreground">{stat.title}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCards;