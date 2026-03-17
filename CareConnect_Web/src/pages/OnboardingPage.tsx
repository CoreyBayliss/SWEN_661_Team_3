import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Hand, Smartphone, Eye, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Container } from '../components/ui/Grid';
import { useAccessibility } from '../contexts/AccessibilityContext';

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedHand, setSelectedHand] = useState<'left' | 'right' | null>(null);
  const navigate = useNavigate();
  const { setLeftHandMode } = useAccessibility();

  const steps = [
    {
      title: 'Welcome to CareConnect',
      description: 'Your comprehensive healthcare management platform',
      content: (
        <div className="text-center py-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
            <Smartphone className="w-12 h-12 text-white" />
          </div>
          <h2 className="mb-4">Manage Your Health with Ease</h2>
          <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
            Track medications, schedule appointments, communicate with providers, and monitor your wellness—all in one place.
          </p>
        </div>
      ),
    },
    {
      title: 'Choose Your Hand Preference',
      description: 'Optimize the interface for comfortable one-handed use',
      content: (
        <div className="py-8">
          <div className="text-center mb-8">
            <h2 className="mb-4">Which hand do you primarily use?</h2>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              We'll position buttons and controls for easy thumb access
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Card
              interactive
              variant={selectedHand === 'left' ? 'elevated' : 'outlined'}
              onClick={() => setSelectedHand('left')}
              className={`${
                selectedHand === 'left'
                  ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                  : ''
              }`}
            >
              <CardContent className="mt-0">
                <div className="text-center py-6">
                  <Hand className="w-16 h-16 mx-auto mb-4 text-[var(--color-primary)]" style={{ transform: 'scaleX(-1)' }} />
                  <h3 className="mb-2">Left Hand</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Primary controls on the left
                  </p>
                  {selectedHand === 'left' && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-[var(--color-primary)]">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card
              interactive
              variant={selectedHand === 'right' ? 'elevated' : 'outlined'}
              onClick={() => setSelectedHand('right')}
              className={`${
                selectedHand === 'right'
                  ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                  : ''
              }`}
            >
              <CardContent className="mt-0">
                <div className="text-center py-6">
                  <Hand className="w-16 h-16 mx-auto mb-4 text-[var(--color-primary)]" />
                  <h3 className="mb-2">Right Hand</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Standard layout (right-aligned)
                  </p>
                  {selectedHand === 'right' && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-[var(--color-primary)]">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: 'Accessibility Features',
      description: 'Designed for everyone',
      content: (
        <div className="py-8">
          <div className="text-center mb-8">
            <Eye className="w-16 h-16 mx-auto mb-4 text-[var(--color-primary)]" />
            <h2 className="mb-4">Built-in Accessibility</h2>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              CareConnect is designed with accessibility at its core
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <Card variant="outlined">
              <CardContent className="mt-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h4 className="mb-1">Minimum Touch Targets</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">
                      All interactive elements are at least 56×56dp for easy tapping
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent className="mt-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h4 className="mb-1">Screen Reader Support</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">
                      Full support for screen readers with proper ARIA labels
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent className="mt-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h4 className="mb-1">Keyboard Navigation</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">
                      Navigate the entire app using keyboard shortcuts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent className="mt-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h4 className="mb-1">Customizable Display</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">
                      Adjust font sizes and enable high contrast mode in Settings
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save hand preference
    if (selectedHand) {
      setLeftHandMode(selectedHand === 'left');
    }
    navigate('/login');
  };

  const canProceed = currentStep !== 1 || selectedHand !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary-light)] to-white flex items-center justify-center p-4">
      <Container maxWidth="lg">
        <Card variant="elevated" className="max-w-4xl mx-auto">
          <CardContent className="mt-0">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-[var(--color-primary)]'
                      : index < currentStep
                      ? 'w-2 bg-[var(--color-primary)]'
                      : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Step ${index + 1}${index === currentStep ? ' (current)' : index < currentStep ? ' (completed)' : ''}`}
                />
              ))}
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
              {steps[currentStep].content}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 pt-8 border-t border-[var(--color-border)]">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                size="touch"
              >
                Back
              </Button>

              <div className="text-sm text-[var(--color-text-secondary)]">
                Step {currentStep + 1} of {steps.length}
              </div>

              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed}
                size="touch"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
