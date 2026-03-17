import { useState } from 'react';
import { 
  Home, Pill, Calendar, MessageSquare, Settings as SettingsIcon,
  Plus, ArrowLeft, Clock, User, Bell, Shield, Smartphone, Moon
} from 'lucide-react';

export const ScreenshotDemo = () => {
  const [currentScreen, setCurrentScreen] = useState('today');
  const [leftHandMode, setLeftHandMode] = useState(false);

  const screens = [
    { id: 'today', name: 'Today View', component: <TodayViewDemo /> },
    { id: 'medications', name: 'Medications', component: <MedicationsDemo /> },
    { id: 'add-medication', name: 'Add Medication', component: <AddMedicationDemo /> },
    { id: 'calendar', name: 'Calendar', component: <CalendarDemo /> },
    { id: 'messages', name: 'Messages', component: <MessagesDemo /> },
    { id: 'settings', name: 'Settings', component: <SettingsDemo leftHandMode={leftHandMode} setLeftHandMode={setLeftHandMode} /> },
    { id: 'login', name: 'Login', component: <LoginDemo /> },
    { id: 'onboarding', name: 'Onboarding', component: <OnboardingDemo /> },
  ];

  const currentScreenData = screens.find(s => s.id === currentScreen);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Control Panel */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-xl font-bold text-gray-900">
              📸 CareConnect Screenshot Demo
            </h1>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={leftHandMode}
                  onChange={(e) => setLeftHandMode(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">Left-Hand Mode</span>
              </label>

              <select
                value={currentScreen}
                onChange={(e) => setCurrentScreen(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {screens.map(screen => (
                  <option key={screen.id} value={screen.id}>
                    {screen.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>📷 How to capture:</strong> Open DevTools (F12) → Toggle device toolbar (Cmd+Shift+M) → 
              Select device (iPhone 14 Pro, iPad, etc.) → Open DevTools menu (⋮) → "Capture screenshot"
            </p>
          </div>
        </div>
      </div>

      {/* Screen Preview */}
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
            {/* Status bar simulation */}
            <div className="bg-gray-900 text-white px-6 py-2 flex items-center justify-between text-xs">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-3 border border-white rounded-sm"></div>
                <div className="w-3 h-3 border border-white rounded-sm"></div>
                <div className="w-2 h-3 bg-white rounded-sm"></div>
              </div>
            </div>

            {/* Screen Content */}
            <div className="bg-gray-50 min-h-[600px]">
              {currentScreenData?.component}
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            Current: <strong>{currentScreenData?.name}</strong>
            {leftHandMode && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Left-Hand Mode</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo Screen Components
const TodayViewDemo = () => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8">
      <h1 className="text-4xl font-bold mb-2">Today</h1>
      <p className="text-blue-100">Tuesday, January 27, 2026</p>
    </header>

    <main className="flex-1 px-6 py-6 space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Due Medications</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Lisinopril 10mg</h3>
              <p className="text-sm text-gray-600">1 tablet • With food</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              Due Soon
            </span>
          </div>
          <button className="w-full min-h-[56px] bg-blue-600 text-white rounded-xl font-medium">
            Take Now
          </button>
        </div>
      </section>
    </main>

    <nav className="bg-white border-t border-gray-200">
      <div className="flex items-center justify-around px-2 py-2">
        {[
          { icon: Home, label: 'Today', active: true },
          { icon: Pill, label: 'Meds' },
          { icon: Calendar, label: 'Calendar' },
          { icon: MessageSquare, label: 'Messages' },
          { icon: SettingsIcon, label: 'Settings' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[56px] px-3 py-2 rounded-xl ${
                item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  </div>
);

const MedicationsDemo = () => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-2xl font-semibold text-gray-900">Medications</h1>
    </header>

    <main className="flex-1 px-6 py-6 space-y-4">
      {['Lisinopril 10mg', 'Metformin 500mg', 'Atorvastatin 20mg'].map((med) => (
        <div key={med} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{med}</h3>
          <p className="text-sm text-gray-600">Once daily • With food</p>
        </div>
      ))}
    </main>

    <button className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center z-40">
      <Plus className="w-6 h-6" />
    </button>

    <nav className="bg-white border-t border-gray-200">
      <div className="flex items-center justify-around px-2 py-2">
        {[
          { icon: Home, label: 'Today' },
          { icon: Pill, label: 'Meds', active: true },
          { icon: Calendar, label: 'Calendar' },
          { icon: MessageSquare, label: 'Messages' },
          { icon: SettingsIcon, label: 'Settings' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[56px] px-3 py-2 rounded-xl ${
                item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  </div>
);

const AddMedicationDemo = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <header className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-gray-700">
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg font-medium">Back</span>
        </button>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mt-4">Add Medication</h1>
    </header>

    <main className="flex-1 px-6 py-6 space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Medication Name *</label>
        <input
          type="text"
          placeholder="e.g., Lisinopril"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Dose *</label>
        <input
          type="text"
          placeholder="e.g., 10mg"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Frequency *</label>
        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl">
          <option>Once daily</option>
          <option>Twice daily</option>
          <option>Three times daily</option>
        </select>
      </div>
    </main>

    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
      <button className="w-full min-h-[56px] bg-blue-600 text-white rounded-xl font-medium">
        Save Medication
      </button>
    </div>
  </div>
);

const CalendarDemo = () => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
    </header>

    <main className="flex-1 px-6 py-6 space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Dr. Johnson - Checkup</h3>
            <p className="text-sm text-gray-600">Tomorrow at 10:00 AM</p>
            <p className="text-sm text-gray-500 mt-1">Main Street Clinic</p>
          </div>
        </div>
      </div>
    </main>

    <nav className="bg-white border-t border-gray-200">
      <div className="flex items-center justify-around px-2 py-2">
        {[
          { icon: Home, label: 'Today' },
          { icon: Pill, label: 'Meds' },
          { icon: Calendar, label: 'Calendar', active: true },
          { icon: MessageSquare, label: 'Messages' },
          { icon: SettingsIcon, label: 'Settings' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[56px] px-3 py-2 rounded-xl ${
                item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  </div>
);

const MessagesDemo = () => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
    </header>

    <main className="flex-1 px-6 py-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {['Request Refill', 'Report Side Effect', 'Schedule Appointment', 'General Question'].map((template) => (
          <button
            key={template}
            className="min-h-[80px] bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 text-left font-medium shadow-md"
          >
            {template}
          </button>
        ))}
      </div>
    </main>

    <nav className="bg-white border-t border-gray-200">
      <div className="flex items-center justify-around px-2 py-2">
        {[
          { icon: Home, label: 'Today' },
          { icon: Pill, label: 'Meds' },
          { icon: Calendar, label: 'Calendar' },
          { icon: MessageSquare, label: 'Messages', active: true },
          { icon: SettingsIcon, label: 'Settings' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[56px] px-3 py-2 rounded-xl ${
                item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  </div>
);

const SettingsDemo = ({ leftHandMode, setLeftHandMode }: { leftHandMode: boolean, setLeftHandMode: (val: boolean) => void }) => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
    </header>

    <main className="flex-1 px-6 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-200">
        <button className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Profile</span>
          </div>
        </button>

        <button className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Notifications</span>
          </div>
        </button>

        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Left-Hand Mode</span>
          </div>
          <label className="relative inline-block w-12 h-6">
            <input
              type="checkbox"
              checked={leftHandMode}
              onChange={(e) => setLeftHandMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
          </label>
        </div>

        <button className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Security</span>
          </div>
        </button>
      </div>
    </main>

    <nav className="bg-white border-t border-gray-200">
      <div className="flex items-center justify-around px-2 py-2">
        {[
          { icon: Home, label: 'Today' },
          { icon: Pill, label: 'Meds' },
          { icon: Calendar, label: 'Calendar' },
          { icon: MessageSquare, label: 'Messages' },
          { icon: SettingsIcon, label: 'Settings', active: true },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[56px] px-3 py-2 rounded-xl ${
                item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  </div>
);

const LoginDemo = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-700 px-6">
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center">
          <Pill className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">CareConnect</h1>
        <p className="text-blue-100">Manage your health with ease</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
          />
        </div>

        <button className="w-full min-h-[56px] bg-blue-600 text-white rounded-xl font-medium">
          Sign In
        </button>
      </div>
    </div>
  </div>
);

const OnboardingDemo = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-700 px-6">
    <div className="w-full max-w-sm text-center">
      <div className="w-24 h-24 bg-white rounded-3xl mx-auto mb-6 flex items-center justify-center">
        <Smartphone className="w-12 h-12 text-blue-600" />
      </div>

      <h1 className="text-3xl font-bold text-white mb-4">Choose Your Hand</h1>
      <p className="text-blue-100 mb-8">
        We'll optimize the interface for your comfort
      </p>

      <div className="space-y-4">
        <button className="w-full min-h-[64px] bg-white text-gray-900 rounded-2xl font-medium shadow-lg flex items-center justify-center gap-3">
          <span>👈</span>
          <span>Left Hand</span>
        </button>

        <button className="w-full min-h-[64px] bg-white/20 text-white border-2 border-white rounded-2xl font-medium flex items-center justify-center gap-3">
          <span>👉</span>
          <span>Right Hand</span>
        </button>
      </div>
    </div>
  </div>
);
