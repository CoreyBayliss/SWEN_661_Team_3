import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import './MedicationDetailScreen.css';

const MedicationDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMedicationById, recordMedicationAction, deleteMedication } = useApp();

  const medication = getMedicationById(id || '');

  if (!medication) {
    return (
      <div className="medication-detail-screen">
        <header className="screen-header">
          <button onClick={() => navigate('/medications')} className="back-btn">
            ← Back
          </button>
          <h1>Medication Not Found</h1>
        </header>
      </div>
    );
  }

  const handleTaken = () => {
    recordMedicationAction(medication.id, 'taken');
    navigate('/medications');
  };

  const handleSkipped = () => {
    recordMedicationAction(medication.id, 'skipped');
    navigate('/medications');
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${medication.name}?`)) {
      deleteMedication(medication.id);
      navigate('/medications');
    }
  };

  return (
    <div className="medication-detail-screen">
      <header className="screen-header">
        <button onClick={() => navigate('/medications')} className="back-btn">
          ← Back
        </button>
        <h1>{medication.name}</h1>
        <button onClick={handleDelete} className="delete-btn">
          🗑️
        </button>
      </header>

      <main className="screen-content">
        <section className="detail-section">
          <h2>Medication Details</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Dose:</span>
              <span className="detail-value">{medication.dose}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Frequency:</span>
              <span className="detail-value">{medication.frequency}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Times:</span>
              <span className="detail-value">{medication.times.join(', ')}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Refills Remaining:</span>
              <span className={`detail-value ${medication.refillsRemaining < 2 ? 'low' : ''}`}>
                {medication.refillsRemaining}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Pharmacy:</span>
              <span className="detail-value">{medication.pharmacy}</span>
            </div>
          </div>
        </section>

        {medication.refillsRemaining < 2 && (
          <button
            onClick={() => navigate(`/refill-request/${medication.id}`)}
            className="btn-warning"
          >
            Request Refill
          </button>
        )}

        <section className="detail-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button onClick={handleTaken} className="btn-success">
              Mark as Taken
            </button>
            <button onClick={handleSkipped} className="btn-secondary">
              Mark as Skipped
            </button>
          </div>
        </section>

        {medication.history.length > 0 && (
          <section className="detail-section">
            <h2>History</h2>
            <ul className="history-list">
              {medication.history
                .slice()
                .reverse()
                .slice(0, 10)
                .map((action, index) => (
                  <li key={index} className={`history-item ${action.action}`}>
                    <span className="history-date">
                      {new Date(action.timestamp).toLocaleString()}
                    </span>
                    <span className="history-action">{action.action}</span>
                    <span className="history-user">{action.user}</span>
                  </li>
                ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default MedicationDetailScreen;
