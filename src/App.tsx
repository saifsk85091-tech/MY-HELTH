import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { RoutineView } from './components/routine/RoutineView';
import { TrackersHubView } from './components/trackers/TrackersHubView';
import { WaterTrackerView } from './components/water/WaterTrackerView';
import { HabitTrackerView } from './components/habits/HabitTrackerView';
import { ExerciseView } from './components/exercise/ExerciseView';
import { NutritionView } from './components/nutrition/NutritionView';
import { ScreenTimeView } from './components/screentime/ScreenTimeView';
import { StressHubView } from './components/stress/StressHubView';
import { ProgressAnalyticsView } from './components/analytics/ProgressAnalyticsView';
import { HealthArticlesView } from './components/articles/HealthArticlesView';
import { ProfileView } from './components/profile/ProfileView';
import { AdminPanelView } from './components/admin/AdminPanelView';
import { BackendCodeExportView } from './components/backend/BackendCodeExportView';

// Modals
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { FocusTimerModal } from './components/focus/FocusTimerModal';
import { BreathingExerciseModal } from './components/stress/BreathingExerciseModal';
import { HealthDisclaimerModal } from './components/disclaimer/HealthDisclaimerModal';
import { RemindersModal } from './components/reminders/RemindersModal';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'routine':
        return <RoutineView />;
      case 'tracker':
      case 'trackers':
        return <TrackersHubView />;
      case 'water':
        return <WaterTrackerView />;
      case 'habits':
        return <HabitTrackerView />;
      case 'exercise':
      case 'exercises':
        return <ExerciseView />;
      case 'nutrition':
      case 'food':
        return <NutritionView />;
      case 'screentime':
      case 'screen':
        return <ScreenTimeView />;
      case 'mind':
      case 'stress':
        return <StressHubView />;
      case 'progress':
      case 'analytics':
        return <ProgressAnalyticsView />;
      case 'articles':
      case 'education':
        return <HealthArticlesView />;
      case 'profile':
        return <ProfileView />;
      case 'admin':
        return <AdminPanelView />;
      case 'code-export':
      case 'backend':
        return <BackendCodeExportView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {renderActiveView()}
      </main>

      {/* Bottom Navigation for Mobile */}
      <BottomNav />

      {/* Global Modals & Overlays */}
      <OnboardingModal />
      <FocusTimerModal />
      <BreathingExerciseModal />
      <HealthDisclaimerModal />
      <RemindersModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
