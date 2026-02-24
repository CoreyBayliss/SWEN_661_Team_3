import { useApp } from '../context/AppContext';
import { Plus, Pill, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { Link } from './Link';
import { useListNavigation } from '../hooks/useListNavigation';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

export const MedicationList = () => {
  const { medications, navigate } = useApp();

  // Keyboard navigation for medication list
  const { containerRef, focusedIndex } = useListNavigation({
    itemCount: medications.length,
    onSelect: (index) => {
      const med = medications[index];
      if (med) navigate(`/medications/${med.id}`);
    },
    orientation: 'grid',
    gridColumns: window.innerWidth >= 1536 ? 3 : window.innerWidth >= 1024 ? 2 : 1,
  });

  // Quick action shortcuts
  useKeyboardShortcuts([
    {
      key: 'n',
      ctrl: true,
      callback: () => navigate('/medications/add'),
      description: 'Add new medication',
    },
  ]);

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 lg:py-6">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Medications</h1>
            <p className="text-gray-600 mt-1 text-sm lg:text-base">Manage your medication schedule</p>
          </div>
          <Link
            to="/medications/add"
            className="flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Add new medication (Ctrl+N)"
          >
            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
            Add Medication
          </Link>
        </div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 lg:py-8">
        {medications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 lg:p-12 text-center">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Pill className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">No Medications Yet</h3>
            <p className="text-sm lg:text-base text-gray-600 mb-6">Add your first medication to get started with reminders.</p>
            <Link
              to="/medications/add"
              className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-5 h-5" />
              Add Medication
            </Link>
          </div>
        ) : (
          <div 
            ref={containerRef as any}
            className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-5 xl:gap-6"
            role="list"
            aria-label="Medication list"
          >
            {medications.map((med, index) => {
              const needsRefill = med.refillsRemaining <= 1;
              const nextDose = med.times[0];
              const isFocused = focusedIndex === index;
              
              return (
                <Link
                  key={med.id}
                  to={`/medications/${med.id}`}
                  data-list-item
                  tabIndex={0}
                  role="listitem"
                  aria-label={`${med.name} ${med.dose}, ${med.frequency}, ${needsRefill ? 'needs refill' : ''}`}
                  className={`block bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:p-6 hover:shadow-md hover:border-blue-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isFocused ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Pill className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900">{med.name}</h3>
                          <p className="text-sm lg:text-base text-gray-600">{med.dose}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm lg:text-base">{med.frequency} • Next: {nextDose}</span>
                        </div>
                        
                        {needsRefill && (
                          <div className="flex items-center gap-2 text-sm lg:text-base text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
                            <AlertCircle className="w-4 h-4" />
                            <span className="font-medium">{med.refillsRemaining} refill{med.refillsRemaining !== 1 ? 's' : ''} remaining</span>
                          </div>
                        )}
                        
                        {med.lastTaken && (
                          <p className="text-xs lg:text-sm text-gray-500">
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
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};