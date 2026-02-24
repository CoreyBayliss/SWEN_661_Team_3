import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, Star } from 'lucide-react';
import { useFormNavigation } from '../hooks/useFormNavigation';
import { useListNavigation } from '../hooks/useListNavigation';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

export const Calendar = () => {
  const { appointments, addAppointment, leftHandMode, favorites, toggleFavorite, navigate } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
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

  // List navigation for appointments
  const { containerRef, focusedIndex } = useListNavigation({
    itemCount: selectedAppointments.length,
    onSelect: (index) => {
      // Could navigate to appointment detail if we had that view
      console.log('Selected appointment:', selectedAppointments[index]);
    },
    orientation: 'vertical',
  });

  // Quick action shortcuts
  useKeyboardShortcuts([
    {
      key: 'n',
      ctrl: true,
      callback: () => setShowAddForm(true),
      description: 'Add new appointment',
    },
  ]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (formData.title && formData.date && formData.time) {
      addAppointment(formData);
      setFormData({ title: '', date: '', time: '', location: '', provider: '' });
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
  };

  // Form keyboard navigation
  useFormNavigation(formRef, {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  });

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

        <form ref={formRef} onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
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
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 lg:py-6">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Calendar & Appointments</h1>
            <p className="text-gray-600 mt-1 text-sm lg:text-base">Manage your schedule</p>
          </div>
          <button
            onClick={() => toggleFavorite('/calendar')}
            className={`p-2 lg:p-3 rounded-lg transition-colors ${
              isFavorite ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`w-5 h-5 lg:w-6 lg:h-6 ${isFavorite ? 'fill-yellow-500' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 lg:py-8">
        {/* Two Column Layout on larger screens */}
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-5 lg:gap-6">
          {/* Calendar View - Takes more space on ultra-wide */}
          <div className="2xl:col-span-2 space-y-5 lg:space-y-6">
            {/* Month Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-5">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={previousMonth}
                  className={`p-2 lg:p-3 hover:bg-gray-100 rounded-lg transition-colors ${
                    leftHandMode ? 'order-2' : ''
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
                <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={nextMonth}
                  className={`p-2 lg:p-3 hover:bg-gray-100 rounded-lg transition-colors ${
                    leftHandMode ? 'order-1' : ''
                  }`}
                >
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 lg:gap-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-xs lg:text-sm font-medium text-gray-500 py-2">
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
                <div className="divide-y divide-gray-100" ref={containerRef}>
                  {selectedAppointments.map((apt, index) => (
                    <div key={apt.id} className={`p-4 ${focusedIndex === index ? 'bg-gray-100' : ''}`}>
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

          {/* Add Appointment Button */}
          <div className="2xl:col-span-1">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:bg-blue-700 transition-colors min-h-[56px]"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};