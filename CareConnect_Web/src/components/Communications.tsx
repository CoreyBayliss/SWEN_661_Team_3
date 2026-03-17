import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, Mic, Star, CheckCircle2 } from 'lucide-react';

export const Communications = () => {
  const { messageTemplates, contacts, leftHandMode, favorites, toggleFavorite } = useApp();
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const isFavorite = favorites.includes('/communications');

  const handleQuickSend = (templateText: string, contactId: string) => {
    // Simulate sending message
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
  };

  const handleCustomSend = () => {
    if (customMessage && selectedContact) {
      setMessageSent(true);
      setCustomMessage('');
      setTimeout(() => setMessageSent(false), 3000);
    }
  };

  if (messageSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
          <p className="text-gray-600">Your message has been delivered successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 landscape:px-4 py-4 landscape:py-3 sticky top-0 z-10 safe-area-top landscape-compact-header">
        <h1 className="text-2xl landscape:text-xl font-bold text-gray-900">Communications</h1>
      </div>

      <div className="px-6 landscape:px-4 py-6 landscape:py-4 space-y-6 landscape:space-y-4 landscape-content">
        {/* Contact Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Send To</h2>
          <div className="space-y-2">
            {contacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`w-full p-4 rounded-xl text-left transition-all min-h-[56px] ${
                  selectedContact === contact.id
                    ? 'bg-blue-50 border-2 border-blue-600'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                  </div>
                  {selectedContact === contact.id && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Templates */}
        {selectedContact && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Messages</h2>
            <p className="text-sm text-gray-600 mb-4">Tap to send instantly</p>
            <div className="space-y-3">
              {messageTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleQuickSend(template.text, selectedContact)}
                  className={`w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all text-left min-h-[56px] flex items-center justify-between gap-3`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <MessageSquare className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{template.text}</span>
                  </div>
                  <Send className={`w-5 h-5 flex-shrink-0 ${leftHandMode ? 'order-first' : ''}`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Message */}
        {selectedContact && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Custom Message</h2>
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={4}
                  inputMode="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 resize-none"
                  placeholder="Type your message here..."
                />
                <div className="absolute bottom-3 right-3">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors min-w-[40px] min-h-[40px]"
                    title="Use voice input"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                💡 Tip: Use your device's voice input keyboard for hands-free typing
              </p>
              <button
                onClick={handleCustomSend}
                disabled={!customMessage.trim()}
                className={`w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] flex items-center justify-center gap-2`}
              >
                <Send className={`w-5 h-5 ${leftHandMode ? 'order-2' : ''}`} />
                <span className={leftHandMode ? 'order-1' : ''}>Send Message</span>
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedContact && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Select a Contact</h3>
            <p className="text-gray-600 text-sm">Choose who you'd like to message from the list above</p>
          </div>
        )}

        {/* Wellness Logging */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Log</h2>
          <p className="text-sm text-gray-600 mb-4">Log how you're feeling today</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '😊', label: 'Great', color: 'bg-green-100 text-green-700' },
              { emoji: '😌', label: 'Good', color: 'bg-blue-100 text-blue-700' },
              { emoji: '😐', label: 'Okay', color: 'bg-yellow-100 text-yellow-700' },
              { emoji: '😔', label: 'Not well', color: 'bg-orange-100 text-orange-700' },
            ].map(mood => (
              <button
                key={mood.label}
                className={`p-4 rounded-xl ${mood.color} hover:opacity-80 transition-opacity min-h-[56px] flex flex-col items-center justify-center gap-1`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};