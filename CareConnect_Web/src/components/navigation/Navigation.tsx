import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Home,
  Pill,
  MessageSquare,
  Heart,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  Bell,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { IconButton } from '../ui/Button';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
  { label: 'Medications', path: '/medications', icon: <Pill className="w-5 h-5" /> },
  { label: 'Messages', path: '/messages', icon: <MessageSquare className="w-5 h-5" /> },
  { label: 'Wellness', path: '/wellness', icon: <Heart className="w-5 h-5" /> },
  { label: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { leftHandMode } = useAccessibility();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-[var(--z-sticky)] bg-white border-b border-[var(--color-border)] shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <IconButton
              icon={mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              size="lg"
            />
            <h1 className="text-xl font-bold text-[var(--color-primary)] m-0">CareConnect</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <IconButton
              icon={<Bell className="w-5 h-5" />}
              label="Notifications"
              size="lg"
            />
            <IconButton
              icon={<User className="w-5 h-5" />}
              label="Profile"
              onClick={() => navigate('/profile')}
              size="lg"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="border-t border-[var(--color-border)] bg-white">
            <ul className="py-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 transition-colors
                      ${
                        isActive(item.path)
                          ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] border-l-4 border-[var(--color-primary)]'
                          : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                      }
                    `}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li className="border-t border-[var(--color-border)] mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full text-left text-[var(--color-error)] hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Tablet Sidebar (Collapsible) */}
      <aside className="hidden md:block lg:hidden fixed left-0 top-0 h-full w-20 bg-white border-r border-[var(--color-border)] z-[var(--z-fixed)]">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex flex-col items-center justify-center gap-1 py-3 mx-2 rounded-lg transition-all
                      ${
                        isActive(item.path)
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'
                      }
                    `}
                    title={item.label}
                  >
                    {item.icon}
                    <span className="text-xs">{item.label.split(' ')[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Actions */}
          <div className="p-2 border-t border-[var(--color-border)]">
            <IconButton
              icon={<User className="w-5 h-5" />}
              label="Profile"
              onClick={() => navigate('/profile')}
              variant="ghost"
              className="w-full"
            />
            <IconButton
              icon={<LogOut className="w-5 h-5" />}
              label="Logout"
              onClick={handleLogout}
              variant="ghost"
              className="w-full mt-2 text-[var(--color-error)]"
            />
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar (Full) */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-[var(--color-border)] z-[var(--z-fixed)]">
        <div className="flex flex-col h-full">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 px-6 h-20 border-b border-[var(--color-border)]">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--color-primary)] m-0 leading-tight">CareConnect</h1>
              <p className="text-xs text-[var(--color-text-secondary)] m-0">Healthcare Manager</p>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="px-6 py-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
                  <User className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-[var(--color-text-primary)] truncate m-0">
                    {user.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] truncate m-0">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 py-6 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium
                      ${
                        isActive(item.path)
                          ? 'bg-[var(--color-primary)] text-white shadow-md'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[var(--color-border)]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-[var(--color-error)] hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Bottom Navigation for Mobile (Left-hand mode aware) */}
      {leftHandMode && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] z-[var(--z-fixed)] safe-area-bottom">
          <ul className="flex justify-around items-center h-20">
            {navItems.slice(0, 4).map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[60px]
                    ${
                      isActive(item.path)
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-text-secondary)]'
                    }
                  `}
                >
                  {item.icon}
                  <span className="text-xs font-medium">{item.label.split(' ')[0]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
