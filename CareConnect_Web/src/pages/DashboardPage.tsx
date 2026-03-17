import React from 'react';
import { useNavigate } from 'react-router';
import {
  Pill,
  Calendar,
  AlertCircle,
  Clock,
  Plus,
  ArrowRight,
  Phone,
  MessageSquare,
  Heart,
  CheckCircle,
} from 'lucide-react';
import { Container, Grid, Row } from '../components/ui/Grid';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Button, IconButton } from '../components/ui/Button';
import { Badge, DotBadge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { useMedication } from '../contexts/MedicationContext';
import { useAuth } from '../contexts/AuthContext';

export function DashboardPage() {
  const navigate = useNavigate();
  const { medications, appointments } = useMedication();
  const { user } = useAuth();

  // Get today's medications
  const now = new Date();
  const currentHour = now.getHours();
  
  const dueMedications = medications.filter(med => {
    return med.times.some(time => {
      const [hour] = time.split(':').map(Number);
      return hour <= currentHour + 1 && hour >= currentHour;
    });
  });

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);

  const getGreeting = () => {
    const hour = now.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <Container maxWidth="xl" className="py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2">
            {getGreeting()}, {user?.name}
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Due Medications Alert */}
        {dueMedications.length > 0 && (
          <Alert variant="warning" className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-medium mb-1 m-0">
                  You have {dueMedications.length} medication{dueMedications.length > 1 ? 's' : ''} due soon
                </p>
                <p className="text-sm m-0">
                  Don't forget to take your medications on time
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/medications')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View All
              </Button>
            </div>
          </Alert>
        )}

        {/* Quick Actions */}
        <Card variant="elevated" className="mb-8">
          <CardHeader title="Quick Actions" />
          <CardContent>
            <Grid cols={{ mobile: 2, tablet: 4, desktop: 4 }} gap="md">
              <button
                onClick={() => navigate('/medications/add')}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-[var(--color-primary-light)] hover:bg-[var(--color-primary)] hover:text-white transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] group-hover:bg-white flex items-center justify-center transition-colors">
                  <Plus className="w-6 h-6 text-white group-hover:text-[var(--color-primary)]" />
                </div>
                <span className="font-medium text-sm text-center">Add Medication</span>
              </button>

              <button
                onClick={() => navigate('/messages')}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-green-50 hover:bg-[var(--color-secondary)] hover:text-white transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)] group-hover:bg-white flex items-center justify-center transition-colors">
                  <MessageSquare className="w-6 h-6 text-white group-hover:text-[var(--color-secondary)]" />
                </div>
                <span className="font-medium text-sm text-center">Message Provider</span>
              </button>

              <button
                onClick={() => navigate('/wellness')}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-red-50 hover:bg-red-500 hover:text-white transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-red-500 group-hover:bg-white flex items-center justify-center transition-colors">
                  <Heart className="w-6 h-6 text-white group-hover:text-red-500" />
                </div>
                <span className="font-medium text-sm text-center">Log Wellness</span>
              </button>

              <button
                onClick={() => {}}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-orange-50 hover:bg-orange-500 hover:text-white transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500 group-hover:bg-white flex items-center justify-center transition-colors">
                  <Phone className="w-6 h-6 text-white group-hover:text-orange-500" />
                </div>
                <span className="font-medium text-sm text-center">Emergency Call</span>
              </button>
            </Grid>
          </CardContent>
        </Card>

        {/* Main Content Grid - Responsive Layout */}
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="lg">
          {/* Today's Medications */}
          <div className="md:col-span-2 lg:col-span-2">
            <Card variant="elevated" className="h-full">
              <CardHeader
                title="Today's Medications"
                subtitle={`${dueMedications.length} due now`}
                action={
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/medications')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    View All
                  </Button>
                }
              />
              <CardContent>
                {dueMedications.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[var(--color-success)]" />
                    <p className="text-[var(--color-text-secondary)]">
                      No medications due right now. Great job!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dueMedications.map((med) => (
                      <div
                        key={med.id}
                        className="flex items-start gap-4 p-4 bg-[var(--color-surface)] rounded-lg hover:bg-[var(--color-border)] transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                          <Pill className="w-6 h-6 text-[var(--color-primary)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold m-0">{med.name}</h4>
                            <Badge variant="warning" size="sm">
                              Due Now
                            </Badge>
                          </div>
                          <p className="text-sm text-[var(--color-text-secondary)] mb-2 m-0">
                            {med.dosage} • {med.frequency}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Button variant="primary" size="sm">
                              Mark as Taken
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/medications/${med.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <Card variant="elevated" className="h-full">
              <CardHeader
                title="Upcoming"
                subtitle="Appointments"
                action={
                  <IconButton
                    icon={<Plus className="w-5 h-5" />}
                    label="Add appointment"
                    size="md"
                  />
                }
              />
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-[var(--color-text-disabled)]" />
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      No upcoming appointments
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="p-4 bg-[var(--color-surface)] rounded-lg hover:bg-[var(--color-border)] transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium mb-1 m-0">{apt.title}</h5>
                            <p className="text-sm text-[var(--color-text-secondary)] m-0">
                              {apt.doctor}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(apt.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}{' '}
                              • {apt.time}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Badge variant={apt.type === 'telehealth' ? 'primary' : 'secondary'} size="sm">
                            {apt.type === 'telehealth' ? 'Telehealth' : 'In-Person'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </Grid>

        {/* Health Stats - Desktop Only */}
        <div className="hidden lg:block mt-8">
          <Card variant="elevated">
            <CardHeader title="Health Overview" subtitle="Last 7 days" />
            <CardContent>
              <Grid cols={{ desktop: 4 }} gap="lg">
                <div className="text-center p-6">
                  <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                    95%
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] m-0">
                    Medication Adherence
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-4xl font-bold text-[var(--color-secondary)] mb-2">
                    4
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] m-0">
                    Wellness Logs
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    2
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] m-0">
                    Messages Sent
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-4xl font-bold text-purple-500 mb-2">
                    7.5
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] m-0">
                    Avg Sleep (hours)
                  </p>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
