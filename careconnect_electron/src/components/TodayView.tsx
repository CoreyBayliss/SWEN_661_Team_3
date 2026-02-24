import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Pill, Calendar, MessageSquare, Plus, Clock, CheckCircle2, XCircle, Star, ArrowRight, Undo2, Activity } from 'lucide-react';
import { Link } from './Link';

export const TodayView = () => {
  const { medications, appointments, takeMedication, skipMedication, undoLastAction, favorites, navigate, leftHandMode } = useApp();
  const [lastAction, setLastAction] = useState<{ medId: string; action: 'taken' | 'skipped' } | null>(null);

  // Get today's date
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();

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
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 lg:py-6">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1 text-sm lg:text-base">
                {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 lg:px-4 py-2 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span className="text-xs lg:text-sm font-medium">All Systems Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 lg:py-8">
        {/* Quick Actions - Responsive grid */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 mb-6 lg:mb-8">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                to={action.path}
                className={`${action.color} rounded-xl p-4 lg:p-5 xl:p-6 flex items-center gap-3 lg:gap-4 shadow-md hover:shadow-lg transition-all text-white group`}
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0">
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <span className="font-semibold text-sm lg:text-base xl:text-lg">{action.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Main Grid Layout - Responsive columns */}
        <div className={`grid lg:grid-cols-3 2xl:grid-cols-5 gap-4 lg:gap-6 ${leftHandMode ? 'direction-rtl' : ''}`}>
          {/* Left/Right Column - Medications & Favorites */}
          <div className={`lg:col-span-2 2xl:col-span-3 space-y-4 lg:space-y-6 ${leftHandMode ? 'order-2' : 'order-1'}`}>
            {/* Due Medications */}
            {dueMedications.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between p-5 lg:p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Pill className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Medications Due</h2>
                  </div>
                  <Link to="/medications" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 text-sm lg:text-base">
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {dueMedications.map((med) => {
                    const nextDoseTime = med.times[0];
                    const showUndo = lastAction?.medId === med.id;
                    
                    return (
                      <div key={med.id} className="p-5 lg:p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-base lg:text-lg font-semibold text-gray-900">{med.name}</h3>
                            <p className="text-sm lg:text-base text-gray-600">{med.dose} • {med.frequency}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-xs lg:text-sm text-gray-500">Next dose: {nextDoseTime}</span>
                            </div>
                          </div>
                        </div>
                        
                        {showUndo ? (
                          <div className={`flex items-center gap-3 ${leftHandMode ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg ${
                              lastAction.action === 'taken' 
                                ? 'bg-green-50 text-green-700' 
                                : 'bg-gray-50 text-gray-700'
                            }`}>
                              {lastAction.action === 'taken' ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <XCircle className="w-5 h-5" />
                              )}
                              <span className="font-medium text-sm lg:text-base">
                                {lastAction.action === 'taken' ? 'Marked as Taken' : 'Marked as Skipped'}
                              </span>
                            </div>
                            <button
                              onClick={() => handleUndo(med.id)}
                              className="px-4 lg:px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm lg:text-base"
                            >
                              <Undo2 className="w-5 h-5" />
                              Undo
                            </button>
                          </div>
                        ) : (
                          <div className={`flex gap-3 ${leftHandMode ? 'flex-row-reverse' : ''}`}>
                            <button
                              onClick={() => handleSkip(med.id)}
                              className="px-4 lg:px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm lg:text-base"
                            >
                              Skip
                            </button>
                            <button
                              onClick={() => handleTaken(med.id)}
                              className="flex-1 px-4 lg:px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm lg:text-base"
                            >
                              Mark as Taken
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Favorites */}
            {activeFavorites.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Quick Access</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {activeFavorites.map((fav) => {
                    const Icon = fav.icon;
                    return (
                      <Link
                        key={fav.path}
                        to={fav.path}
                        className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                      >
                        <Icon className="w-6 h-6 text-gray-600 mb-2" />
                        <span className="text-sm font-medium text-gray-900">{fav.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty State */}
            {dueMedications.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 lg:p-12 text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
                <p className="text-sm lg:text-base text-gray-600">No medications due right now.</p>
              </div>
            )}
          </div>

          {/* Right/Left Column - Today's Appointments */}
          <div className={`lg:col-span-1 2xl:col-span-2 space-y-4 lg:space-y-6 ${leftHandMode ? 'order-1' : 'order-2'}`}>
            {todayAppointments.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between p-5 lg:p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Today</h2>
                  </div>
                  <Link to="/calendar" className="text-blue-600 font-medium hover:text-blue-700 text-sm">
                    View Calendar
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {todayAppointments.map((apt) => (
                    <Link
                      key={apt.id}
                      to="/calendar"
                      className="block p-5 lg:p-6 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">{apt.title}</h3>
                      <p className="text-xs lg:text-sm text-gray-600 mb-3">{apt.provider}</p>
                      <div className="flex flex-col gap-2 text-xs lg:text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {apt.time}
                        </div>
                        <div>{apt.location}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8 text-center">
                <Calendar className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">No Appointments</h3>
                <p className="text-xs lg:text-sm text-gray-600">Your schedule is clear today.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};