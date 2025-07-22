import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthIndicators = () => {
  const healthMetrics = [
    {
      id: 'api-performance',
      name: 'API Performance',
      status: 'healthy',
      value: '98.5%',
      description: 'Average response time: 245ms',
      icon: 'Zap',
      lastUpdated: '2 minutes ago'
    },
    {
      id: 'database-status',
      name: 'Database Status',
      status: 'healthy',
      value: '99.2%',
      description: 'Connection pool: 85% utilized',
      icon: 'Database',
      lastUpdated: '1 minute ago'
    },
    {
      id: 'ai-service',
      name: 'AI Service',
      status: 'warning',
      value: '94.1%',
      description: 'Elevated response times detected',
      icon: 'Bot',
      lastUpdated: '3 minutes ago'
    },
    {
      id: 'storage-usage',
      name: 'Storage Usage',
      status: 'healthy',
      value: '67%',
      description: '2.1TB of 3.2TB used',
      icon: 'HardDrive',
      lastUpdated: '5 minutes ago'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      healthy: 'text-success bg-success/10 border-success/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      error: 'text-error bg-error/10 border-error/20'
    };
    return colors[status] || colors.healthy;
  };

  const getStatusIcon = (status) => {
    const icons = {
      healthy: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle'
    };
    return icons[status] || icons.healthy;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Health</h3>
          <p className="text-sm text-muted-foreground">Real-time platform monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {healthMetrics.map((metric) => (
          <div key={metric.id} className="p-4 rounded-lg border border-border hover:shadow-elevation-1 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                  <Icon name={metric.icon} size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{metric.name}</h4>
                  <p className="text-xs text-muted-foreground">Updated {metric.lastUpdated}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(metric.status)} 
                  size={16} 
                  className={getStatusColor(metric.status).split(' ')[0]}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">{metric.value}</span>
                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(metric.status)}`}>
                  {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall System Status</span>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-success font-medium">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthIndicators;