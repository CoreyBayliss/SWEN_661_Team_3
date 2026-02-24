import { useApp } from '../context/AppContext';
import { 
  Bell, 
  Lock, 
  LogOut, 
  ChevronRight,
  Volume2,
  User as UserIcon,
  Hand
} from 'lucide-react';

export const Settings = () => {
  const { 
    notificationsEnabled,
    setNotificationsEnabled,
    leftHandMode,
    setLeftHandMode,
    logout,
  } = useApp();

  const handleLogout = () => {
    logout();
  };

  const settingsSections = [
    {
      title: 'Accessibility',
      description: 'Customize the interface for your needs',
      items: [
        {
          icon: Hand,
          label: 'Left-Hand Mode',
          description: 'Mirror layout for left-handed users (Ctrl+Shift+L)',
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
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Desktop Notifications',
          description: 'Show notifications for medications and appointments',
          type: 'toggle',
          value: notificationsEnabled,
          onChange: setNotificationsEnabled,
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          icon: Lock,
          label: 'Change Password',
          description: 'Update your account password',
          type: 'link',
        },
        {
          icon: Lock,
          label: 'Session Timeout',
          description: 'Currently: 15 minutes',
          type: 'link',
        },
      ],
    },
    {
      title: 'Reminders',
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
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 lg:py-6">
        <div className="max-w-5xl lg:max-w-6xl 2xl:max-w-7xl mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1 text-sm lg:text-base">Manage your account and preferences</p>
        </div>
      </div>

      <div className="max-w-5xl lg:max-w-6xl 2xl:max-w-7xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 lg:py-8 space-y-5 lg:space-y-6">
        {/* User Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 lg:p-8 text-white">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-8 h-8 lg:w-10 lg:h-10" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold">Current User</h2>
              <p className="text-blue-100 mt-1 text-sm lg:text-base">user@example.com</p>
            </div>
          </div>
        </div>

        {/* Settings Sections - Responsive grid */}
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5 lg:gap-6">
          {settingsSections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-5 lg:px-6 py-4 border-b border-gray-200">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">{section.title}</h3>
                {section.description && <p className="text-xs lg:text-sm text-gray-500 mt-1">{section.description}</p>}
              </div>
              <div className="divide-y divide-gray-100">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  
                  if (item.type === 'toggle') {
                    return (
                      <div key={itemIdx} className="px-5 lg:px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 lg:gap-4 flex-1">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-sm lg:text-base">{item.label}</p>
                              <p className="text-xs lg:text-sm text-gray-600 mt-0.5">{item.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => item.onChange?.(!item.value)}
                            className={`relative w-12 h-7 lg:w-14 lg:h-8 rounded-full transition-colors flex-shrink-0 ml-4 ${
                              item.value ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-5 h-5 lg:w-6 lg:h-6 bg-white rounded-full transition-transform shadow-sm ${
                                item.value ? 'translate-x-6 lg:translate-x-7' : 'translate-x-1'
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
                      className="w-full px-5 lg:px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 lg:gap-4 flex-1">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className="font-semibold text-gray-900 text-sm lg:text-base">{item.label}</p>
                            <p className="text-xs lg:text-sm text-gray-600 mt-0.5">{item.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* App Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md">
              <span className="text-white text-2xl lg:text-3xl font-bold">CC</span>
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900">CareConnect Desktop</h3>
            <p className="text-sm lg:text-base text-gray-600">Version 1.0.0</p>
            <p className="text-xs lg:text-sm text-gray-500 pt-2">Your health, simplified</p>
          </div>
        </div>

        {/* Logout */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="px-8 lg:px-12 py-3 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm lg:text-base"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};