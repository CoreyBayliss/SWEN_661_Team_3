import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useFormNavigation } from '../hooks/useFormNavigation';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

export const AddMedication = () => {
  const { addMedication, leftHandMode, navigate } = useApp();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    frequency: 'Once daily',
    times: ['09:00'],
    refillsRemaining: 3,
    pharmacy: 'CVS Pharmacy - Main St',
  });

  const frequencyOptions = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Every 4 hours',
    'Every 6 hours',
    'Every 8 hours',
    'Every 12 hours',
    'As needed',
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (formData.name && formData.dose && formData.times.length > 0) {
      addMedication(formData);
      navigate('/medications');
    }
  };

  const handleCancel = () => {
    navigate('/medications');
  };

  // Form keyboard navigation
  useFormNavigation(formRef, {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  });

  // Quick save shortcut
  useKeyboardShortcuts([
    {
      key: 's',
      ctrl: true,
      callback: () => handleSubmit(),
      description: 'Save medication',
    },
  ]);

  const addTime = () => {
    setFormData({
      ...formData,
      times: [...formData.times, '12:00'],
    });
  };

  const removeTime = (index: number) => {
    if (formData.times.length > 1) {
      setFormData({
        ...formData,
        times: formData.times.filter((_, i) => i !== index),
      });
    }
  };

  const updateTime = (index: number, value: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({ ...formData, times: newTimes });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 landscape:px-4 py-4 landscape:py-3 sticky top-0 z-10 safe-area-top landscape-compact-header">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className={`p-3 hover:bg-gray-100 rounded-xl transition-colors min-w-[56px] min-h-[56px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              leftHandMode ? 'order-2 ml-auto' : ''
            }`}
            aria-label="Cancel and go back (Esc)"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className={`text-2xl font-bold text-gray-900 ${leftHandMode ? 'order-1' : ''}`}>
            Add Medication
          </h1>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Medication Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 min-h-[56px]"
              placeholder="e.g., Lisinopril"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="dose" className="block font-semibold text-gray-900 mb-2 landscape:mb-1.5 landscape:text-sm">
              Dose *
            </label>
            <input
              type="text"
              inputMode="decimal"
              id="dose"
              name="dose"
              value={formData.dose}
              onChange={handleInputChange}
              className="w-full px-4 landscape:px-3 py-3 landscape:py-2.5 border-2 border-gray-200 rounded-xl landscape:rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 min-h-[56px] landscape:min-h-[48px] landscape:text-sm"
              placeholder="e.g., 10mg, 2 tablets"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <select
              id="frequency"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 bg-white min-h-[56px]"
            >
              {frequencyOptions.map((freq) => (
                <option key={freq} value={freq}>{freq}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Times */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Scheduled Times</h3>
            <button
              type="button"
              onClick={addTime}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Add another time"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {formData.times.map((time, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => updateTime(index, e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 min-h-[56px]"
                  aria-label={`Scheduled time ${index + 1}`}
                />
                {formData.times.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTime(index)}
                    className={`p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors min-w-[56px] min-h-[56px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                      leftHandMode ? 'order-first' : ''
                    }`}
                    aria-label={`Remove time ${index + 1}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Refill Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div>
            <label htmlFor="refills" className="block text-sm font-medium text-gray-700 mb-2">
              Refills Remaining
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="refills"
              name="refills"
              value={formData.refillsRemaining}
              onChange={(e) => setFormData({ ...formData, refillsRemaining: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 min-h-[56px]"
              min="0"
              aria-label="Number of refills remaining"
            />
          </div>

          <div>
            <label htmlFor="pharmacy" className="block text-sm font-medium text-gray-700 mb-2">
              Pharmacy
            </label>
            <input
              type="text"
              id="pharmacy"
              name="pharmacy"
              value={formData.pharmacy}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 min-h-[56px]"
              placeholder="Pharmacy name and location"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className={`sticky bottom-0 pb-6 ${leftHandMode ? 'text-left' : 'text-right'}`}>
          <button
            type="submit"
            disabled={!formData.name || !formData.dose}
            className={`px-8 py-4 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] min-h-[56px] ${
              leftHandMode ? 'float-left' : 'float-right'
            }`}
          >
            Add Medication
          </button>
        </div>
      </form>
    </div>
  );
};