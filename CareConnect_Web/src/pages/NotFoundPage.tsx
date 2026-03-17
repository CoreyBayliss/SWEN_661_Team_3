import React from 'react';
import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';
import { Container } from '../components/ui/Grid';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <Container maxWidth="md" className="text-center">
        <div className="text-9xl font-bold text-[var(--color-primary)] mb-4">404</div>
        <h1 className="text-3xl md:text-4xl mb-4">Page Not Found</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          variant="primary"
          size="touch"
          onClick={() => navigate('/dashboard')}
          leftIcon={<Home className="w-5 h-5" />}
        >
          Go to Dashboard
        </Button>
      </Container>
    </div>
  );
}
