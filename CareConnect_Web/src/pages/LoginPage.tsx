import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Container } from '../components/ui/Grid';
import { Alert } from '../components/ui/Alert';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loginWithBiometric } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      await loginWithBiometric();
      navigate('/dashboard');
    } catch (err) {
      setError('Biometric authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary-light)] to-white flex items-center justify-center p-4">
      <Container maxWidth="sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
            <span className="text-white font-bold text-3xl">C</span>
          </div>
          <h1 className="text-3xl md:text-4xl mb-2">Welcome Back</h1>
          <p className="text-[var(--color-text-secondary)]">
            Sign in to access your healthcare dashboard
          </p>
        </div>

        <Card variant="elevated">
          <CardContent className="mt-0">
            {error && (
              <Alert variant="error" className="mb-6">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                label="Email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-5 h-5" />}
                required
                fullWidth
                autoComplete="email"
              />

              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                required
                fullWidth
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-[var(--color-primary)] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="touch"
                fullWidth
                loading={isLoading}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--color-border)]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[var(--color-text-secondary)]">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="touch"
                  fullWidth
                  onClick={handleBiometricLogin}
                  leftIcon={<Fingerprint className="w-5 h-5" />}
                  disabled={isLoading}
                >
                  Biometric Authentication
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">
                Don't have an account?{' '}
                <button className="text-[var(--color-primary)] hover:underline font-medium">
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-[var(--color-text-secondary)]">
            By signing in, you agree to our{' '}
            <button className="text-[var(--color-primary)] hover:underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-[var(--color-primary)] hover:underline">
              Privacy Policy
            </button>
          </p>
        </div>
      </Container>
    </div>
  );
}
