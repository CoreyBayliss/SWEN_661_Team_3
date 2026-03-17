import { useApp } from '../context/AppContext';
import { Plus, Pill, Clock, ChevronRight, Star, AlertCircle } from 'lucide-react';
import { Link } from './Link';

export const MedicationList = () => {
  const { medications, leftHandMode, favorites, toggleFavorite, navigate } = useApp();
  const isFavorite = favorites.includes('/medications');

  return (
    <div className="min-h-screen bg-gray-50 max-w-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 landscape:px-4 py-4 landscape:py-3 sticky top-0 z-10 safe-area-top landscape-compact-header">
        <h1 className="text-2xl landscape:text-xl font-bold text-gray-900">Medications</h1>
      </div>

      <div className="px-6 landscape:px-4 py-6 landscape:py-4 space-y-6 landscape:space-y-4 landscape-content">
        {medications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Pill className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No Medications Yet</h3>
            <p className="text-gray-600 text-sm mb-4">Add your first medication to get started with reminders.</p>
            <Link
              to="/medications/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors min-h-[56px]"
            >
              <Plus className="w-5 h-5" />
              Add Medication
            </Link>
          </div>
        ) : (
          medications.map((med) => {
            const needsRefill = med.refillsRemaining <= 1;
            const nextDose = med.times[0];
            
            return (
              <Link
                key={med.id}
                to={`/medications/${med.id}`}
                className="block bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Pill className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{med.name}</h3>
                        <p className="text-sm text-gray-600">{med.dose}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{med.frequency} • Next: {nextDose}</span>
                      </div>
                      
                      {needsRefill && (
                        <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                          <AlertCircle className="w-4 h-4" />
                          <span className="font-medium">{med.refillsRemaining} refill{med.refillsRemaining !== 1 ? 's' : ''} remaining</span>
                        </div>
                      )}
                      
                      {med.lastTaken && (
                        <p className="text-xs text-gray-500">
                          Last taken: {new Date(med.lastTaken.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};