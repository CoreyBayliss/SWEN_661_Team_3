import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './providers/AppProvider';
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import MedicationsScreen from './screens/MedicationsScreen';
import MedicationDetailScreen from './screens/MedicationDetailScreen';
import AddMedicationScreen from './screens/AddMedicationScreen';
import TodayViewScreen from './screens/TodayViewScreen';
import CalendarScreen from './screens/CalendarScreen';
import CommunicationsScreen from './screens/CommunicationsScreen';
import RefillRequestScreen from './screens/RefillRequestScreen';
import SettingsScreen from './screens/SettingsScreen';

const App: React.FC = () => {
  const { isAuthenticated, hasCompletedOnboarding } = useApp();

  return (
    <div className="app-container">
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : !hasCompletedOnboarding ? (
          <>
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="*" element={<Navigate to="/onboarding" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/medications" element={<MedicationsScreen />} />
            <Route path="/medications/:id" element={<MedicationDetailScreen />} />
            <Route path="/medications/add" element={<AddMedicationScreen />} />
            <Route path="/today" element={<TodayViewScreen />} />
            <Route path="/calendar" element={<CalendarScreen />} />
            <Route path="/communications" element={<CommunicationsScreen />} />
            <Route path="/refill-request/:id" element={<RefillRequestScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
