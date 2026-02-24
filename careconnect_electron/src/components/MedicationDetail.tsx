import { useApp } from '../context/AppContext';
import { ArrowLeft, Clock, MapPin, Package, History, AlertCircle } from 'lucide-react';
import { Link } from './Link';

export const MedicationDetail = () => {
  const { medications, leftHandMode, currentPath, navigate } = useApp();
  
  // Extract medication ID from current path
  const pathParts = currentPath.split('/');
  const id = pathParts[pathParts.length - 1];
  
  const medication = medications.find(m => m.id === id);

  if (!medication) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Medication Not Found</h2>
          <button
            onClick={() => navigate('/medications')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Medications
          </button>
        </div>
      </div>
    );
  }

  const needsRefill = medication.refillsRemaining <= 1;

  return (
    <div className="min-h-screen bg-gray-50 max-w-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 landscape:px-4 py-4 landscape:py-3 sticky top-0 z-10 safe-area-top landscape-compact-header">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className={`p-3 hover:bg-gray-100 rounded-xl transition-colors min-w-[56px] min-h-[56px] flex items-center justify-center ${
              leftHandMode ? 'order-2 ml-auto' : ''
            }`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className={leftHandMode ? 'order-1' : ''}>
            <h1 className="text-2xl font-bold text-gray-900">{medication.name}</h1>
            <p className="text-sm text-gray-600">{medication.dose}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Refill Alert */}
        {needsRefill && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 mb-1">Low on Refills</h3>
                <p className="text-sm text-orange-800 mb-3">
                  You have {medication.refillsRemaining} refill{medication.refillsRemaining !== 1 ? 's' : ''} remaining.
                </p>
                <Link
                  to={`/medications/${id}/refill`}
                  className={`inline-block px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors min-h-[56px] flex items-center justify-center ${
                    leftHandMode ? 'float-left' : ''
                  }`}
                >
                  Request Refill
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Schedule */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900">Schedule</h2>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-2">Frequency</p>
              <p className="font-medium text-gray-900">{medication.frequency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Scheduled Times</p>
              <div className="flex flex-wrap gap-2">
                {medication.times.map((time, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pharmacy Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-900">Pharmacy</h2>
          </div>
          <p className="text-gray-900">{medication.pharmacy}</p>
          <div className="flex items-center gap-2 mt-3">
            <Package className="w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-600">
              {medication.refillsRemaining} refill{medication.refillsRemaining !== 1 ? 's' : ''} remaining
            </p>
          </div>
        </div>

        {/* History */}
        {medication.history.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-purple-600" />
              <h2 className="font-semibold text-gray-900">Recent History</h2>
            </div>
            <div className="space-y-3">
              {medication.history.slice(-5).reverse().map((entry, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    entry.action === 'taken' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 capitalize">{entry.action}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(entry.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-xs text-gray-500">by {entry.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};