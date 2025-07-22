import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UniversityDetailModal = ({ university, isOpen, onClose }) => {
  if (!isOpen || !university) return null;

  const formatCost = (cost) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(cost);
  };

  const admissionRequirements = [
    "KCSE Certificate with minimum grade C+",
    `Cluster points: ${university.clusterPoints} or above`,
    "English and Mathematics grade C+ or above",
    "Relevant subject combinations based on program",
    "Medical certificate for health-related programs"
  ];

  const facilities = [
    "Modern lecture halls and laboratories",
    "Digital library with online resources",
    "Student accommodation facilities",
    "Sports and recreation centers",
    "Career guidance and counseling services",
    "High-speed internet connectivity"
  ];

  const testimonials = [
    {
      name: "Sarah Wanjiku",
      program: "Computer Science",
      year: "Class of 2023",
      comment: "The program provided excellent practical experience and industry connections that helped me secure a job immediately after graduation."
    },
    {
      name: "David Kimani",
      program: "Business Administration",
      year: "Class of 2022",
      comment: "The faculty is knowledgeable and supportive. The business incubation center helped me start my own company while still studying."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black/50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-elevation-3 rounded-xl">
          {/* Header */}
          <div className="relative">
            <Image
              src={university.image}
              alt={`${university.name} campus`}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" onClick={onClose} className="bg-black/20 text-white hover:bg-black/40">
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{university.name}</h2>
              <p className="text-lg text-white/90">{university.program}</p>
            </div>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <Icon name="MapPin" size={24} className="text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold text-foreground">{university.location}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <Icon name="DollarSign" size={24} className="text-success mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Annual Cost</p>
                <p className="font-semibold text-foreground">{formatCost(university.cost)}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <Icon name="Target" size={24} className="text-accent mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Cluster Points</p>
                <p className="font-semibold text-foreground">{university.clusterPoints} points</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">About the Program</h3>
              <p className="text-muted-foreground leading-relaxed">{university.description}</p>
            </div>

            {/* Admission Requirements */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Admission Requirements</h3>
              <ul className="space-y-2">
                {admissionRequirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Facilities */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Facilities & Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span className="text-muted-foreground">+254 700 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-muted-foreground">admissions@{university.name.toLowerCase().replace(/\s+/g, '')}.ac.ke</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Globe" size={16} className="text-primary" />
                  <span className="text-muted-foreground">{university.website}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-muted-foreground">{university.location}, Kenya</span>
                </div>
              </div>
            </div>

            {/* Student Testimonials */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Student Testimonials</h3>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={20} color="white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-foreground">{testimonial.name}</p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">{testimonial.program}</p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">{testimonial.year}</p>
                        </div>
                        <p className="text-sm text-muted-foreground italic">"{testimonial.comment}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Location</h3>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={university.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${university.coordinates?.lat || -1.2921},${university.coordinates?.lng || 36.8219}&z=14&output=embed`}
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-muted/30 border-t border-border">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                variant="outline"
                onClick={() => window.open(`mailto:admissions@${university.name.toLowerCase().replace(/\s+/g, '')}.ac.ke`, '_blank')}
                className="flex-1"
                iconName="Mail"
                iconPosition="left"
              >
                Contact Admissions
              </Button>
              <Button
                variant="default"
                onClick={() => window.open(university.website, '_blank')}
                className="flex-1"
                iconName="ExternalLink"
                iconPosition="right"
              >
                Visit Website
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailModal;