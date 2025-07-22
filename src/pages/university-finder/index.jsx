import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StudentBottomTabs from '../../components/ui/StudentBottomTabs';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import UniversityCard from './components/UniversityCard';
import SortingControls from './components/SortingControls';
import UniversityDetailModal from './components/UniversityDetailModal';
import MapView from './components/MapView';
import ComparisonPanel from './components/ComparisonPanel';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { findUniversitiesForCareer } from '../../lib/gemini';

const UniversityFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    costRange: '',
    clusterPoints: '',
    duration: '',
    universityTypes: [],
    accreditedOnly: false,
    scholarshipsAvailable: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [bookmarkedUniversities, setBookmarkedUniversities] = useState(new Set());
  const [comparisonList, setComparisonList] = useState([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState('');
  const [loadingAiRecommendations, setLoadingAiRecommendations] = useState(false);

  // Check if there's a career parameter in URL for AI recommendations
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const career = urlParams.get('career');
    
    if (career) {
      fetchAiRecommendations(career);
    }
  }, []);

  const fetchAiRecommendations = async (career) => {
    try {
      setLoadingAiRecommendations(true);
      const recommendations = await findUniversitiesForCareer(career);
      setAiRecommendations(recommendations);
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
    } finally {
      setLoadingAiRecommendations(false);
    }
  };

  // Mock university data (keeping existing for fallback)
  const mockUniversities = [
    {
      id: 1,
      name: "University of Nairobi",
      program: "Bachelor of Computer Science",
      location: "Nairobi",
      cost: 250000,
      clusterPoints: 42,
      duration: "4 years",
      students: 45000,
      type: "public",
      scholarships: true,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      description: `The University of Nairobi's Computer Science program is designed to provide students with comprehensive knowledge in software development, algorithms, and emerging technologies. The program emphasizes practical skills through hands-on projects and industry partnerships.`,
      website: "https://www.uonbi.ac.ke",
      coordinates: { lat: -1.2921, lng: 36.8219 },
      isBookmarked: false
    },
    {
      id: 2,
      name: "Kenyatta University",
      program: "Bachelor of Medicine and Surgery",
      location: "Nairobi",
      cost: 450000,
      clusterPoints: 45,
      duration: "6 years",
      students: 35000,
      type: "public",
      scholarships: true,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      description: `Kenyatta University's Medical School offers a comprehensive 6-year program that combines theoretical knowledge with extensive clinical practice. Students gain experience in modern medical facilities and community health programs.`,
      website: "https://www.ku.ac.ke",
      coordinates: { lat: -1.1844, lng: 36.9311 },
      isBookmarked: false
    },
    {
      id: 3,
      name: "Strathmore University",
      program: "Bachelor of Business Administration",
      location: "Nairobi",
      cost: 650000,
      clusterPoints: 38,
      duration: "4 years",
      students: 8000,
      type: "private",
      scholarships: true,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
      description: `Strathmore University's BBA program is renowned for its practical approach to business education, featuring case studies, internships, and strong industry connections that prepare graduates for leadership roles.`,
      website: "https://www.strathmore.edu",
      coordinates: { lat: -1.3067, lng: 36.8103 },
      isBookmarked: false
    },
    {
      id: 4,
      name: "Moi University",
      program: "Bachelor of Engineering (Civil)",
      location: "Eldoret",
      cost: 280000,
      clusterPoints: 40,
      duration: "5 years",
      students: 25000,
      type: "public",
      scholarships: false,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
      description: `Moi University's Civil Engineering program provides comprehensive training in infrastructure development, construction management, and sustainable engineering practices with state-of-the-art laboratories.`,
      website: "https://www.mu.ac.ke",
      coordinates: { lat: 0.5143, lng: 35.2698 },
      isBookmarked: false
    },
    {
      id: 5,
      name: "Technical University of Kenya",
      program: "Bachelor of Information Technology",
      location: "Nairobi",
      cost: 220000,
      clusterPoints: 36,
      duration: "4 years",
      students: 15000,
      type: "public",
      scholarships: true,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      description: `The IT program at Technical University of Kenya focuses on practical skills in software development, network administration, and cybersecurity, preparing students for the digital economy.`,
      website: "https://www.tukenya.ac.ke",
      coordinates: { lat: -1.2921, lng: 36.8219 },
      isBookmarked: false
    },
    {
      id: 6,
      name: "Maseno University",
      program: "Bachelor of Education (Science)",
      location: "Kisumu",
      cost: 180000,
      clusterPoints: 34,
      duration: "4 years",
      students: 20000,
      type: "public",
      scholarships: true,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
      description: `Maseno University's Education program prepares future science teachers with modern pedagogical methods and hands-on laboratory experience to excel in secondary education.`,
      website: "https://www.maseno.ac.ke",
      coordinates: { lat: -0.0917, lng: 34.6002 },
      isBookmarked: false
    }
  ];

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchQuery, filters, sortBy]);

  const applyFiltersAndSort = () => {
    let filtered = [...mockUniversities];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(university =>
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.program.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(university =>
        university.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // Apply cost range filter
    if (filters.costRange) {
      filtered = filtered.filter(university => {
        const cost = university.cost;
        switch (filters.costRange) {
          case 'under-100k': return cost < 100000;
          case '100k-300k': return cost >= 100000 && cost <= 300000;
          case '300k-500k': return cost >= 300000 && cost <= 500000;
          case '500k-1m': return cost >= 500000 && cost <= 1000000;
          case 'above-1m': return cost > 1000000;
          default: return true;
        }
      });
    }

    // Apply cluster points filter
    if (filters.clusterPoints) {
      filtered = filtered.filter(university => {
        const points = university.clusterPoints;
        switch (filters.clusterPoints) {
          case 'below-30': return points < 30;
          case '30-35': return points >= 30 && points <= 35;
          case '35-40': return points >= 35 && points <= 40;
          case '40-45': return points >= 40 && points <= 45;
          case 'above-45': return points > 45;
          default: return true;
        }
      });
    }

    // Apply university type filter
    if (filters.universityTypes && filters.universityTypes.length > 0) {
      filtered = filtered.filter(university =>
        filters.universityTypes.includes(university.type)
      );
    }

    // Apply scholarships filter
    if (filters.scholarshipsAvailable) {
      filtered = filtered.filter(university => university.scholarships);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'cost-low':
          return a.cost - b.cost;
        case 'cost-high':
          return b.cost - a.cost;
        case 'cluster-low':
          return a.clusterPoints - b.clusterPoints;
        case 'cluster-high':
          return b.clusterPoints - a.clusterPoints;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredUniversities(filtered);
  };

  const handleSearch = () => {
    applyFiltersAndSort();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      location: '',
      costRange: '',
      clusterPoints: '',
      duration: '',
      universityTypes: [],
      accreditedOnly: false,
      scholarshipsAvailable: false
    });
  };

  const handleViewDetails = (university) => {
    setSelectedUniversity(university);
    setIsDetailModalOpen(true);
  };

  const handleBookmark = (universityId, isBookmarked) => {
    const newBookmarked = new Set(bookmarkedUniversities);
    if (isBookmarked) {
      newBookmarked.add(universityId);
    } else {
      newBookmarked.delete(universityId);
    }
    setBookmarkedUniversities(newBookmarked);
  };

  const handleAddToComparison = (university) => {
    if (comparisonList.length < 3 && !comparisonList.find(u => u.id === university.id)) {
      setComparisonList([...comparisonList, university]);
    }
  };

  const handleRemoveFromComparison = (universityId) => {
    setComparisonList(comparisonList.filter(u => u.id !== universityId));
  };

  const handleClearComparison = () => {
    setComparisonList([]);
    setIsComparisonOpen(false);
  };

  const renderUniversityGrid = () => {
    if (filteredUniversities.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No universities found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      );
    }

    return filteredUniversities.map((university) => (
      <div key={university.id} className="relative">
        <UniversityCard
          university={university}
          onViewDetails={handleViewDetails}
          onBookmark={handleBookmark}
        />
        
        {/* Add to comparison button */}
        {comparisonList.length < 3 && !comparisonList.find(u => u.id === university.id) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleAddToComparison(university)}
            className="absolute top-2 left-2 bg-card/80 backdrop-blur"
            iconName="Plus"
          >
            Compare
          </Button>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavigationBreadcrumbs />
      
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">University Finder</h1>
          <p className="text-muted-foreground">
            Discover universities and programs that match your career interests and academic goals
          </p>
        </div>

        {/* AI Recommendations Panel */}
        {(aiRecommendations || loadingAiRecommendations) && (
          <div className="mb-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Bot" size={16} className="text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  AI University Recommendations
                </h3>
                {loadingAiRecommendations ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span className="text-muted-foreground">Getting personalized recommendations...</span>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    {aiRecommendations.split('\n').map((line, index) => (
                      <p key={index} className="text-foreground text-sm leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block lg:w-80 flex-shrink-0">
            <FilterPanel
              isOpen={true}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isMobile={false}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sorting Controls */}
            <SortingControls
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              resultsCount={filteredUniversities.length}
              onToggleFilters={() => setIsFilterPanelOpen(true)}
            />

            {/* Content Area */}
            {viewMode === 'map' ? (
              <MapView
                universities={filteredUniversities}
                onUniversitySelect={handleViewDetails}
              />
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
              }`}>
                {renderUniversityGrid()}
              </div>
            )}
          </div>

          {/* Desktop Map Panel (3-column layout) */}
          {viewMode === 'grid' && (
            <div className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <MapView
                  universities={filteredUniversities}
                  onUniversitySelect={handleViewDetails}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isMobile={true}
      />

      {/* University Detail Modal */}
      <UniversityDetailModal
        university={selectedUniversity}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Comparison Panel */}
      <ComparisonPanel
        selectedUniversities={comparisonList}
        onRemoveFromComparison={handleRemoveFromComparison}
        onClearComparison={handleClearComparison}
        isOpen={isComparisonOpen}
        onToggle={() => setIsComparisonOpen(!isComparisonOpen)}
      />

      <StudentBottomTabs />
    </div>
  );
};

export default UniversityFinder;