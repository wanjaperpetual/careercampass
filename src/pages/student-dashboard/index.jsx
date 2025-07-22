import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import StudentBottomTabs from '../../components/ui/StudentBottomTabs';
import WelcomeSection from './components/WelcomeSection';
import QuickActionCards from './components/QuickActionCards';
import ProgressWidget from './components/ProgressWidget';
import RecentActivityFeed from './components/RecentActivityFeed';
import NotificationPanel from './components/NotificationPanel';
import StatisticsCards from './components/StatisticsCards';

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('John');

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      try {
        // In a real app, this would fetch user data from API
        const mockUserData = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          joinDate: new Date('2024-01-15'),
          completedAssessments: 3,
          savedUniversities: 8,
          chatSessions: 15
        };
        
        setUserName(mockUserData.name.split(' ')[0]);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {/* Welcome Section Skeleton */}
            <div className="skeleton h-32 rounded-2xl"></div>
            
            {/* Quick Actions Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton h-48 rounded-xl"></div>
              ))}
            </div>
            
            {/* Statistics Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton h-32 rounded-xl"></div>
              ))}
            </div>
            
            {/* Content Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="skeleton h-96 rounded-xl"></div>
              <div className="skeleton h-96 rounded-xl"></div>
            </div>
          </div>
        </div>
        <StudentBottomTabs />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Welcome Section */}
        <WelcomeSection userName={userName} />
        
        {/* Quick Action Cards */}
        <QuickActionCards />
        
        {/* Statistics Cards */}
        <StatisticsCards />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ProgressWidget />
            <RecentActivityFeed />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <NotificationPanel />
            
            {/* Additional Quick Stats */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">This Week's Goals</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-foreground">Complete career assessment</span>
                  <span className="text-xs text-success font-medium">75% done</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-foreground">Research 3 universities</span>
                  <span className="text-xs text-warning font-medium">2 of 3</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-foreground">Watch 5 career videos</span>
                  <span className="text-xs text-muted-foreground">Not started</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile-specific content */}
        <div className="md:hidden mt-8">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Ready to explore your future?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use the navigation tabs below to access all features
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </main>
      
      <StudentBottomTabs />
    </div>
  );
};

export default StudentDashboard;