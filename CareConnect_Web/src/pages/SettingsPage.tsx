import React from 'react';
import { User, Bell, Shield, Accessibility, Moon, Globe, HelpCircle, FileText, Smartphone, Wifi, Download, Trash2 } from 'lucide-react';
import { Container } from '../components/ui/Grid';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Switch } from '../components/ui/Input';
import { Dropdown } from '../components/ui/Dropdown';
import { VerticalTabs } from '../components/ui/Tabs';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useAuth } from '../contexts/AuthContext';
import { requestNotificationPermission, subscribeToPushNotifications, clearCache, isStandalone } from '../utils/serviceWorkerRegistration';

export function SettingsPage() {
  const { leftHandMode, setLeftHandMode, fontSize, setFontSize, highContrast, setHighContrast } = useAccessibility();
  const { sessionTimeout, setSessionTimeout } = useAuth();
  const [notificationPermission, setNotificationPermission] = React.useState(Notification?.permission || 'default');
  const [isInstalled, setIsInstalled] = React.useState(false);
  const [cacheSize, setCacheSize] = React.useState('0 MB');

  React.useEffect(() => {
    setIsInstalled(isStandalone());
    
    // Estimate cache size
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(estimate => {
        const sizeMB = ((estimate.usage || 0) / 1024 / 1024).toFixed(2);
        setCacheSize(`${sizeMB} MB`);
      });
    }
  }, []);

  const handleEnableNotifications = async () => {
    const permission = await requestNotificationPermission();
    setNotificationPermission(permission);
    
    if (permission === 'granted') {
      await subscribeToPushNotifications();
    }
  };

  const handleClearCache = async () => {
    if (confirm('Clear all cached data? The app will reload.')) {
      await clearCache();
      window.location.reload();
    }
  };

  const fontSizeOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' },
  ];

  const sessionTimeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
  ];

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Card variant="outlined">
            <CardHeader title="Personal Information" />
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg"
                    defaultValue="Demo User"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg"
                    defaultValue="user@careconnect.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Emergency Contact" />
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg"
                    placeholder="Enter emergency contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Card variant="outlined">
            <CardHeader title="Medication Reminders" />
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Enable medication reminders"
                  description="Get notified when it's time to take your medications"
                  defaultChecked
                />
                <Switch
                  label="Snooze reminders"
                  description="Allow snoozing reminders for up to 30 minutes"
                  defaultChecked
                />
                <Switch
                  label="Refill reminders"
                  description="Get notified when you're running low on refills"
                  defaultChecked
                />
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Appointment Reminders" />
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Appointment reminders"
                  description="Get notified about upcoming appointments"
                  defaultChecked
                />
                <div>
                  <label className="block text-sm font-medium mb-2">Reminder timing</label>
                  <Dropdown
                    options={[
                      { value: '1', label: '1 day before' },
                      { value: '2', label: '2 days before' },
                      { value: '7', label: '1 week before' },
                    ]}
                    value="1"
                    onChange={() => {}}
                    fullWidth
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Communication" />
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Message notifications"
                  description="Get notified of new messages from providers"
                  defaultChecked
                />
                <Switch
                  label="Email notifications"
                  description="Receive email summaries of your health activity"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      icon: <Accessibility className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Card variant="outlined">
            <CardHeader title="Left-Hand Mode" />
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Enable left-hand mode"
                  description="Reposition primary actions to the lower-left for easier thumb access"
                  checked={leftHandMode}
                  onChange={(e) => setLeftHandMode(e.target.checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Display Settings" />
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Font Size</label>
                  <Dropdown
                    options={fontSizeOptions}
                    value={fontSize}
                    onChange={(value) => setFontSize(value as any)}
                    fullWidth
                  />
                </div>
                <Switch
                  label="High contrast mode"
                  description="Increase contrast for better visibility"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                />
                <Switch
                  label="Reduce motion"
                  description="Minimize animations and transitions"
                />
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Screen Reader" />
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Screen reader announcements"
                  description="Enable additional announcements for screen readers"
                  defaultChecked
                />
                <Switch
                  label="Verbose descriptions"
                  description="Provide detailed descriptions of UI elements"
                />
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Touch Targets" />
            <CardContent>
              <p className="text-sm text-[var(--color-text-secondary)]">
                All interactive elements meet the minimum 56×56dp touch target size for comfortable interaction.
              </p>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Card variant="outlined">
            <CardHeader title="Authentication" />
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Biometric authentication"
                  description="Use fingerprint or face recognition to sign in"
                  defaultChecked
                />
                <div>
                  <label className="block text-sm font-medium mb-2">Session Timeout</label>
                  <Dropdown
                    options={sessionTimeoutOptions}
                    value={sessionTimeout.toString()}
                    onChange={(value) => setSessionTimeout(parseInt(value))}
                    fullWidth
                  />
                  <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                    Automatically log out after this period of inactivity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Password" />
            <CardContent>
              <div className="space-y-4">
                <button className="w-full px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors">
                  Change Password
                </button>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Two-Factor Authentication" />
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Enable 2FA"
                  description="Add an extra layer of security to your account"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Card variant="outlined">
            <CardHeader title="Language & Region" />
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <Dropdown
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Español' },
                      { value: 'fr', label: 'Français' },
                    ]}
                    value="en"
                    onChange={() => {}}
                    fullWidth
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time Zone</label>
                  <Dropdown
                    options={[
                      { value: 'pst', label: 'Pacific Time (PT)' },
                      { value: 'est', label: 'Eastern Time (ET)' },
                      { value: 'cst', label: 'Central Time (CT)' },
                    ]}
                    value="pst"
                    onChange={() => {}}
                    fullWidth
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Theme" />
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Dark mode"
                  description="Switch to a darker color scheme"
                  leftIcon={<Moon className="w-5 h-5" />}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: <HelpCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Card variant="outlined" interactive>
            <CardContent className="mt-0">
              <div className="flex items-center gap-4 p-2">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1 m-0">FAQs</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] m-0">
                    Find answers to common questions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined" interactive>
            <CardContent className="mt-0">
              <div className="flex items-center gap-4 p-2">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1 m-0">User Guide</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] m-0">
                    Learn how to use CareConnect
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined" interactive>
            <CardContent className="mt-0">
              <div className="flex items-center gap-4 p-2">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center">
                  <Bell className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1 m-0">Contact Support</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] m-0">
                    Get help from our support team
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="App Information" />
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Version</span>
                  <span className="font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Last Updated</span>
                  <span className="font-medium">March 17, 2026</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: <Download className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Card variant="outlined">
            <CardHeader title="Notifications" />
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Enable push notifications"
                  description="Receive push notifications for important updates"
                  checked={notificationPermission === 'granted'}
                  onChange={handleEnableNotifications}
                />
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Cache Management" />
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Current cache size: {cacheSize}
                </p>
                <button
                  className="w-full px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
                  onClick={handleClearCache}
                >
                  Clear Cache
                </button>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="App Installation" />
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {isInstalled ? 'App is installed' : 'App is not installed'}
                </p>
                <button
                  className="w-full px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
                  onClick={() => {}}
                >
                  {isInstalled ? 'Uninstall App' : 'Install App'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <Container maxWidth="xl" className="py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2">Settings</h1>
          <p className="text-[var(--color-text-secondary)]">
            Manage your account preferences and app settings
          </p>
        </div>

        {/* Settings Content */}
        <Card variant="elevated">
          <CardContent className="mt-0">
            {/* Mobile: Regular Tabs */}
            <div className="lg:hidden">
              <VerticalTabs tabs={tabs} />
            </div>

            {/* Desktop: Vertical Tabs */}
            <div className="hidden lg:block">
              <VerticalTabs tabs={tabs} />
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}