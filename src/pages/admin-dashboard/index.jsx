import React from 'react';
import Header from '../../components/ui/Header';
import AdminSidebar from '../../components/ui/AdminSidebar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import MetricsCard from './components/MetricsCard';
import ActivityChart from './components/ActivityChart';
import QuickActionsPanel from './components/QuickActionsPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import SystemHealthIndicators from './components/SystemHealthIndicators';
import AlertsNotifications from './components/AlertsNotifications';

const AdminDashboard = () => {
  const metricsData = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Active Students',
      value: '1,923',
      change: '+8%',
      changeType: 'increase',
      icon: 'GraduationCap',
      color: 'success'
    },
    {
      title: 'Popular Careers',
      value: '156',
      change: '+3%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'warning'
    },
    {
      title: 'University Matches',
      value: '4,521',
      change: '+15%',
      changeType: 'increase',
      icon: 'Target',
      color: 'secondary'
    }
  ];

  const customBreadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Admin Dashboard', path: '/admin-dashboard', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminSidebar />
      <NavigationBreadcrumbs customBreadcrumbs={customBreadcrumbs} />
      
      <main className="md:ml-64 transition-all duration-300">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with CareerCompass platform today.
            </p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Activity Chart - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ActivityChart />
            </div>
            
            {/* Quick Actions Panel */}
            <div className="lg:col-span-1">
              <QuickActionsPanel />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Activity Feed */}
            <RecentActivityFeed />
            
            {/* System Health Indicators */}
            <SystemHealthIndicators />
          </div>

          {/* Alerts and Notifications */}
          <div className="mb-8">
            <AlertsNotifications />
          </div>

          {/* Footer Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} CareerCompass. All rights reserved.</p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span>Last updated: {new Date().toLocaleString()}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>System Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;