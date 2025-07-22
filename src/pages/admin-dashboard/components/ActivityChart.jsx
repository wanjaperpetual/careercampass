import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActivityChart = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const chartData = {
    '7d': [
      { date: '15 Jul', registrations: 12, chatSessions: 45, resourceViews: 89 },
      { date: '16 Jul', registrations: 8, chatSessions: 52, resourceViews: 76 },
      { date: '17 Jul', registrations: 15, chatSessions: 38, resourceViews: 92 },
      { date: '18 Jul', registrations: 22, chatSessions: 67, resourceViews: 134 },
      { date: '19 Jul', registrations: 18, chatSessions: 43, resourceViews: 98 },
      { date: '20 Jul', registrations: 25, chatSessions: 78, resourceViews: 156 },
      { date: '21 Jul', registrations: 19, chatSessions: 56, resourceViews: 112 }
    ],
    '30d': [
      { date: 'Week 1', registrations: 85, chatSessions: 320, resourceViews: 678 },
      { date: 'Week 2', registrations: 92, chatSessions: 398, resourceViews: 745 },
      { date: 'Week 3', registrations: 78, chatSessions: 287, resourceViews: 623 },
      { date: 'Week 4', registrations: 119, chatSessions: 445, resourceViews: 892 }
    ]
  };

  const timeRangeOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">User Activity Trends</h3>
          <p className="text-sm text-muted-foreground">Platform engagement metrics over time</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
          <Button variant="ghost" size="icon">
            <Icon name="Download" size={16} />
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData[timeRange]}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="registrations" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="New Registrations"
            />
            <Line 
              type="monotone" 
              dataKey="chatSessions" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              name="Chat Sessions"
            />
            <Line 
              type="monotone" 
              dataKey="resourceViews" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              name="Resource Views"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-sm text-muted-foreground">New Registrations</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="text-sm text-muted-foreground">Chat Sessions</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-accent"></div>
          <span className="text-sm text-muted-foreground">Resource Views</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;