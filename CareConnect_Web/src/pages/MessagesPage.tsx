import React, { useState } from 'react';
import { Send, MessageSquare, Phone, Video } from 'lucide-react';
import { Container, Grid } from '../components/ui/Grid';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export function MessagesPage() {
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    'I need a prescription refill',
    'I have a question about my medication',
    'I need to schedule an appointment',
    'I am experiencing side effects',
  ];

  const conversations = [
    { id: '1', doctor: 'Dr. Sarah Johnson', specialty: 'Primary Care', lastMessage: 'Your lab results look good', time: '2h ago', unread: 2 },
    { id: '2', doctor: 'Dr. Michael Chen', specialty: 'Endocrinology', lastMessage: 'Continue current medication', time: '1d ago', unread: 0 },
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <Container maxWidth="xl" className="py-6 lg:py-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6">Messages</h1>

        <Grid cols={{ mobile: 1, tablet: 1, desktop: 3 }} gap="lg">
          {/* Conversations List - Desktop */}
          <div className="hidden lg:block">
            <Card variant="elevated">
              <CardHeader title="Conversations" />
              <CardContent>
                <div className="space-y-2">
                  {conversations.map(conv => (
                    <div key={conv.id} className="p-3 rounded-lg hover:bg-[var(--color-surface)] cursor-pointer">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium m-0">{conv.doctor}</h4>
                        {conv.unread > 0 && <Badge variant="primary" size="sm">{conv.unread}</Badge>}
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] m-0">{conv.specialty}</p>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2 m-0">{conv.lastMessage}</p>
                      <p className="text-xs text-[var(--color-text-disabled)] mt-1 m-0">{conv.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Area */}
          <div className="lg:col-span-2">
            <Card variant="elevated" className="mb-6">
              <CardHeader title="Quick Templates" subtitle="Start with a template" />
              <CardContent>
                <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap="sm">
                  {templates.map((template, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMessage(template)}
                      className="p-3 text-left rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-all"
                    >
                      {template}
                    </button>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader title="New Message" subtitle="Dr. Sarah Johnson - Primary Care" />
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    label="Your Message"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    fullWidth
                  />
                  <div className="flex gap-3">
                    <Button variant="primary" size="touch" fullWidth leftIcon={<Send className="w-5 h-5" />}>
                      Send Message
                    </Button>
                    <Button variant="outline" size="touch" className="hidden md:block">
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="touch" className="hidden md:block">
                      <Video className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Container>
    </div>
  );
}