import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import VideoCard from './VideoCard';
import PDFCard from './PDFCard';

const BookmarkedResources = ({ 
  bookmarkedVideos, 
  bookmarkedPDFs, 
  onVideoPlay, 
  onPDFPreview, 
  onPDFDownload,
  onRemoveBookmark 
}) => {
  const hasBookmarks = bookmarkedVideos.length > 0 || bookmarkedPDFs.length > 0;

  if (!hasBookmarks) {
    return (
      <div className="text-center py-12">
        <Icon name="Bookmark" size={48} className="text-muted-foreground mb-4 mx-auto" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Bookmarks Yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Start bookmarking videos and PDFs to access them quickly later. Your saved resources will appear here.
        </p>
        <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Browse Resources
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {bookmarkedVideos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Bookmarked Videos</h3>
            <span className="text-sm text-muted-foreground">
              {bookmarkedVideos.length} video{bookmarkedVideos.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onPlay={onVideoPlay}
                onBookmark={onRemoveBookmark}
                isBookmarked={true}
              />
            ))}
          </div>
        </div>
      )}

      {bookmarkedPDFs.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Bookmarked PDFs</h3>
            <span className="text-sm text-muted-foreground">
              {bookmarkedPDFs.length} document{bookmarkedPDFs.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="space-y-4">
            {bookmarkedPDFs.map((pdf) => (
              <PDFCard
                key={pdf.id}
                pdf={pdf}
                onPreview={onPDFPreview}
                onDownload={onPDFDownload}
                onBookmark={onRemoveBookmark}
                isBookmarked={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkedResources;