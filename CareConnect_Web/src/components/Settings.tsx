import { useApp } from '../context/AppContext';
import { 
  Hand, 
  Fingerprint, 
  Bell, 
  Lock, 
  LogOut, 
  ChevronRight,
  Smartphone,
  Volume2
} from 'lucide-react';

export const Settings = () => {
  const { 
    leftHandMode, 
    setLeftHandMode, 
    biometricEnabled, 
    setBiometricEnabled,
    logout,
    navigate
  } = useApp();

  const handleLogout = () => {
    logout();
  };

  const settingsSections = [
    {
      title: 'Accessibility',
      items: [
        {
          icon: Hand,
          label: 'Left-Hand Mode',
          description: 'Optimize layout for left-hand use',
          type: 'toggle',
          value: leftHandMode,
          onChange: setLeftHandMode,
        },
        {
          icon: Volume2,
          label: 'Text-to-Speech',
          description: 'Read page content aloud',
          type: 'link',
          action: () => {
            // This would trigger TTS in a real implementation
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance('This is a demo of text to speech functionality.');
              window.speechSynthesis.speak(utterance);
            }
          },
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          icon: Fingerprint,
          label: 'Biometric Authentication',
          description: 'Use Face ID or Touch ID',
          type: 'toggle',
          value: biometricEnabled,
          onChange: setBiometricEnabled,
        },
        {
          icon: Lock,
          label: 'Change Passcode',
          description: 'Update your security passcode',
          type: 'link',
        },
        {
          icon: Smartphone,
          label: 'Session Timeout',
          description: 'Currently: 15 minutes',
          type: 'link',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Medication Reminders',
          description: '30 min before + at scheduled time',
          type: 'link',
        },
        {
          icon: Bell,
          label: 'Appointment Reminders',
          description: '1 day + 1 hour before',
          type: 'link',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-w-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 landscape:px-4 py-4 landscape:py-3 sticky top-0 z-10 safe-area-top landscape-compact-header">
        <h1 className="text-2xl landscape:text-xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="px-6 landscape:px-4 py-6 landscape:py-4 space-y-6 landscape:space-y-4 landscape-content">
        {/* User Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-sm p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">CU</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">Current User</h2>
              <p className="text-blue-100 text-sm">user@example.com</p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                
                if (item.type === 'toggle') {
                  return (
                    <div key={itemIdx} className="px-6 py-4">
                      <div className="flex items-center justify-between min-h-[56px]">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => item.onChange?.(!item.value)}
                          className={`relative w-14 h-8 rounded-full transition-colors flex-shrink-0 ml-3 ${
                            item.value ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                              item.value ? 'translate-x-7' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={itemIdx}
                    onClick={item.action}
                    className="w-full px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between min-h-[56px]">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">CC</span>
            </div>
            <h3 className="font-semibold text-gray-900">CareConnect</h3>
            <p className="text-sm text-gray-600">Version 1.0.0</p>
            <p className="text-xs text-gray-500 pt-2">Your health, simplified</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`w-full px-8 py-4 bg-red-600 text-white rounded-xl font-medium shadow-sm hover:bg-red-700 transition-colors min-h-[56px] flex items-center justify-center gap-2`}
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        {/* Safe Area Bottom Padding */}
        <div className="h-4" />
      </div>
    </div>
  );
};