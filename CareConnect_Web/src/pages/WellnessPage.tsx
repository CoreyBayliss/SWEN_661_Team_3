import React, { useState } from 'react';
import { Heart, Moon, Zap, Frown, Meh, Smile } from 'lucide-react';
import { Container, Grid } from '../components/ui/Grid';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useMedication } from '../contexts/MedicationContext';

export function WellnessPage() {
  const { addWellnessLog, wellnessLogs } = useMedication();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedSleep, setSelectedSleep] = useState<number | null>(null);
  const [selectedPain, setSelectedPain] = useState<number | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);

  const moods = [
    { value: 1, icon: Frown, label: 'Poor', color: 'text-red-500' },
    { value: 2, icon: Meh, label: 'Fair', color: 'text-orange-500' },
    { value: 3, icon: Smile, label: 'Good', color: 'text-green-500' },
  ];

  const handleLog = () => {
    if (selectedMood) addWellnessLog({ type: 'mood', value: selectedMood, timestamp: new Date().toISOString() });
    if (selectedSleep) addWellnessLog({ type: 'sleep', value: selectedSleep, timestamp: new Date().toISOString() });
    if (selectedPain) addWellnessLog({ type: 'pain', value: selectedPain, timestamp: new Date().toISOString() });
    if (selectedEnergy) addWellnessLog({ type: 'energy', value: selectedEnergy, timestamp: new Date().toISOString() });
    
    setSelectedMood(null);
    setSelectedSleep(null);
    setSelectedPain(null);
    setSelectedEnergy(null);
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <Container maxWidth="xl" className="py-6 lg:py-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6">Wellness Tracker</h1>

        <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap="lg">
          {/* Mood */}
          <Card variant="elevated">
            <CardHeader title="How are you feeling?" />
            <CardContent>
              <div className="flex justify-around gap-4">
                {moods.map(mood => {
                  const Icon = mood.icon;
                  return (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all min-w-[80px] ${
                        selectedMood === mood.value
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
                          : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                      }`}
                    >
                      <Icon className={`w-12 h-12 ${mood.color}`} />
                      <span className="text-sm font-medium">{mood.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Sleep */}
          <Card variant="elevated">
            <CardHeader title="Sleep Quality" />
            <CardContent>
              <div className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={selectedSleep || 5}
                  onChange={(e) => setSelectedSleep(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex items-center justify-between gap-4">
                  <Moon className="w-8 h-8 text-[var(--color-primary)]" />
                  <div className="text-center flex-1">
                    <div className="text-4xl font-bold text-[var(--color-primary)]">{selectedSleep || 5}</div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">out of 10</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pain Level */}
          <Card variant="elevated">
            <CardHeader title="Pain Level" />
            <CardContent>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={selectedPain || 0}
                  onChange={(e) => setSelectedPain(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex items-center justify-between gap-4">
                  <Heart className="w-8 h-8 text-red-500" />
                  <div className="text-center flex-1">
                    <div className="text-4xl font-bold text-red-500">{selectedPain || 0}</div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">out of 10</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Energy Level */}
          <Card variant="elevated">
            <CardHeader title="Energy Level" />
            <CardContent>
              <div className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={selectedEnergy || 5}
                  onChange={(e) => setSelectedEnergy(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex items-center justify-between gap-4">
                  <Zap className="w-8 h-8 text-orange-500" />
                  <div className="text-center flex-1">
                    <div className="text-4xl font-bold text-orange-500">{selectedEnergy || 5}</div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">out of 10</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <div className="mt-8">
          <Button variant="primary" size="touch" fullWidth onClick={handleLog}>
            Save Wellness Log
          </Button>
        </div>
      </Container>
    </div>
  );
}
