import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import './CalendarScreen.css';

const CalendarScreen: React.FC = () => {
  const navigate = useNavigate();
  const { appointments } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedAppointments = appointments.filter(
    (appt) => appt.date.toDateString() === selectedDate.toDateString()
  );

  const upcomingAppointments = appointments
    .filter((appt) => appt.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="calendar-screen">
      <header className="screen-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back
        </button>
        <h1>Calendar</h1>
      </header>

      <main className="screen-content">
        <section className="calendar-section">
          <h2>Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="appointments-list">
              {upcomingAppointments.map((appt) => (
                <div key={appt.id} className="appointment-card">
                  <div className="appointment-date">
                    <span className="date-day">{appt.date.getDate()}</span>
                    <span className="date-month">
                      {appt.date.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div className="appointment-details">
                    <h3>{appt.title}</h3>
                    <p>
                      <strong>Time:</strong> {appt.time}
                    </p>
                    <p>
                      <strong>Location:</strong> {appt.location}
                    </p>
                    <p>
                      <strong>Provider:</strong> {appt.provider}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No upcoming appointments</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default CalendarScreen;
