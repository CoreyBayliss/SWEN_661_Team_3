export interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  times: string[];
  refillsRemaining: number;
  pharmacy: string;
  lastTaken?: MedicationAction;
  history: MedicationAction[];
}

export interface MedicationAction {
  timestamp: Date;
  user: string;
  action: 'taken' | 'skipped';
}

export interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  provider: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  phone?: string;
}

export interface MessageTemplate {
  id: string;
  text: string;
  category: string;
}

export interface AppSettings {
  textSize: number;
  highContrast: boolean;
  voiceEnabled: boolean;
  notificationsEnabled: boolean;
}
