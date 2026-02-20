import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import './AddMedicationScreen.css';

const AddMedicationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addMedication } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    frequency: 'Once daily',
    times: ['09:00'],
    refillsRemaining: 3,
    pharmacy: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMedication(formData);
    navigate('/medications');
  };

  const handleAddTime = () => {
    setFormData({ ...formData, times: [...formData.times, '12:00'] });
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({ ...formData, times: newTimes });
  };

  const handleRemoveTime = (index: number) => {
    if (formData.times.length > 1) {
      const newTimes = formData.times.filter((_, i) => i !== index);
      setFormData({ ...formData, times: newTimes });
    }
  };

  return (
    <div className="add-medication-screen">
      <header className="screen-header">
        <button onClick={() => navigate('/medications')} className="back-btn">
          ← Cancel
        </button>
        <h1>Add Medication</h1>
      </header>

      <main className="screen-content">
        <form onSubmit={handleSubmit} className="medication-form">
          <div className="form-group">
            <label htmlFor="name">Medication Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dose">Dose *</label>
            <input
              id="dose"
              type="text"
              value={formData.dose}
              onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
              placeholder="e.g., 10mg"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="frequency">Frequency *</label>
            <select
              id="frequency"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            >
              <option>Once daily</option>
              <option>Twice daily</option>
              <option>Three times daily</option>
              <option>As needed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Times *</label>
            {formData.times.map((time, index) => (
              <div key={index} className="time-input-group">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  required
                />
                {formData.times.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTime(index)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddTime} className="btn-secondary">
              + Add Time
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="refills">Refills Remaining *</label>
            <input
              id="refills"
              type="number"
              min="0"
              value={formData.refillsRemaining}
              onChange={(e) =>
                setFormData({ ...formData, refillsRemaining: parseInt(e.target.value) })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pharmacy">Pharmacy *</label>
            <input
              id="pharmacy"
              type="text"
              value={formData.pharmacy}
              onChange={(e) => setFormData({ ...formData, pharmacy: e.target.value })}
              placeholder="e.g., CVS Pharmacy - Main St"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Add Medication
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddMedicationScreen;
