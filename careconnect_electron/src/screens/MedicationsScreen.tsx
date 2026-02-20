import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import './MedicationsScreen.css';

const MedicationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { medications } = useApp();

  return (
    <div className="medications-screen">
      <header className="screen-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back
        </button>
        <h1>Medications</h1>
        <button onClick={() => navigate('/medications/add')} className="add-btn">
          + Add
        </button>
      </header>

      <main className="screen-content">
        {medications.length > 0 ? (
          <div className="medications-list">
            {medications.map((med) => (
              <div
                key={med.id}
                className="medication-card"
                onClick={() => navigate(`/medications/${med.id}`)}
              >
                <div className="medication-header">
                  <h3>{med.name}</h3>
                  <span className="medication-dose">{med.dose}</span>
                </div>
                <p className="medication-frequency">{med.frequency}</p>
                <div className="medication-details">
                  <span>Times: {med.times.join(', ')}</span>
                  <span className={med.refillsRemaining < 2 ? 'refills-low' : ''}>
                    Refills: {med.refillsRemaining}
                  </span>
                </div>
                <p className="medication-pharmacy">{med.pharmacy}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No medications added yet</p>
            <button onClick={() => navigate('/medications/add')} className="btn-primary">
              Add Your First Medication
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MedicationsScreen;
