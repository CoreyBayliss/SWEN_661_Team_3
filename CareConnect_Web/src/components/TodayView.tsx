import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Pill, Calendar, MessageSquare, Plus, Clock, CheckCircle2, XCircle, Star, ArrowRight, Undo2 } from 'lucide-react';
import { Link } from './Link';

export const TodayView = () => {
  const { medications, appointments, leftHandMode, takeMedication, skipMedication, undoLastAction, favorites, navigate } = useApp();
  const [lastAction, setLastAction] = useState<{ medId: string; action: 'taken' | 'skipped' } | null>(null);

  // Get today's date
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();
  const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

  // Filter medications due today
  const dueMedications = medications.filter(med => {
    // Check if any scheduled time is due (within next hour or past due)
    return med.times.some(time => {
      const [hour, minute] = time.split(':').map(Number);
      const medTime = hour * 60 + minute;
      const currentTimeMinutes = currentHour * 60 + currentMinute;
      const timeDiff = medTime - currentTimeMinutes;
      
      // Due if within next 60 minutes or past due (up to 4 hours)
      return timeDiff >= -240 && timeDiff <= 60;
    });
  });

  // Filter today's appointments
  const todayAppointments = appointments.filter(apt => apt.date === todayStr);

  const handleTaken = (medId: string) => {
    takeMedication(medId, 'Current User');
    setLastAction({ medId, action: 'taken' });
    setTimeout(() => setLastAction(null), 5000); // Clear after 5 seconds
  };

  const handleSkip = (medId: string) => {
    skipMedication(medId, 'Current User');
    setLastAction({ medId, action: 'skipped' });
    setTimeout(() => setLastAction(null), 5000);
  };

  const handleUndo = (medId: string) => {
    undoLastAction(medId);
    setLastAction(null);
  };

  const quickActions = [
    { icon: Pill, label: 'Add Medication', path: '/medications/add', color: 'bg-blue-600' },
    { icon: Calendar, label: 'Schedule', path: '/calendar', color: 'bg-green-600' },
    { icon: MessageSquare, label: 'Quick Message', path: '/communications', color: 'bg-purple-600' },
  ];

  // Favorite shortcuts
  const favoriteLinks = [
    { path: '/medications', label: 'All Medications', icon: Pill },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/communications', label: 'Messages', icon: MessageSquare },
  ];

  const activeFavorites = favoriteLinks.filter(link => favorites.includes(link.path));

  return (
    <div className="min-h-screen bg-gray-50 max-w-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8 landscape:py-4 pb-6 landscape:pb-4 safe-area-top landscape-compact-header">
        <div className="flex items-center justify-between mb-6 landscape:mb-3">
          <div>
            <h1 className="text-3xl landscape:text-2xl font-bold">Today</h1>
            <p className="text-blue-100 mt-1 landscape:text-sm">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 landscape:gap-2">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                to={action.path}
                className={`${action.color} rounded-2xl landscape:rounded-xl p-4 landscape:p-3 min-h-[80px] landscape:min-h-[60px] flex flex-col items-center justify-center gap-2 landscape:gap-1 shadow-md hover:opacity-90 transition-opacity`}
              >
                <Icon className="w-6 h-6 landscape:w-5 landscape:h-5" />
                <span className="text-xs font-medium text-center">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="px-6 landscape:px-4 py-6 landscape:py-4 space-y-6 landscape:space-y-4 landscape-content">
        {/* Favorites */}
        {activeFavorites.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <h2 className="font-semibold text-gray-900">Favorites</h2>
            </div>
            <div className="space-y-2">
              {activeFavorites.map((fav) => {
                const Icon = fav.icon;
                return (
                  <Link
                    key={fav.path}
                    to={fav.path}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors min-h-[56px]"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{fav.label}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Due Medications */}
        {dueMedications.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">Medications Due</h2>
              </div>
              <Link to="/medications" className="text-blue-600 text-sm font-medium hover:text-blue-700">
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {dueMedications.map((med) => {
                const nextDoseTime = med.times[0];
                const showUndo = lastAction?.medId === med.id;
                
                return (
                  <div key={med.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{med.name}</h3>
                        <p className="text-sm text-gray-600">{med.dose} • {med.frequency}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">Next: {nextDoseTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {showUndo ? (
                      <div className="flex items-center gap-3">
                        <div className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl ${
                          lastAction.action === 'taken' 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-gray-50 text-gray-700'
                        }`}>
                          {lastAction.action === 'taken' ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <XCircle className="w-5 h-5" />
                          )}
                          <span className="text-sm font-medium">
                            {lastAction.action === 'taken' ? 'Marked as Taken' : 'Marked as Skipped'}
                          </span>
                        </div>
                        <button
                          onClick={() => handleUndo(med.id)}
                          className={`px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[56px] min-h-[56px] ${
                            leftHandMode ? 'order-first' : ''
                          }`}
                        >
                          <Undo2 className="w-5 h-5" />
                          Undo
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleTaken(med.id)}
                          className={`flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors min-h-[56px] ${
                            leftHandMode ? 'order-1' : 'order-2'
                          }`}
                        >
                          Taken
                        </button>
                        <button
                          onClick={() => handleSkip(med.id)}
                          className={`px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors min-w-[56px] min-h-[56px] ${
                            leftHandMode ? 'order-2' : 'order-1'
                          }`}
                        >
                          Skip
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Today's Appointments */}
        {todayAppointments.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <h2 className="font-semibold text-gray-900">Today's Appointments</h2>
              </div>
              <Link to="/calendar" className="text-blue-600 text-sm font-medium hover:text-blue-700">
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {todayAppointments.map((apt) => (
                <Link
                  key={apt.id}
                  to="/calendar"
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{apt.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{apt.provider}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {apt.time}
                        </div>
                        <span>{apt.location}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 ml-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {dueMedications.length === 0 && todayAppointments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600 text-sm">No medications or appointments due right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};