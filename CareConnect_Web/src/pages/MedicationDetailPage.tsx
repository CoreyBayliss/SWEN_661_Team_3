import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Pill, Clock, User, FileText, Package } from 'lucide-react';
import { Container, Grid } from '../components/ui/Grid';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button, IconButton } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useMedication } from '../contexts/MedicationContext';

export function MedicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { medications } = useMedication();
  
  const medication = medications.find(m => m.id === id);

  if (!medication) {
    return (
      <Container maxWidth="lg" className="py-8">
        <div className="text-center">
          <p>Medication not found</p>
          <Button onClick={() => navigate('/medications')}>Back to Medications</Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <Container maxWidth="lg" className="py-6 lg:py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <IconButton
            icon={<ArrowLeft className="w-5 h-5" />}
            label="Back"
            onClick={() => navigate('/medications')}
            size="lg"
          />
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl m-0">{medication.name}</h1>
            <p className="text-[var(--color-text-secondary)] m-0">{medication.dosage}</p>
          </div>
          <div className="flex gap-2">
            <IconButton
              icon={<Edit className="w-5 h-5" />}
              label="Edit"
              onClick={() => navigate(`/medications/${id}/edit`)}
            />
            <IconButton
              icon={<Trash2 className="w-5 h-5" />}
              label="Delete"
              variant="ghost"
              className="text-[var(--color-error)]"
            />
          </div>
        </div>

        <Grid cols={{ mobile: 1, tablet: 1, desktop: 2 }} gap="lg">
          {/* Main Info */}
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader title="Medication Details" />
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[var(--color-text-secondary)]">Dosage</label>
                    <p className="text-lg font-medium m-0">{medication.dosage}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[var(--color-text-secondary)]">Frequency</label>
                    <p className="text-lg font-medium m-0">{medication.frequency}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[var(--color-text-secondary)]">Times</label>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {medication.times.map((time, idx) => (
                        <Badge key={idx} variant="primary">
                          <Clock className="w-3 h-3 mr-1" />
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader title="Instructions" />
              <CardContent>
                <p className="m-0">{medication.instructions || 'No special instructions'}</p>
              </CardContent>
            </Card>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader title="Prescription Info" />
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    <div>
                      <p className="text-sm text-[var(--color-text-secondary)] m-0">Prescribed by</p>
                      <p className="font-medium m-0">{medication.prescribedBy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    <div>
                      <p className="text-sm text-[var(--color-text-secondary)] m-0">Condition</p>
                      <p className="font-medium m-0">{medication.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    <div>
                      <p className="text-sm text-[var(--color-text-secondary)] m-0">Refills Remaining</p>
                      <p className="font-medium m-0">{medication.refillsRemaining || 0}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader title="Quick Actions" />
              <CardContent>
                <div className="space-y-3">
                  <Button variant="primary" size="touch" fullWidth>
                    Mark as Taken
                  </Button>
                  <Button
                    variant="outline"
                    size="touch"
                    fullWidth
                    onClick={() => navigate(`/refill/${id}`)}
                  >
                    Request Refill
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Container>
    </div>
  );
}
