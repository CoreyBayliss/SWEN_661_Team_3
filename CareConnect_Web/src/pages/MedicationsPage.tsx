import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Pill, Clock, AlertCircle, CheckCircle, Package } from 'lucide-react';
import { Container, Grid } from '../components/ui/Grid';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button, IconButton } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Dropdown } from '../components/ui/Dropdown';
import { Tabs } from '../components/ui/Tabs';
import { useMedication } from '../contexts/MedicationContext';

export function MedicationsPage() {
  const navigate = useNavigate();
  const { medications, markAsTaken } = useMedication();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Medications' },
    { value: 'active', label: 'Active' },
    { value: 'refill-needed', label: 'Refill Needed' },
    { value: 'paused', label: 'Paused' },
  ];

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.condition?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === 'refill-needed') {
      return matchesSearch && (med.refillsRemaining || 0) <= 1;
    }
    
    return matchesSearch;
  });

  const groupedByTime = {
    morning: filteredMedications.filter(med =>
      med.times.some(time => parseInt(time.split(':')[0]) < 12)
    ),
    afternoon: filteredMedications.filter(med =>
      med.times.some(time => {
        const hour = parseInt(time.split(':')[0]);
        return hour >= 12 && hour < 17;
      })
    ),
    evening: filteredMedications.filter(med =>
      med.times.some(time => parseInt(time.split(':')[0]) >= 17)
    ),
  };

  const tabs = [
    {
      id: 'all',
      label: 'All',
      content: <MedicationList medications={filteredMedications} navigate={navigate} markAsTaken={markAsTaken} />,
    },
    {
      id: 'morning',
      label: 'Morning',
      content: <MedicationList medications={groupedByTime.morning} navigate={navigate} markAsTaken={markAsTaken} />,
    },
    {
      id: 'afternoon',
      label: 'Afternoon',
      content: <MedicationList medications={groupedByTime.afternoon} navigate={navigate} markAsTaken={markAsTaken} />,
    },
    {
      id: 'evening',
      label: 'Evening',
      content: <MedicationList medications={groupedByTime.evening} navigate={navigate} markAsTaken={markAsTaken} />,
    },
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <Container maxWidth="xl" className="py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2">Medications</h1>
            <p className="text-[var(--color-text-secondary)]">
              Manage your medications and prescriptions
            </p>
          </div>
          <Button
            variant="primary"
            size="touch"
            onClick={() => navigate('/medications/add')}
            leftIcon={<Plus className="w-5 h-5" />}
            className="w-full md:w-auto"
          >
            Add Medication
          </Button>
        </div>

        {/* Search and Filter */}
        <Card variant="elevated" className="mb-6">
          <CardContent className="mt-0">
            <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap="md">
              <Input
                type="search"
                placeholder="Search medications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
                fullWidth
              />
              <Dropdown
                options={filterOptions}
                value={filterBy}
                onChange={setFilterBy}
                placeholder="Filter by status"
                fullWidth
              />
            </Grid>
          </CardContent>
        </Card>

        {/* Stats Cards - Desktop */}
        <div className="hidden lg:block mb-8">
          <Grid cols={{ desktop: 4 }} gap="lg">
            <Card variant="outlined">
              <CardContent className="mt-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center">
                    <Pill className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{medications.length}</div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">
                      Total Medications
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent className="mt-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{medications.filter(m => !m.lastTaken).length}</div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">
                      Due Today
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent className="mt-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {medications.filter(m => (m.refillsRemaining || 0) <= 1).length}
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">
                      Refills Needed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent className="mt-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">95%</div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">
                      Adherence Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </div>

        {/* Medications List with Tabs */}
        <Card variant="elevated">
          <CardContent className="mt-0">
            <Tabs tabs={tabs} variant="line" fullWidth />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

interface MedicationListProps {
  medications: any[];
  navigate: any;
  markAsTaken: any;
}

function MedicationList({ medications, navigate, markAsTaken }: MedicationListProps) {
  if (medications.length === 0) {
    return (
      <div className="text-center py-12">
        <Pill className="w-16 h-16 mx-auto mb-4 text-[var(--color-text-disabled)]" />
        <p className="text-[var(--color-text-secondary)]">
          No medications found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {medications.map((med) => (
        <Card
          key={med.id}
          variant="outlined"
          interactive
          onClick={() => navigate(`/medications/${med.id}`)}
        >
          <CardContent className="mt-0">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                <Pill className="w-6 h-6 text-[var(--color-primary)]" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold mb-1 m-0">{med.name}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">
                      {med.dosage} • {med.frequency}
                    </p>
                  </div>
                  {(med.refillsRemaining || 0) <= 1 && (
                    <Badge variant="warning" size="sm">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Refill Needed
                    </Badge>
                  )}
                </div>

                {med.condition && (
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3 m-0">
                    For: {med.condition}
                  </p>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {med.times.map((time: string, idx: number) => (
                    <Badge key={idx} variant="neutral" size="sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {time}
                    </Badge>
                  ))}
                </div>

                {med.prescribedBy && (
                  <p className="text-xs text-[var(--color-text-secondary)] mt-3 m-0">
                    Prescribed by {med.prescribedBy}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsTaken(med.id);
                    }}
                  >
                    Mark as Taken
                  </Button>
                  {(med.refillsRemaining || 0) <= 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/refill/${med.id}`);
                      }}
                    >
                      Request Refill
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
