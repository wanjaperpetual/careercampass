import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = "primary" }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: "bg-primary/10 text-primary border-primary/20",
      success: "bg-success/10 text-success border-success/20",
      warning: "bg-warning/10 text-warning border-warning/20",
      secondary: "bg-secondary/10 text-secondary border-secondary/20"
    };
    return colors[colorType] || colors.primary;
  };

  const getChangeColor = (type) => {
    return type === 'increase' ? 'text-success' : type === 'decrease' ? 'text-secondary' : 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon 
              name={changeType === 'increase' ? 'TrendingUp' : changeType === 'decrease' ? 'TrendingDown' : 'Minus'} 
              size={16} 
            />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default MetricsCard;