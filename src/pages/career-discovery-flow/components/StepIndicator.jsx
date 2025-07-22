import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full bg-card border-b border-border px-4 py-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="absolute -top-1 right-0 w-4 h-4 bg-primary rounded-full border-2 border-card shadow-sm" />
        </div>

        {/* Step Labels */}
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={step.id} className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-success text-success-foreground' 
                    : isCurrent 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className={`hidden sm:block text-sm font-medium ${
                  isCurrent ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;