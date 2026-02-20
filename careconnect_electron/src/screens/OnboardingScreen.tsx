import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import './OnboardingScreen.css';

const OnboardingScreen: React.FC = () => {
  const [step, setStep] = useState(0);
  const { completeOnboarding, updateSettings } = useApp();
  const navigate = useNavigate();

  const handleComplete = async () => {
    await completeOnboarding();
    navigate('/');
  };

  const steps = [
    {
      title: 'Welcome to CareConnect',
      content: 'Your personal healthcare companion designed for simplicity and accessibility.',
    },
    {
      title: 'Manage Medications',
      content: 'Track your medications, set reminders, and request refills easily.',
    },
    {
      title: 'Stay on Schedule',
      content: 'View appointments and daily medication schedules at a glance.',
    },
    {
      title: 'Accessibility Features',
      content: 'Customize text size, contrast, and enable voice assistance for your comfort.',
    },
  ];

  return (
    <div className="onboarding-screen">
      <div className="onboarding-container">
        <div className="progress-dots">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === step ? 'active' : ''} ${index < step ? 'completed' : ''}`}
            />
          ))}
        </div>

        <div className="onboarding-content">
          <h1>{steps[step].title}</h1>
          <p>{steps[step].content}</p>
        </div>

        <div className="onboarding-actions">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="btn-secondary">
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step + 1)} className="btn-primary">
              Next
            </button>
          ) : (
            <button onClick={handleComplete} className="btn-primary">
              Get Started
            </button>
          )}
        </div>

        <button onClick={handleComplete} className="skip-btn">
          Skip
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
