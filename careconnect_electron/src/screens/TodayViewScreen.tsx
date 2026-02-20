import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import './TodayViewScreen.css';

const TodayViewScreen: React.FC = () => {
  const navigate = useNavigate();
  const { medications, appointments, recordMedicationAction } = useApp();

  const today = new Date();
  const todaysMedications = medications.filter((med) =>
    med.times.some(() => true) // All medications for simplicity
  );

  const todaysAppointments = appointments.filter(
    (appt) => appt.date.toDateString() === today.toDateString()
  );

  return (
    <div className="today-view-screen">
      <header className="screen-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back
        </button>
        <h1>Today's Schedule</h1>
      </header>

      <main className="screen-content">
        <div className="date-display">
          <h2>{today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
        </div>

        <section className="today-section">
          <h3>Medications ({todaysMedications.length})</h3>
          {todaysMedications.length > 0 ? (
            <div className="today-list">
              {todaysMedications.map((med) => (
                <div key={med.id} className="today-item medication-item">
                  <div className="item-info">
                    <strong>{med.name}</strong> - {med.dose}
                    <br />
                    <small>Times: {med.times.join(', ')}</small>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => recordMedicationAction(med.id, 'taken')}
                      className="btn-sm btn-success"
                    >
                      Taken
                    </button>
                    <button
                      onClick={() => recordMedicationAction(med.id, 'skipped')}
                      className="btn-sm btn-secondary"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No medications scheduled for today</p>
          )}
        </section>

        <section className="today-section">
          <h3>Appointments ({todaysAppointments.length})</h3>
          {todaysAppointments.length > 0 ? (
            <div className="today-list">
              {todaysAppointments.map((appt) => (
                <div key={appt.id} className="today-item appointment-item">
                  <div className="item-info">
                    <strong>{appt.title}</strong>
                    <br />
                    <small>
                      {appt.time} - {appt.location}
                    </small>
                    <br />
                    <small>{appt.provider}</small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No appointments scheduled for today</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default TodayViewScreen;
