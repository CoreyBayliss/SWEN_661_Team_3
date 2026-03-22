import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Container } from '../components/ui/Grid';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button, IconButton } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Dropdown } from '../components/ui/Dropdown';
import { Badge } from '../components/ui/Badge';
import { useMedication } from '../contexts/MedicationContext';

export function AddMedicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addMedication, updateMedication, medications } = useMedication();
  
  const existingMed = id ? medications.find(m => m.id === id) : null;
  const isEditing = !!existingMed;

  const [formData, setFormData] = useState({
    name: existingMed?.name || '',
    dosage: existingMed?.dosage || '',
    frequency: existingMed?.frequency || 'Once daily',
    times: existingMed?.times || [],
    instructions: existingMed?.instructions || '',
    prescribedBy: existingMed?.prescribedBy || '',
    condition: existingMed?.condition || '',
    refillsRemaining: existingMed?.refillsRemaining || 3,
  });

  const [newTime, setNewTime] = useState('');

  const frequencyOptions = [
    { value: 'Once daily', label: 'Once daily' },
    { value: 'Twice daily', label: 'Twice daily' },
    { value: 'Three times daily', label: 'Three times daily' },
    { value: 'Four times daily', label: 'Four times daily' },
    { value: 'As needed', label: 'As needed' },
  ];

  const handleAddTime = () => {
    if (newTime && !formData.times.includes(newTime)) {
      setFormData({ ...formData, times: [...formData.times, newTime] });
      setNewTime('');
    }
  };

  const handleRemoveTime = (time: string) => {
    setFormData({ ...formData, times: formData.times.filter(t => t !== time) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && id) {
      updateMedication(id, formData);
    } else {
      addMedication({
        ...formData,
        startDate: new Date().toISOString(),
      });
    }
    
    navigate('/medications');
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <Container maxWidth="md" className="py-6 lg:py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <IconButton
            icon={<ArrowLeft className="w-5 h-5" />}
            label="Back"
            onClick={() => navigate('/medications')}
            size="lg"
          />
          <h1 className="text-2xl md:text-3xl m-0">
            {isEditing ? 'Edit Medication' : 'Add Medication'}
          </h1>
        </div>

        <Card variant="elevated">
          <CardContent className="mt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3>Basic Information</h3>
                <div className="space-y-4 mt-4">
                  <Input
                    label="Medication Name"
                    placeholder="e.g., Lisinopril"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    fullWidth
                  />

                  <Input
                    label="Dosage"
                    placeholder="e.g., 10mg"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    required
                    fullWidth
                  />

                  <Dropdown
                    label="Frequency"
                    options={frequencyOptions}
                    value={formData.frequency}
                    onChange={(value) => setFormData({ ...formData, frequency: value })}
                    fullWidth
                  />
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3>Schedule</h3>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Times to Take</label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="primary"
                        onClick={handleAddTime}
                        leftIcon={<Plus className="w-4 h-4" />}
                      >
                        Add
                      </Button>
                    </div>
                    {formData.times.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {formData.times.map((time, idx) => (
                          <Badge key={idx} variant="primary" className="pr-1">
                            {time}
                            <button
                              type="button"
                              onClick={() => handleRemoveTime(time)}
                              className="ml-2 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h3>Additional Details</h3>
                <div className="space-y-4 mt-4">
                  <Input
                    label="Instructions"
                    placeholder="e.g., Take with food"
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    fullWidth
                  />

                  <Input
                    label="Prescribed By"
                    placeholder="e.g., Dr. Smith"
                    value={formData.prescribedBy}
                    onChange={(e) => setFormData({ ...formData, prescribedBy: e.target.value })}
                    fullWidth
                  />

                  <Input
                    label="Condition"
                    placeholder="e.g., High Blood Pressure"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    fullWidth
                  />

                  <Input
                    label="Refills Remaining"
                    type="number"
                    min="0"
                    value={formData.refillsRemaining}
                    onChange={(e) => setFormData({ ...formData, refillsRemaining: parseInt(e.target.value) })}
                    fullWidth
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-[var(--color-border)]">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/medications')}
                  size="touch"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="touch"
                  className="flex-1"
                >
                  {isEditing ? 'Save Changes' : 'Add Medication'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
