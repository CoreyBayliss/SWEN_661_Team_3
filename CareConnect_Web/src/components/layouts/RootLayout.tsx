import { Outlet, Navigate, useLocation } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { Navigation } from '../navigation/Navigation';

export function RootLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/onboarding'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Redirect to dashboard if authenticated and trying to access public routes
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect to login if not authenticated and trying to access private routes
  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Show navigation only for authenticated users */}
      {isAuthenticated && <Navigation />}

      {/* Main content area with responsive padding */}
      <main
        id="main-content"
        className={`
          min-h-screen
          ${isAuthenticated ? 'lg:pl-64 md:pl-20' : ''}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
