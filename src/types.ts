export type AppLanguage = 'en' | 'bn';

export type UserGender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender?: UserGender;
  role: 'user' | 'admin';
  createdAt: string;
  avatar?: string;
  targetSleepTime: string;
  targetWakeTime: string;
  dailyScreenTimeGoalHours: number;
  dailyWaterGoalGlasses: number;
  primaryGoals: string[];
  onboardingCompleted: boolean;
}

export type RoutinePeriod = 'morning' | 'afternoon' | 'evening' | 'night';

export interface RoutineItem {
  id: string;
  userId?: string;
  period: RoutinePeriod;
  time: string;
  title: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  category: 'sleep' | 'water' | 'exercise' | 'food' | 'mind' | 'digital' | 'general';
  completed: boolean;
}

export interface Habit {
  id: string;
  userId?: string;
  name: string;
  nameBn?: string;
  category: string;
  icon: string;
  targetDaysPerWeek: number;
  createdAt: string;
  history: Record<string, boolean>; // date string YYYY-MM-DD -> completed
}

export interface WaterLog {
  date: string; // YYYY-MM-DD
  glasses: number;
  goalGlasses: number;
}

export interface ExerciseItem {
  id: string;
  name: string;
  nameBn?: string;
  category: 'Home Workout' | 'Walking' | 'Stretching' | 'Push-ups' | 'Squats' | 'Meditation';
  duration: string;
  durationBn?: string;
  targetReps?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Easy';
  instructions: string;
  instructionsBn: string;
  benefits: string;
  benefitsBn: string;
  completedToday?: boolean;
}

export interface FoodSuggestion {
  id: string;
  mealType: 'Breakfast' | 'Lunch' | 'Evening Snacks' | 'Dinner';
  mealTypeBn: string;
  name: string;
  nameBn: string;
  items: string[];
  itemsBn: string[];
  nutritionalBenefits: string;
  nutritionalBenefitsBn: string;
  preparationTip: string;
  preparationTipBn: string;
}

export interface JournalEntry {
  id: string;
  userId?: string;
  date: string;
  mood: 'great' | 'good' | 'normal' | 'stressed' | 'down';
  moodScore: number; // 1 to 5
  note: string;
  tags?: string[];
  createdAt: string;
}

export interface ScreenTimeLog {
  date: string;
  hours: number;
  goalHours: number;
  lateNightMinutes: number;
}

export interface HealthScoreBreakdown {
  date: string;
  waterScore: number; // max 20
  exerciseScore: number; // max 20
  sleepScore: number; // max 20
  healthyFoodScore: number; // max 20
  habitScore: number; // max 20
  totalScore: number; // max 100
}

export interface StreakInfo {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;
  unlockedBadges: string[];
}

export interface MotivationQuote {
  id: string;
  quote: string;
  quoteBn: string;
  author: string;
  category: 'discipline' | 'mindset' | 'health' | 'growth';
}

export interface HealthArticle {
  id: string;
  title: string;
  titleBn: string;
  category: 'Sleep & Brain' | 'Screen & Dopamine' | 'Nutrition' | 'Fitness' | 'Mental Health' | 'Habit Science';
  readTime: string;
  summary: string;
  summaryBn: string;
  content: string;
  contentBn: string;
  isDoctorAdviceDisclaimer: boolean;
}

export interface ReminderSetting {
  id: string;
  label: string;
  labelBn: string;
  time: string;
  enabled: boolean;
  type: 'wake' | 'water' | 'exercise' | 'meal' | 'screen_cutoff' | 'sleep';
}
