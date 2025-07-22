import React, { createContext, useContext, useState, useEffect } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

const AuthenticationGuard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        // In a real app, this would check with Clerk or your auth provider
        const mockUser = {
          id: '1',
          role: window.location.pathname.startsWith('/admin') ? 'admin' : 'student',
          name: 'John Doe',
          email: 'john@example.com'
        };
        
        setUser(mockUser);
      } catch (err) {
        setError('Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const navigationState = {
    user,
    loading,
    error,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    currentPath: window.location.pathname,
    setUser,
    logout: () => {
      setUser(null);
      window.location.href = '/login';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-error mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <NavigationContext.Provider value={navigationState}>
      {children}
    </NavigationContext.Provider>
  );
};

export default AuthenticationGuard;