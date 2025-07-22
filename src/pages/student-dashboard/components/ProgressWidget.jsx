import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressWidget = () => {
  const progressData = [
    {
      id: 'career-assessment',
      title: 'Career Assessment',
      description: 'Complete your interests and skills evaluation',
      progress: 75,
      status: 'in-progress',
      icon: 'Target',
      color: 'bg-blue-500',
      steps: '3 of 4 steps completed'
    },
    {
      id: 'university-exploration',
      title: 'University Exploration',
      description: 'Research and shortlist your preferred universities',
      progress: 40,
      status: 'in-progress',
      icon: 'GraduationCap',
      color: 'bg-emerald-500',
      steps: '2 of 5 universities explored'
    },
    {
      id: 'resource-learning',
      title: 'Learning Resources',
      description: 'Access career-specific learning materials',
      progress: 20,
      status: 'not-started',
      icon: 'BookOpen',
      color: 'bg-amber-500',
      steps: '1 of 5 resources viewed'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} />
          <span>Keep going!</span>
        </div>
      </div>

      <div className="space-y-6">
        {progressData.map((item) => (
          <div key={item.id} className="relative">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon name={item.icon} size={20} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getStatusIcon(item.status)} 
                      size={16} 
                      className={getStatusColor(item.status)} 
                    />
                    <span className="text-sm font-medium text-foreground">
                      {item.progress}%
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
                
                <div className="mb-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color} transition-all duration-300`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {item.steps}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Overall Progress</p>
            <p className="text-xs text-muted-foreground">Complete all sections to unlock career recommendations</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">45%</p>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressWidget;