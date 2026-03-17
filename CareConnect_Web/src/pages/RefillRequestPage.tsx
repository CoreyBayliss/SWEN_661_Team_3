import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';
import { Container } from '../components/ui/Grid';
import { Card, CardContent } from '../components/ui/Card';
import { Button, IconButton } from '../components/ui/Button';
import { Input, Radio } from '../components/ui/Input';
import { useMedication } from '../contexts/MedicationContext';

export function RefillRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { medications } = useMedication();
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [pharmacy, setPharmacy] = useState('');

  const medication = medications.find(m => m.id === id);

  if (!medication) return null;

  const steps = ['Select Pharmacy', 'Delivery Method', 'Confirm'];

  const handleSubmit = () => {
    // Submit refill request
    navigate('/medications');
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <Container maxWidth="md" className="py-6 lg:py-8">
        <div className="flex items-center gap-4 mb-6">
          <IconButton
            icon={<ArrowLeft className="w-5 h-5" />}
            label="Back"
            onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)}
            size="lg"
          />
          <div>
            <h1 className="text-2xl md:text-3xl m-0">Request Refill</h1>
            <p className="text-[var(--color-text-secondary)] m-0">{medication.name}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-16 rounded-full ${
                idx + 1 <= step ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Card variant="elevated">
          <CardContent className="mt-0">
            {step === 1 && (
              <div className="space-y-4">
                <h3>Select Pharmacy</h3>
                <div className="space-y-3">
                  <Radio
                    label="CVS Pharmacy - Main St"
                    name="pharmacy"
                    checked={pharmacy === 'cvs'}
                    onChange={() => setPharmacy('cvs')}
                  />
                  <Radio
                    label="Walgreens - Oak Ave"
                    name="pharmacy"
                    checked={pharmacy === 'walgreens'}
                    onChange={() => setPharmacy('walgreens')}
                  />
                  <Radio
                    label="Other Pharmacy"
                    name="pharmacy"
                    checked={pharmacy === 'other'}
                    onChange={() => setPharmacy('other')}
                  />
                </div>
                <Button
                  variant="primary"
                  size="touch"
                  fullWidth
                  onClick={() => setStep(2)}
                  disabled={!pharmacy}
                >
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3>Delivery Method</h3>
                <div className="space-y-3">
                  <Radio
                    label="Pickup at Pharmacy"
                    name="delivery"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                  />
                  <Radio
                    label="Home Delivery"
                    name="delivery"
                    checked={deliveryMethod === 'delivery'}
                    onChange={() => setDeliveryMethod('delivery')}
                  />
                </div>
                <Button variant="primary" size="touch" fullWidth onClick={() => setStep(3)}>
                  Next
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3>Confirm Refill Request</h3>
                  <p className="text-[var(--color-text-secondary)]">
                    Review your refill request details
                  </p>
                </div>

                <div className="space-y-3 bg-[var(--color-surface)] p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">Medication</p>
                    <p className="font-medium m-0">{medication.name} - {medication.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">Pharmacy</p>
                    <p className="font-medium m-0">{pharmacy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">Delivery</p>
                    <p className="font-medium m-0">
                      {deliveryMethod === 'pickup' ? 'Pickup at Pharmacy' : 'Home Delivery'}
                    </p>
                  </div>
                </div>

                <Button variant="primary" size="touch" fullWidth onClick={handleSubmit}>
                  Submit Request
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
