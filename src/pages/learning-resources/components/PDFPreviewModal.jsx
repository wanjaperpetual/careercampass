import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PDFPreviewModal = ({ pdf, isOpen, onClose, onDownload }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !pdf) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-200 bg-black/80 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground line-clamp-1">
              {pdf.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {(pdf.size / (1024 * 1024)).toFixed(1)} MB • {pdf.pages} pages
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="default"
              size="sm"
              onClick={() => onDownload(pdf)}
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Download
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-4 h-[calc(90vh-80px)] overflow-auto">
          <div className="bg-muted rounded-lg h-full flex items-center justify-center">
            <div className="text-center">
              <Icon name="FileText" size={64} className="text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">PDF Preview</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                {pdf.description}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📄 {pdf.pages} pages</p>
                <p>📁 {(pdf.size / (1024 * 1024)).toFixed(1)} MB</p>
                <p>📅 Uploaded {pdf.uploadedAt}</p>
                <p>⬇️ {pdf.downloads} downloads</p>
              </div>
              <div className="mt-6">
                <Button
                  variant="default"
                  onClick={() => onDownload(pdf)}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download PDF
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                In production, integrate with PDF.js for full preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreviewModal;