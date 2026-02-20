import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import './SettingsScreen.css';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, logout } = useApp();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <div className="settings-screen">
      <header className="screen-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back
        </button>
        <h1>Settings</h1>
      </header>

      <main className="screen-content">
        <section className="settings-section">
          <h2>Accessibility</h2>

          <div className="setting-item">
            <label htmlFor="textSize">Text Size</label>
            <input
              id="textSize"
              type="range"
              min="12"
              max="24"
              value={settings.textSize}
              onChange={(e) =>
                updateSettings({ textSize: parseInt(e.target.value) })
              }
            />
            <span className="setting-value">{settings.textSize}px</span>
          </div>

          <div className="setting-item">
            <label htmlFor="highContrast">High Contrast Mode</label>
            <input
              id="highContrast"
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) =>
                updateSettings({ highContrast: e.target.checked })
              }
            />
          </div>

          <div className="setting-item">
            <label htmlFor="voiceEnabled">Voice Assistance</label>
            <input
              id="voiceEnabled"
              type="checkbox"
              checked={settings.voiceEnabled}
              onChange={(e) =>
                updateSettings({ voiceEnabled: e.target.checked })
              }
            />
          </div>

          <div className="setting-item">
            <label htmlFor="notifications">Notifications</label>
            <input
              id="notifications"
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={(e) =>
                updateSettings({ notificationsEnabled: e.target.checked })
              }
            />
          </div>
        </section>

        <section className="settings-section">
          <h2>Account</h2>
          <button onClick={handleLogout} className="btn-danger">
            Log Out
          </button>
        </section>

        <section className="settings-section">
          <h2>About</h2>
          <p>CareConnect v1.0.0</p>
          <p>© 2026 SWEN 661 Team 3</p>
        </section>
      </main>
    </div>
  );
};

export default SettingsScreen;
