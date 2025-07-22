import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StudentBottomTabs from '../../components/ui/StudentBottomTabs';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CategoryTabs from './components/CategoryTabs';
import SearchBar from './components/SearchBar';
import VideoCard from './components/VideoCard';
import PDFCard from './components/PDFCard';
import VideoModal from './components/VideoModal';
import PDFPreviewModal from './components/PDFPreviewModal';
import BookmarkedResources from './components/BookmarkedResources';
import RecentlyViewed from './components/RecentlyViewed';

const LearningResources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for categories
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'medicine', name: 'Medicine' },
    { id: 'business', name: 'Business' },
    { id: 'education', name: 'Education' },
    { id: 'technology', name: 'Technology' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'arts', name: 'Arts & Design' }
  ];

  // Mock video data
  const mockVideos = [
    {
      id: 'v1',
      title: 'Engineering Career Paths in Kenya: Complete Guide',
      channel: 'Kenya Education Hub',
      thumbnail: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: 1245,
      views: 125000,
      publishedAt: '2 weeks ago',
      category: 'engineering',
      description: 'Comprehensive overview of engineering opportunities in Kenya including civil, mechanical, electrical, and software engineering paths.'
    },
    {
      id: 'v2',
      title: 'Medical School Admission Requirements in Kenya',
      channel: 'Future Doctors Kenya',
      thumbnail: 'https://images.pixabay.com/photo/2017/12/24/03/06/medical-3036810_1280.jpg',
      duration: 892,
      views: 89000,
      publishedAt: '1 week ago',
      category: 'medicine',
      description: 'Everything you need to know about getting into medical school in Kenya, including KCSE requirements and university options.'
    },
    {
      id: 'v3',
      title: 'Starting a Business in Kenya: Young Entrepreneur Guide',
      channel: 'Kenya Business Network',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      duration: 1567,
      views: 67000,
      publishedAt: '3 days ago',
      category: 'business',
      description: 'Step-by-step guide for young Kenyans looking to start their own business, including funding options and legal requirements.'
    },
    {
      id: 'v4',
      title: 'Teaching Career Opportunities in Kenya',
      channel: 'Education Kenya',
      thumbnail: 'https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: 1034,
      views: 45000,
      publishedAt: '5 days ago',
      category: 'education',
      description: 'Explore teaching opportunities in Kenya, from primary education to university level, including certification requirements.'
    },
    {
      id: 'v5',
      title: 'Software Development Bootcamps in Kenya',
      channel: 'Tech Kenya',
      thumbnail: 'https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png',
      duration: 1789,
      views: 156000,
      publishedAt: '1 day ago',
      category: 'technology',
      description: 'Overview of coding bootcamps and tech training programs available in Kenya for aspiring software developers.'
    },
    {
      id: 'v6',
      title: 'Modern Agriculture Techniques for Kenyan Farmers',
      channel: 'AgriKenya',
      thumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      duration: 1456,
      views: 78000,
      publishedAt: '1 week ago',
      category: 'agriculture',
      description: 'Learn about modern farming techniques and agribusiness opportunities in Kenya for the next generation of farmers.'
    }
  ];

  // Mock PDF data
  const mockPDFs = [
    {
      id: 'p1',
      title: 'Complete Guide to Kenyan Universities 2024',
      description: 'Comprehensive directory of all accredited universities in Kenya with admission requirements, fees, and programs offered.',
      size: 2457600,
      pages: 45,
      downloads: 1250,
      uploadedAt: '2 weeks ago',
      category: 'education',
      url: '/assets/pdfs/kenya-universities-guide.pdf'
    },
    {
      id: 'p2',
      title: 'Engineering Careers Handbook Kenya',
      description: 'Detailed handbook covering all engineering disciplines available in Kenya, career prospects, and salary expectations.',
      size: 3145728,
      pages: 67,
      downloads: 890,
      uploadedAt: '1 month ago',
      category: 'engineering',
      url: '/assets/pdfs/engineering-careers-handbook.pdf'
    },
    {
      id: 'p3',
      title: 'Medical School Application Checklist',
      description: 'Step-by-step checklist for applying to medical schools in Kenya, including required documents and deadlines.',
      size: 1048576,
      pages: 12,
      downloads: 2100,
      uploadedAt: '3 weeks ago',
      category: 'medicine',
      url: '/assets/pdfs/medical-school-checklist.pdf'
    },
    {
      id: 'p4',
      title: 'Business Registration Guide Kenya',
      description: 'Complete guide to registering a business in Kenya, including legal requirements, tax obligations, and licensing.',
      size: 1572864,
      pages: 28,
      downloads: 567,
      uploadedAt: '2 weeks ago',
      category: 'business',
      url: '/assets/pdfs/business-registration-guide.pdf'
    },
    {
      id: 'p5',
      title: 'Tech Skills Roadmap 2024',
      description: 'Comprehensive roadmap for learning in-demand tech skills in Kenya, including programming languages and frameworks.',
      size: 2097152,
      pages: 35,
      downloads: 1890,
      uploadedAt: '1 week ago',
      category: 'technology',
      url: '/assets/pdfs/tech-skills-roadmap.pdf'
    }
  ];

  // Suggested search terms
  const suggestedTerms = [
    'engineering careers',
    'medical school',
    'business startup',
    'university admission',
    'tech bootcamp',
    'agriculture modern',
    'teaching jobs',
    'career guidance'
  ];

  // Filter content based on category and search
  const getFilteredContent = () => {
    let filteredVideos = mockVideos;
    let filteredPDFs = mockPDFs;

    // Filter by category
    if (activeCategory !== 'all') {
      filteredVideos = filteredVideos.filter(video => video.category === activeCategory);
      filteredPDFs = filteredPDFs.filter(pdf => pdf.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredVideos = filteredVideos.filter(video => 
        video.title.toLowerCase().includes(query) ||
        video.channel.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
      );
      filteredPDFs = filteredPDFs.filter(pdf => 
        pdf.title.toLowerCase().includes(query) ||
        pdf.description.toLowerCase().includes(query)
      );
    }

    return { videos: filteredVideos, pdfs: filteredPDFs };
  };

  const { videos, pdfs } = getFilteredContent();

  // Get bookmarked items
  const getBookmarkedItems = () => {
    const bookmarkedVideos = mockVideos.filter(video => 
      bookmarkedItems.includes(`video-${video.id}`)
    );
    const bookmarkedPDFs = mockPDFs.filter(pdf => 
      bookmarkedItems.includes(`pdf-${pdf.id}`)
    );
    return { videos: bookmarkedVideos, pdfs: bookmarkedPDFs };
  };

  // Handle bookmark toggle
  const handleBookmark = (id, type) => {
    const bookmarkId = `${type}-${id}`;
    setBookmarkedItems(prev => 
      prev.includes(bookmarkId)
        ? prev.filter(item => item !== bookmarkId)
        : [...prev, bookmarkId]
    );
  };

  // Handle video play
  const handleVideoPlay = (video) => {
    setSelectedVideo(video);
    addToRecentItems(video, 'video');
  };

  // Handle PDF preview
  const handlePDFPreview = (pdf) => {
    setSelectedPDF(pdf);
    addToRecentItems(pdf, 'pdf');
  };

  // Handle PDF download
  const handlePDFDownload = (pdf) => {
    // In production, this would trigger actual download
    console.log('Downloading PDF:', pdf.title);
    addToRecentItems(pdf, 'pdf');
  };

  // Add item to recent items
  const addToRecentItems = (item, type) => {
    const recentItem = {
      ...item,
      type,
      viewedAt: 'Just now'
    };
    
    setRecentItems(prev => {
      const filtered = prev.filter(recent => 
        !(recent.id === item.id && recent.type === type)
      );
      return [recentItem, ...filtered].slice(0, 10);
    });
  };

  // Handle recent item click
  const handleRecentItemClick = (item) => {
    if (item.type === 'video') {
      handleVideoPlay(item);
    } else {
      handlePDFPreview(item);
    }
  };

  // Clear recent history
  const clearRecentHistory = () => {
    setRecentItems([]);
  };

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('careercompass-bookmarks');
    if (savedBookmarks) {
      setBookmarkedItems(JSON.parse(savedBookmarks));
    }

    const savedRecent = localStorage.getItem('careercompass-recent');
    if (savedRecent) {
      setRecentItems(JSON.parse(savedRecent));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('careercompass-bookmarks', JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  // Save recent items to localStorage
  useEffect(() => {
    localStorage.setItem('careercompass-recent', JSON.stringify(recentItems));
  }, [recentItems]);

  const renderContent = () => {
    if (activeTab === 'bookmarks') {
      const bookmarked = getBookmarkedItems();
      return (
        <BookmarkedResources
          bookmarkedVideos={bookmarked.videos}
          bookmarkedPDFs={bookmarked.pdfs}
          onVideoPlay={handleVideoPlay}
          onPDFPreview={handlePDFPreview}
          onPDFDownload={handlePDFDownload}
          onRemoveBookmark={(id) => {
            const videoBookmark = `video-${id}`;
            const pdfBookmark = `pdf-${id}`;
            setBookmarkedItems(prev => 
              prev.filter(item => item !== videoBookmark && item !== pdfBookmark)
            );
          }}
        />
      );
    }

    if (activeTab === 'recent') {
      return (
        <RecentlyViewed
          recentItems={recentItems}
          onItemClick={handleRecentItemClick}
          onClearHistory={clearRecentHistory}
        />
      );
    }

    // All resources tab
    return (
      <div className="space-y-8">
        {/* Videos Section */}
        {videos.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Educational Videos</h2>
              <span className="text-sm text-muted-foreground">
                {videos.length} video{videos.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={handleVideoPlay}
                  onBookmark={(id) => handleBookmark(id, 'video')}
                  isBookmarked={bookmarkedItems.includes(`video-${video.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* PDFs Section */}
        {pdfs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">PDF Resources</h2>
              <span className="text-sm text-muted-foreground">
                {pdfs.length} document{pdfs.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-4">
              {pdfs.map((pdf) => (
                <PDFCard
                  key={pdf.id}
                  pdf={pdf}
                  onPreview={handlePDFPreview}
                  onDownload={handlePDFDownload}
                  onBookmark={(id) => handleBookmark(id, 'pdf')}
                  isBookmarked={bookmarkedItems.includes(`pdf-${pdf.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {videos.length === 0 && pdfs.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Resources Found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `No resources found for "${searchQuery}". Try different keywords or browse by category.`
                : 'No resources available in this category. Try selecting a different category.'
              }
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavigationBreadcrumbs />
      
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Learning Resources
          </h1>
          <p className="text-muted-foreground">
            Discover curated educational content to support your career journey
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            onSearch={setSearchQuery}
            searchQuery={searchQuery}
            suggestedTerms={suggestedTerms}
          />
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Content Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('all')}
            >
              All Resources
            </Button>
            <Button
              variant={activeTab === 'bookmarks' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('bookmarks')}
              iconName="Bookmark"
              iconPosition="left"
              iconSize={14}
            >
              Bookmarks ({bookmarkedItems.length})
            </Button>
            <Button
              variant={activeTab === 'recent' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('recent')}
              iconName="Clock"
              iconPosition="left"
              iconSize={14}
            >
              Recent ({recentItems.length})
            </Button>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </main>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        relatedVideos={mockVideos.filter(v => 
          v.id !== selectedVideo?.id && v.category === selectedVideo?.category
        )}
      />

      {/* PDF Preview Modal */}
      <PDFPreviewModal
        pdf={selectedPDF}
        isOpen={!!selectedPDF}
        onClose={() => setSelectedPDF(null)}
        onDownload={handlePDFDownload}
      />

      <StudentBottomTabs />
    </div>
  );
};

export default LearningResources;