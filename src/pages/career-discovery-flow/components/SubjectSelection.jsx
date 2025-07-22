import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectSelection = ({ selectedSubjects, onSubjectToggle, onNext }) => {
  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: 'Calculator', color: 'bg-blue-100 text-blue-700' },
    { id: 'english', name: 'English', icon: 'BookOpen', color: 'bg-green-100 text-green-700' },
    { id: 'kiswahili', name: 'Kiswahili', icon: 'Languages', color: 'bg-orange-100 text-orange-700' },
    { id: 'biology', name: 'Biology', icon: 'Microscope', color: 'bg-emerald-100 text-emerald-700' },
    { id: 'chemistry', name: 'Chemistry', icon: 'TestTube', color: 'bg-purple-100 text-purple-700' },
    { id: 'physics', name: 'Physics', icon: 'Atom', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'geography', name: 'Geography', icon: 'Globe', color: 'bg-cyan-100 text-cyan-700' },
    { id: 'history', name: 'History', icon: 'Clock', color: 'bg-amber-100 text-amber-700' },
    { id: 'business', name: 'Business Studies', icon: 'Briefcase', color: 'bg-rose-100 text-rose-700' },
    { id: 'computer', name: 'Computer Studies', icon: 'Monitor', color: 'bg-slate-100 text-slate-700' },
    { id: 'art', name: 'Art & Design', icon: 'Palette', color: 'bg-pink-100 text-pink-700' },
    { id: 'music', name: 'Music', icon: 'Music', color: 'bg-violet-100 text-violet-700' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Which subjects do you enjoy most?
        </h2>
        <p className="text-muted-foreground text-lg">
          Select the subjects that interest you. This helps us understand your academic preferences.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {subjects.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.id);
          
          return (
            <button
              key={subject.id}
              onClick={() => onSubjectToggle(subject.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-elevation-2'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                isSelected ? 'bg-primary text-primary-foreground' : subject.color
              }`}>
                <Icon name={subject.icon} size={24} />
              </div>
              <h3 className={`font-medium text-sm text-center ${
                isSelected ? 'text-primary' : 'text-foreground'
              }`}>
                {subject.name}
              </h3>
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Selected {selectedSubjects.length} subjects
        </p>
        <button
          onClick={onNext}
          disabled={selectedSubjects.length === 0}
          className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
            selectedSubjects.length > 0
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          Continue to Interests
        </button>
      </div>
    </div>
  );
};

export default SubjectSelection;