import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import './HomeScreen.css';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { medications, appointments, favorites, toggleFavorite } = useApp();

  const todaysMedications = medications.filter((med) =>
    med.times.some((time) => {
      const now = new Date();
      const [hour] = time.split(':').map(Number);
      return hour >= now.getHours();
    })
  );

  const upcomingAppointments = appointments
    .filter((appt) => appt.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  const quickActions = [
    { id: 'medications', label: 'Medications', path: '/medications', icon: '💊' },
    { id: 'today', label: "Today's Schedule", path: '/today', icon: '📅' },
    { id: 'calendar', label: 'Calendar', path: '/calendar', icon: '🗓️' },
    { id: 'communications', label: 'Communications', path: '/communications', icon: '💬' },
    { id: 'settings', label: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="home-screen">
      <header className="app-header">
        <h1>CareConnect</h1>
        <button onClick={() => navigate('/settings')} className="settings-btn">
          ⚙️
        </button>
      </header>

      <main className="home-content">
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            {quickActions.map((action) => (
              <div
                key={action.id}
                className="action-card"
                onClick={() => navigate(action.path)}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-label">{action.label}</span>
                <button
                  className={`favorite-btn ${favorites.has(action.path) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(action.path);
                  }}
                >
                  ⭐
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="overview-section">
          <div className="overview-card">
            <h3>Today's Medications ({todaysMedications.length})</h3>
            {todaysMedications.length > 0 ? (
              <ul className="medication-list">
                {todaysMedications.slice(0, 3).map((med) => (
                  <li key={med.id}>
                    <strong>{med.name}</strong> - {med.dose}
                    <br />
                    <small>Next: {med.times[0]}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No medications scheduled for today</p>
            )}
            <button onClick={() => navigate('/today')} className="btn-link">
              View All →
            </button>
          </div>

          <div className="overview-card">
            <h3>Upcoming Appointments</h3>
            {upcomingAppointments.length > 0 ? (
              <ul className="appointment-list">
                {upcomingAppointments.map((appt) => (
                  <li key={appt.id}>
                    <strong>{appt.title}</strong>
                    <br />
                    <small>
                      {appt.date.toLocaleDateString()} at {appt.time}
                    </small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming appointments</p>
            )}
            <button onClick={() => navigate('/calendar')} className="btn-link">
              View Calendar →
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;
