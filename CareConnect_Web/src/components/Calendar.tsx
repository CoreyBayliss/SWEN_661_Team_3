import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, Star } from 'lucide-react';

export const Calendar = () => {
  const { appointments, addAppointment, leftHandMode, favorites, toggleFavorite } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    provider: '',
  });

  const isFavorite = favorites.includes('/calendar');

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
  };

  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const selectedAppointments = appointments.filter(apt => apt.date === selectedDateStr);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.date && formData.time) {
      addAppointment(formData);
      setFormData({ title: '', date: '', time: '', location: '', provider: '' });
      setShowAddForm(false);
    }
  };

  // Check if a date has appointments
  const hasAppointment = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    return appointments.some(apt => apt.date === dateStr);
  };

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddForm(false)}
              className={`p-3 hover:bg-gray-100 rounded-xl transition-colors min-w-[56px] min-h-[56px] flex items-center justify-center ${
                leftHandMode ? 'order-2 ml-auto' : ''
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className={`text-2xl font-bold text-gray-900 ${leftHandMode ? 'order-1' : ''}`}>
              New Appointment
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 min-h-[56px]"
                placeholder="e.g., Dr. Smith - Follow-up"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 min-h-[56px]"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 min-h-[56px]"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
                Provider
              </label>
              <input
                type="text"
                id="provider"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 min-h-[56px]"
                placeholder="Doctor or provider name"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 min-h-[56px]"
                placeholder="Clinic or hospital name"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!formData.title || !formData.date || !formData.time}
            className={`w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 min-h-[56px]`}
          >
            Add Appointment
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 landscape:px-4 py-4 landscape:py-3 sticky top-0 z-10 safe-area-top landscape-compact-header">
        <h1 className="text-2xl landscape:text-xl font-bold text-gray-900">Calendar & Appointments</h1>
      </div>

      <div className="px-6 landscape:px-4 py-6 landscape:py-4 space-y-6 landscape:space-y-4 landscape-content">
        {/* Month Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={previousMonth}
              className={`p-3 hover:bg-gray-100 rounded-xl transition-colors min-w-[56px] min-h-[56px] flex items-center justify-center ${
                leftHandMode ? 'order-2' : ''
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className={`p-3 hover:bg-gray-100 rounded-xl transition-colors min-w-[56px] min-h-[56px] flex items-center justify-center ${
                leftHandMode ? 'order-1' : ''
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
              const isSelected = dateStr === selectedDateStr;
              const isToday = dateStr === new Date().toISOString().split('T')[0];
              const hasApt = hasAppointment(day);
              
              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-colors min-h-[56px] ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : isToday
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm">{day}</span>
                  {hasApt && (
                    <div className={`absolute bottom-1 w-1 h-1 rounded-full ${
                      isSelected ? 'bg-white' : 'bg-blue-600'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Appointments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
          </div>
          
          {selectedAppointments.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {selectedAppointments.map(apt => (
                <div key={apt.id} className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{apt.title}</h4>
                  <div className="space-y-2">
                    {apt.provider && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        {apt.provider}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {apt.time}
                    </div>
                    {apt.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {apt.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No appointments scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};