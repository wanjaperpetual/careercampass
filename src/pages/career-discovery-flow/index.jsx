import React, { useState, useCallback } from 'react';
import Header from '../../components/ui/Header';
import StudentBottomTabs from '../../components/ui/StudentBottomTabs';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import StepIndicator from './components/StepIndicator';
import InterestSelection from './components/InterestSelection';
import SubjectSelection from './components/SubjectSelection';
import StrengthAssessment from './components/StrengthAssessment';
import CareerResults from './components/CareerResults';

const CareerDiscoveryFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    interests: [],
    subjects: [],
    strengths: []
  });
  const [isComplete, setIsComplete] = useState(false);
  const [savedCareers, setSavedCareers] = useState(new Set());

  const totalSteps = 4; // Interest → Subjects → Strengths → Results

  const steps = [
    { id: 1, title: 'Interests', description: 'What excites you most?' },
    { id: 2, title: 'Subjects', description: 'Your strongest subjects' },
    { id: 3, title: 'Strengths', description: 'Your personal strengths' },
    { id: 4, title: 'Results', description: 'Your career matches' }
  ];

  const handleNext = useCallback((stepData) => {
    const nextStep = currentStep + 1;
    
    // Update assessment data based on current step
    setAssessmentData(prev => {
      switch (currentStep) {
        case 1:
          return { ...prev, interests: stepData };
        case 2:
          return { ...prev, subjects: stepData };
        case 3:
          return { ...prev, strengths: stepData };
        default:
          return prev;
      }
    });

    if (nextStep > totalSteps) {
      setIsComplete(true);
    } else {
      setCurrentStep(nextStep);
    }
  }, [currentStep, totalSteps]);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setAssessmentData({
      interests: [],
      subjects: [],
      strengths: []
    });
    setIsComplete(false);
    setSavedCareers(new Set());
  };

  const handleSaveCareer = (careerId) => {
    const newSaved = new Set(savedCareers);
    if (savedCareers.has(careerId)) {
      newSaved.delete(careerId);
    } else {
      newSaved.add(careerId);
    }
    setSavedCareers(newSaved);
  };

  const renderCurrentStep = () => {
    if (isComplete || currentStep === 4) {
      return (
        <CareerResults
          assessmentData={assessmentData}
          onRestart={handleRestart}
          onSaveCareer={handleSaveCareer}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <InterestSelection
            selectedInterests={assessmentData.interests}
            onNext={handleNext}
            onBack={() => window.history.back()}
          />
        );
      case 2:
        return (
          <SubjectSelection
            selectedSubjects={assessmentData.subjects}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <StrengthAssessment
            selectedStrengths={assessmentData.strengths}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavigationBreadcrumbs />
      
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {!isComplete && currentStep !== 4 && (
          <>
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Discover Your Career Path
              </h1>
              <p className="text-muted-foreground text-lg">
                Let's explore careers that match your interests and strengths
              </p>
            </div>

            {/* Step Indicator */}
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          </>
        )}

        {/* Step Content */}
        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </div>

      <StudentBottomTabs />
    </div>
  );
};

export default CareerDiscoveryFlow;