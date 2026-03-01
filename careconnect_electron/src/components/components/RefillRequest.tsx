import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const RefillRequest = () => {
  const { medications, leftHandMode, navigate } = useApp();
  const [submitted, setSubmitted] = useState(false);
  
  const medication = medications.find(m => m.id === '1'); // Assuming '1' is the ID of the medication for demonstration

  if (!medication) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Navigate to the medication details page after 2 seconds
      navigate('/medications/1');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Refill Requested!</h2>
          <p className="text-gray-600">
            Your refill request has been sent to {medication.pharmacy}. They'll contact you when it's ready.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 landscape:px-4 py-4 landscape:py-3 sticky top-0 z-10 safe-area-top landscape-compact-header">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/medications/1')}
            className={`p-3 hover:bg-gray-100 rounded-xl transition-colors min-w-[56px] min-h-[56px] flex items-center justify-center ${
              leftHandMode ? 'order-2 ml-auto' : ''
            }`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className={`text-2xl font-bold text-gray-900 ${leftHandMode ? 'order-1' : ''}`}>
            Request Refill
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        {/* Medication Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Medication</h3>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-900">{medication.name}</p>
            <p className="text-gray-600">{medication.dose}</p>
            <p className="text-sm text-gray-500">Current refills: {medication.refillsRemaining}</p>
          </div>
        </div>

        {/* Pharmacy Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Pharmacy</h3>
          <p className="text-gray-900">{medication.pharmacy}</p>
          <p className="text-sm text-gray-500 mt-2">
            Your refill request will be sent to this pharmacy.
          </p>
        </div>

        {/* Quantity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <label htmlFor="quantity" className="block font-semibold text-gray-900 mb-4">
            Quantity
          </label>
          <select
            id="quantity"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-white min-h-[56px]"
            defaultValue="30"
          >
            <option value="30">30-day supply</option>
            <option value="60">60-day supply</option>
            <option value="90">90-day supply</option>
          </select>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <label htmlFor="notes" className="block font-semibold text-gray-900 mb-4">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            rows={4}
            inputMode="text"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 resize-none"
            placeholder="Any special instructions..."
          />
          <p className="text-xs text-gray-500 mt-2">
            Tip: Use voice-to-text from your keyboard for easier input
          </p>
        </div>

        {/* Submit */}
        <div className="space-y-3">
          <button
            type="submit"
            className={`w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:bg-blue-700 transition-colors min-h-[56px]`}
          >
            Submit Refill Request
          </button>
          <button
            type="button"
            onClick={() => navigate('/medications/1')}
            className={`w-full px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors min-h-[56px]`}
          >
            Cancel
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center px-4">
          You'll receive a notification when your refill is ready for pickup
        </p>
      </form>
    </div>
  );
};