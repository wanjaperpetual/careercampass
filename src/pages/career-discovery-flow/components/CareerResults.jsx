import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { analyzeCareerMatches } from '../../../lib/gemini';

const CareerResults = ({ results, assessmentData, onRestart, onSaveCareer }) => {
  const [careerMatches, setCareerMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('match');
  const [filterBy, setFilterBy] = useState('all');

  // Generate AI-powered career matches on component mount
  useEffect(() => {
    const generateMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (assessmentData) {
          const aiMatches = await analyzeCareerMatches(assessmentData);
          setCareerMatches(aiMatches);
        } else {
          // Fallback to provided results if no assessment data
          setCareerMatches(results || []);
        }
      } catch (error) {
        console.error('Error generating career matches:', error);
        setError('Unable to generate personalized career matches. Please try again.');
        // Use fallback data if available
        setCareerMatches(results || []);
      } finally {
        setLoading(false);
      }
    };

    generateMatches();
  }, [assessmentData, results]);

  const sortOptions = [
    { value: 'match', label: 'Best Match' },
    { value: 'salary', label: 'Salary' },
    { value: 'education', label: 'Education Level' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Careers' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'degree', label: 'Degree' },
    { value: 'postgraduate', label: 'Postgraduate' }
  ];

  const getSortedAndFilteredResults = () => {
    let filtered = careerMatches;
    
    if (filterBy !== 'all') {
      filtered = careerMatches.filter(career => 
        career.educationLevel?.toLowerCase().includes(filterBy)
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'salary':
          return (b.salaryRange?.max || 0) - (a.salaryRange?.max || 0);
        case 'education':
          const educationOrder = { 'certificate': 1, 'diploma': 2, 'degree': 3, 'postgraduate': 4 };
          return educationOrder[a.educationLevel?.toLowerCase()] - educationOrder[b.educationLevel?.toLowerCase()];
        default:
          return (b.matchPercentage || 0) - (a.matchPercentage || 0);
      }
    });
  };

  const formatSalary = (amount) => {
    if (!amount) return 'Not specified';
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleLearnMore = (careerId) => {
    console.log('Learn more about career:', careerId);
  };

  const handleFindUniversities = (career) => {
    window.location.href = `/university-finder?career=${encodeURIComponent(career.title)}`;
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Trigger re-generation
    const generateMatches = async () => {
      try {
        if (assessmentData) {
          const aiMatches = await analyzeCareerMatches(assessmentData);
          setCareerMatches(aiMatches);
        }
      } catch (error) {
        setError('Unable to generate personalized career matches. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    generateMatches();
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="Bot" size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Analyzing Your Profile...
          </h2>
          <p className="text-muted-foreground mb-8">
            Our AI is matching your interests and strengths with exciting career opportunities.
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="AlertCircle" size={32} className="text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-6">
            {error}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Try Again
            </button>
            <button
              onClick={onRestart}
              className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors duration-200"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sortedResults = getSortedAndFilteredResults();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Target" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Your Personalized Career Matches
        </h2>
        <p className="text-muted-foreground text-lg">
          Based on your interests, subjects, and strengths, here are AI-recommended careers that match your profile.
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-card border border-border rounded-xl">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Filter by Education
          </label>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {sortedResults.map((career, index) => (
          <div key={career.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-elevation-2 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={career.icon || 'Briefcase'} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {career.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      (career.matchPercentage || 0) >= 90 
                        ? 'bg-success/10 text-success' 
                        : (career.matchPercentage || 0) >= 75 
                          ? 'bg-primary/10 text-primary' :'bg-warning/10 text-warning'
                    }`}>
                      {career.matchPercentage || 0}% Match
                    </div>
                    <span className="text-sm text-muted-foreground">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onSaveCareer(career.id)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                title="Save career"
              >
                <Icon name="Bookmark" size={20} className="text-muted-foreground hover:text-primary" />
              </button>
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {career.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="GraduationCap" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {career.educationLevel || 'Not specified'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {career.salaryRange 
                    ? `${formatSalary(career.salaryRange.min)} - ${formatSalary(career.salaryRange.max)} per year`
                    : 'Salary varies'
                  }
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {career.location || 'Various locations'}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleLearnMore(career.id)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors duration-200"
              >
                Learn More
              </button>
              <button
                onClick={() => handleFindUniversities(career)}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Find Universities
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedResults.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No matches found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or retake the assessment.
          </p>
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Retake Assessment
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors duration-200"
          >
            Take Assessment Again
          </button>
          <button
            onClick={() => window.location.href = '/student-dashboard'}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Found {sortedResults.length} AI-powered career matches based on your profile
        </p>
      </div>
    </div>
  );
};

export default CareerResults;