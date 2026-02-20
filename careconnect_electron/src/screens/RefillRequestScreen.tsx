import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import './RefillRequestScreen.css';

const RefillRequestScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMedicationById } = useApp();
  const [notes, setNotes] = useState('');

  const medication = getMedicationById(id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Refill request submitted for ${medication?.name}`);
    navigate('/medications');
  };

  if (!medication) {
    return (
      <div className="refill-request-screen">
        <header className="screen-header">
          <button onClick={() => navigate('/medications')} className="back-btn">
            ← Back
          </button>
          <h1>Medication Not Found</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="refill-request-screen">
      <header className="screen-header">
        <button onClick={() => navigate(`/medications/${id}`)} className="back-btn">
          ← Back
        </button>
        <h1>Request Refill</h1>
      </header>

      <main className="screen-content">
        <section className="refill-info">
          <h2>Medication Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Name:</strong> {medication.name}
            </div>
            <div className="info-item">
              <strong>Dose:</strong> {medication.dose}
            </div>
            <div className="info-item">
              <strong>Current Refills:</strong> {medication.refillsRemaining}
            </div>
            <div className="info-item">
              <strong>Pharmacy:</strong> {medication.pharmacy}
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="refill-form">
          <div className="form-group">
            <label htmlFor="notes">Additional Notes (Optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information for your pharmacy..."
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Submit Refill Request
            </button>
            <button
              type="button"
              onClick={() => navigate(`/medications/${id}`)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RefillRequestScreen;
