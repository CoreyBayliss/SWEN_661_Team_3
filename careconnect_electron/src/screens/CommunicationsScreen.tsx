import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import './CommunicationsScreen.css';

const CommunicationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { contacts, messageTemplates } = useApp();
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (selectedContact && message) {
      alert(`Message sent to ${contacts.find((c) => c.id === selectedContact)?.name}`);
      setMessage('');
      setSelectedContact('');
    }
  };

  return (
    <div className="communications-screen">
      <header className="screen-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back
        </button>
        <h1>Communications</h1>
      </header>

      <main className="screen-content">
        <section className="comm-section">
          <h2>Contacts</h2>
          <div className="contacts-list">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`contact-card ${selectedContact === contact.id ? 'selected' : ''}`}
                onClick={() => setSelectedContact(contact.id)}
              >
                <div className="contact-info">
                  <h3>{contact.name}</h3>
                  <p>{contact.role}</p>
                  {contact.phone && <p className="contact-phone">{contact.phone}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {selectedContact && (
          <section className="comm-section">
            <h2>Send Message</h2>
            <div className="message-templates">
              <h3>Quick Templates</h3>
              <div className="template-buttons">
                {messageTemplates.map((template) => (
                  <button
                    key={template.id}
                    className="template-btn"
                    onClick={() => setMessage(template.text)}
                  >
                    {template.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="message-composer">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={4}
              />
              <button onClick={handleSendMessage} className="btn-primary">
                Send Message
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CommunicationsScreen;
