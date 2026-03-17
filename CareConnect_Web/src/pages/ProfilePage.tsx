import React from 'react';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Container, Grid } from '../components/ui/Grid';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <Container maxWidth="lg" className="py-6 lg:py-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6">Profile</h1>

        <Grid cols={{ mobile: 1, tablet: 1, desktop: 3 }} gap="lg">
          <div className="lg:col-span-1">
            <Card variant="elevated" className="text-center">
              <CardContent className="mt-0">
                <div className="w-32 h-32 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center mx-auto mb-4">
                  <User className="w-16 h-16 text-[var(--color-primary)]" />
                </div>
                <h2 className="mb-2">{user?.name}</h2>
                <p className="text-[var(--color-text-secondary)]">{user?.email}</p>
                <Button variant="outline" size="md" className="mt-6" fullWidth>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card variant="elevated">
              <CardHeader title="Contact Information" />
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    <div>
                      <p className="text-sm text-[var(--color-text-secondary)] m-0">Email</p>
                      <p className="font-medium m-0">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    <div>
                      <p className="text-sm text-[var(--color-text-secondary)] m-0">Phone</p>
                      <p className="font-medium m-0">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    <div>
                      <p className="text-sm text-[var(--color-text-secondary)] m-0">Address</p>
                      <p className="font-medium m-0">123 Main St, San Francisco, CA 94102</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    <div>
                      <p className="text-sm text-[var(--color-text-secondary)] m-0">Date of Birth</p>
                      <p className="font-medium m-0">January 1, 1990</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader title="Medical Information" />
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">Blood Type</p>
                    <p className="font-medium m-0">O+</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">Allergies</p>
                    <p className="font-medium m-0">Penicillin, Peanuts</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] m-0">Insurance Provider</p>
                    <p className="font-medium m-0">Blue Cross Blue Shield</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Container>
    </div>
  );
}
