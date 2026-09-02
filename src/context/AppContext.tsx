import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  AppLanguage,
  UserProfile,
  RoutineItem,
  Habit,
  WaterLog,
  ExerciseItem,
  FoodSuggestion,
  JournalEntry,
  ScreenTimeLog,
  HealthScoreBreakdown,
  StreakInfo,
  MotivationQuote,
  HealthArticle,
  ReminderSetting,
} from '../types';
import {
  INITIAL_ROUTINE,
  INITIAL_HABITS,
  EXERCISE_LIST,
  FOOD_SUGGESTIONS,
  MOTIVATION_QUOTES,
  HEALTH_ARTICLES,
  INITIAL_REMINDERS,
} from '../data/initialData';

interface AppContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  user: UserProfile | null;
  activeView: string;
  setActiveView: (view: string) => void;
  
  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isFocusModalOpen: boolean;
  setIsFocusModalOpen: (open: boolean) => void;
  isBreathingModalOpen: boolean;
  setIsBreathingModalOpen: (open: boolean) => void;
  isDisclaimerModalOpen: boolean;
  setIsDisclaimerModalOpen: (open: boolean) => void;
  isRemindersModalOpen: boolean;
  setIsRemindersModalOpen: (open: boolean) => void;

  // Data & State
  routines: RoutineItem[];
  habits: Habit[];
  exercises: ExerciseItem[];
  foodSuggestions: FoodSuggestion[];
  foodLogs: Record<string, boolean>;
  journalEntries: JournalEntry[];
  quotes: MotivationQuote[];
  articles: HealthArticle[];
  reminders: ReminderSetting[];
  
  // Trackers
  waterGlasses: number;
  waterGoal: number;
  addWaterGlass: () => void;
  removeWaterGlass: () => void;
  setCustomWaterGoal: (glasses: number) => void;
  
  screenTimeHours: number;
  screenTimeGoal: number;
  setScreenTimeHours: (hours: number) => void;
  setScreenTimeGoal: (hours: number) => void;

  sleepHours: number;
  setSleepHours: (hours: number) => void;

  // Actions
  toggleRoutine: (id: string) => void;
  addRoutineItem: (item: Omit<RoutineItem, 'id'>) => void;
  updateRoutineItem: (id: string, updates: Partial<RoutineItem>) => void;
  deleteRoutineItem: (id: string) => void;

  toggleHabit: (habitId: string, dateStr?: string) => void;
  addHabit: (name: string, nameBn?: string, category?: string) => void;
  deleteHabit: (id: string) => void;

  toggleExercise: (id: string) => void;
  toggleMealLogged: (mealType: string) => void;
  addJournalEntry: (mood: JournalEntry['mood'], note: string) => void;
  toggleReminder: (id: string) => void;

  // Calculations
  healthScore: HealthScoreBreakdown;
  streakInfo: StreakInfo;
  todayQuote: MotivationQuote;

  // Auth & Onboarding
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string, age: number, gender?: any) => void;
  logout: () => void;
  completeOnboarding: (answers: {
    sleepTime: string;
    wakeTime: string;
    screenHours: number;
    exercises: boolean;
    primaryGoals: string[];
  }) => void;
  triggerConfetti: () => void;

  // Admin content management
  addQuote: (quote: MotivationQuote) => void;
  deleteQuote: (id: string) => void;
  addArticle: (article: HealthArticle) => void;
  deleteArticle: (id: string) => void;
  addExercise: (exercise: ExerciseItem) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const TODAY_STR = new Date().toISOString().split('T')[0];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<AppLanguage>(() => {
    return (localStorage.getItem('youthfit_lang') as AppLanguage) || 'en';
  });

  const [activeView, setActiveView] = useState<string>('dashboard');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState(false);

  // User State
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('youthfit_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default demo user
    return {
      id: 'usr-1',
      name: 'Saif Ahmed',
      email: 'saifsk85091@gmail.com',
      age: 22,
      gender: 'male',
      role: 'user',
      createdAt: '2026-08-20',
      targetSleepTime: '11:00 PM',
      targetWakeTime: '06:30 AM',
      dailyScreenTimeGoalHours: 3.5,
      dailyWaterGoalGlasses: 8,
      primaryGoals: ['Better Sleep', 'Fitness', 'Reduce Screen Time', 'Stress Management'],
      onboardingCompleted: true,
    };
  });

  // Trackers State
  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    const saved = localStorage.getItem(`youthfit_water_${TODAY_STR}`);
    return saved ? parseInt(saved, 10) : 5;
  });
  const [waterGoal, setWaterGoal] = useState<number>(8);

  const [screenTimeHours, setScreenTimeHours] = useState<number>(() => {
    const saved = localStorage.getItem(`youthfit_screen_${TODAY_STR}`);
    return saved ? parseFloat(saved) : 4.2;
  });
  const [screenTimeGoal, setScreenTimeGoal] = useState<number>(3.5);

  const [sleepHours, setSleepHours] = useState<number>(7);

  // Routines State
  const [routines, setRoutines] = useState<RoutineItem[]>(() => {
    const saved = localStorage.getItem('youthfit_routines');
    return saved ? JSON.parse(saved) : INITIAL_ROUTINE;
  });

  // Habits State
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('youthfit_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  // Exercises State
  const [exercises, setExercises] = useState<ExerciseItem[]>(() => {
    const saved = localStorage.getItem('youthfit_exercises');
    return saved ? JSON.parse(saved) : EXERCISE_LIST;
  });

  // Food logs
  const [foodLogs, setFoodLogs] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem(`youthfit_food_${TODAY_STR}`);
    return saved ? JSON.parse(saved) : { Breakfast: true, Lunch: true, 'Evening Snacks': false, Dinner: false };
  });

  const [foodSuggestions] = useState<FoodSuggestion[]>(FOOD_SUGGESTIONS);

  // Journal entries
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('youthfit_journals');
    return saved ? JSON.parse(saved) : [
      {
        id: 'j-1',
        date: TODAY_STR,
        mood: 'good',
        moodScore: 4,
        note: 'Felt calm today after doing morning stretching and reducing late-night phone usage. Energy is getting back on track.',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ];
  });

  // Quotes & Articles
  const [quotes, setQuotes] = useState<MotivationQuote[]>(() => {
    const saved = localStorage.getItem('youthfit_quotes');
    return saved ? JSON.parse(saved) : MOTIVATION_QUOTES;
  });

  const [articles, setArticles] = useState<HealthArticle[]>(() => {
    const saved = localStorage.getItem('youthfit_articles');
    return saved ? JSON.parse(saved) : HEALTH_ARTICLES;
  });

  const [reminders, setReminders] = useState<ReminderSetting[]>(() => {
    const saved = localStorage.getItem('youthfit_reminders');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  // Streak state
  const [streakInfo, setStreakInfo] = useState<StreakInfo>({
    currentStreak: 7,
    bestStreak: 14,
    lastActiveDate: TODAY_STR,
    unlockedBadges: ['🔥 3-Day Starter', '⚡ 7-Day Warrior'],
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('youthfit_lang', language);
  }, [language]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('youthfit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('youthfit_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('youthfit_routines', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('youthfit_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('youthfit_exercises', JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    localStorage.setItem(`youthfit_water_${TODAY_STR}`, waterGlasses.toString());
  }, [waterGlasses]);

  useEffect(() => {
    localStorage.setItem(`youthfit_screen_${TODAY_STR}`, screenTimeHours.toString());
  }, [screenTimeHours]);

  useEffect(() => {
    localStorage.setItem(`youthfit_food_${TODAY_STR}`, JSON.stringify(foodLogs));
  }, [foodLogs]);

  useEffect(() => {
    localStorage.setItem('youthfit_journals', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('youthfit_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('youthfit_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('youthfit_articles', JSON.stringify(articles));
  }, [articles]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#06b6d4', '#f59e0b', '#3b82f6'],
      });
    } catch (e) {
      console.log('Confetti not available');
    }
  };

  // Water Actions
  const addWaterGlass = () => {
    const next = waterGlasses + 1;
    setWaterGlasses(next);
    if (next === waterGoal) {
      triggerConfetti();
    }
  };

  const removeWaterGlass = () => {
    if (waterGlasses > 0) {
      setWaterGlasses(waterGlasses - 1);
    }
  };

  const setCustomWaterGoal = (goal: number) => {
    setWaterGoal(goal);
  };

  // Routine Actions
  const toggleRoutine = (id: string) => {
    setRoutines(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const addRoutineItem = (item: Omit<RoutineItem, 'id'>) => {
    const newItem: RoutineItem = {
      ...item,
      id: `r-${Date.now()}`,
    };
    setRoutines(prev => [...prev, newItem]);
  };

  const updateRoutineItem = (id: string, updates: Partial<RoutineItem>) => {
    setRoutines(prev => prev.map(item => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteRoutineItem = (id: string) => {
    setRoutines(prev => prev.filter(item => item.id !== id));
  };

  // Habits Actions
  const toggleHabit = (habitId: string, dateStr: string = TODAY_STR) => {
    setHabits(prev =>
      prev.map(h => {
        if (h.id === habitId) {
          const current = !!h.history[dateStr];
          const newHistory = { ...h.history, [dateStr]: !current };
          return { ...h, history: newHistory };
        }
        return h;
      })
    );
  };

  const addHabit = (name: string, nameBn?: string, category: string = 'General') => {
    const newHabit: Habit = {
      id: `h-${Date.now()}`,
      name,
      nameBn: nameBn || name,
      category,
      icon: 'CheckCircle2',
      targetDaysPerWeek: 7,
      createdAt: TODAY_STR,
      history: { [TODAY_STR]: true },
    };
    setHabits(prev => [...prev, newHabit]);
    triggerConfetti();
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  // Exercise Actions
  const toggleExercise = (id: string) => {
    setExercises(prev =>
      prev.map(ex => {
        if (ex.id === id) {
          const nextVal = !ex.completedToday;
          if (nextVal) triggerConfetti();
          return { ...ex, completedToday: nextVal };
        }
        return ex;
      })
    );
  };

  // Meal Log Actions
  const toggleMealLogged = (mealType: string) => {
    setFoodLogs(prev => ({
      ...prev,
      [mealType]: !prev[mealType],
    }));
  };

  // Journal Actions
  const addJournalEntry = (mood: JournalEntry['mood'], note: string) => {
    const scores: Record<JournalEntry['mood'], number> = {
      great: 5,
      good: 4,
      normal: 3,
      stressed: 2,
      down: 1,
    };
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: TODAY_STR,
      mood,
      moodScore: scores[mood],
      note,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setJournalEntries(prev => [newEntry, ...prev]);
    triggerConfetti();
  };

  // Reminders Actions
  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  // Health Score Calculation (20 + 20 + 20 + 20 + 20 = 100)
  const completedRoutinesCount = routines.filter(r => r.completed).length;
  const routinePct = routines.length > 0 ? completedRoutinesCount / routines.length : 0.8;
  const sleepScore = Math.round(Math.min(20, (sleepHours >= 7 ? 20 : (sleepHours / 7) * 20)));

  const waterRatio = Math.min(1, waterGlasses / (waterGoal || 8));
  const waterScore = Math.round(waterRatio * 20);

  const completedExercises = exercises.filter(e => e.completedToday).length;
  const exerciseScore = Math.min(20, Math.max(10, completedExercises * 10));

  const completedMeals = Object.values(foodLogs).filter(Boolean).length;
  const healthyFoodScore = Math.round((completedMeals / 4) * 20);

  const todayCompletedHabits = habits.filter(h => !!h.history[TODAY_STR]).length;
  const habitRatio = habits.length > 0 ? todayCompletedHabits / habits.length : 0.8;
  const habitScore = Math.round(habitRatio * 20);

  const totalHealthScore = Math.min(100, Math.max(0, waterScore + exerciseScore + sleepScore + healthyFoodScore + habitScore));

  const healthScore: HealthScoreBreakdown = {
    date: TODAY_STR,
    waterScore,
    exerciseScore,
    sleepScore,
    healthyFoodScore,
    habitScore,
    totalScore: totalHealthScore,
  };

  // Quotes
  const todayQuote = quotes[0] || MOTIVATION_QUOTES[0];

  // Profile Customization
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = prev ? { ...prev, ...updates } : {
        id: 'usr-1',
        name: 'Saif Ahmed',
        email: 'saifsk85091@gmail.com',
        age: 22,
        gender: 'male' as const,
        role: 'user' as const,
        createdAt: TODAY_STR,
        targetSleepTime: '11:00 PM',
        targetWakeTime: '06:30 AM',
        dailyScreenTimeGoalHours: 3.5,
        dailyWaterGoalGlasses: 8,
        primaryGoals: ['Better Sleep', 'Fitness'],
        onboardingCompleted: true,
        ...updates
      };
      localStorage.setItem('youthfit_user', JSON.stringify(updated));
      return updated;
    });
  };

  // Auth Functions (Non-blocking local state)
  const login = (email: string, name?: string) => {
    const loggedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      age: 21,
      gender: 'male',
      role: email.includes('admin') ? 'admin' : 'user',
      createdAt: TODAY_STR,
      targetSleepTime: '11:00 PM',
      targetWakeTime: '06:30 AM',
      dailyScreenTimeGoalHours: 3.5,
      dailyWaterGoalGlasses: 8,
      primaryGoals: ['Better Sleep', 'Fitness', 'Reduce Screen Time'],
      onboardingCompleted: true,
    };
    setUser(loggedUser);
    setIsAuthModalOpen(false);
  };

  const register = (name: string, email: string, age: number, gender?: any) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      age,
      gender: gender || 'prefer_not_to_say',
      role: 'user',
      createdAt: TODAY_STR,
      targetSleepTime: '11:00 PM',
      targetWakeTime: '06:30 AM',
      dailyScreenTimeGoalHours: 3.5,
      dailyWaterGoalGlasses: 8,
      primaryGoals: ['Better Sleep', 'Fitness'],
      onboardingCompleted: false,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    setIsOnboardingOpen(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('youthfit_user');
  };

  const completeOnboarding = (answers: {
    sleepTime: string;
    wakeTime: string;
    screenHours: number;
    exercises: boolean;
    primaryGoals: string[];
  }) => {
    if (user) {
      setUser({
        ...user,
        targetSleepTime: answers.sleepTime,
        targetWakeTime: answers.wakeTime,
        dailyScreenTimeGoalHours: answers.screenHours,
        primaryGoals: answers.primaryGoals,
        onboardingCompleted: true,
      });
    }
    // Generate tailored routines based on sleep & wake time
    const customized: RoutineItem[] = [
      {
        id: 'r-1',
        period: 'morning',
        time: answers.wakeTime || '06:30 AM',
        title: 'Wake Up & Natural Sunlight',
        titleBn: 'ঘুম থেকে ওঠা ও সূর্যের আলো নেওয়া',
        description: 'Get out of bed without phone. Drink water and step outside for 5 mins.',
        descriptionBn: 'ফোন না দেখে বিছানা থেকে উঠুন। প্রাকৃতিক আলো চোখে লাগান।',
        category: 'sleep',
        completed: false,
      },
      {
        id: 'r-2',
        period: 'morning',
        time: '07:00 AM',
        title: answers.exercises ? 'Full Body Energy Workout (20 Mins)' : 'Light Morning Walk & Stretch',
        titleBn: answers.exercises ? 'ফুল বডি এনার্জি ওয়ার্কআউট (২০ মিনিট)' : 'হালকা মর্নিং ওয়াক ও স্ট্রেচ',
        description: 'Boost natural dopamine and blood circulation.',
        descriptionBn: 'শরীরে রক্ত সঞ্চালন বাড়াতে ব্যায়াম বা হাঁটা।',
        category: 'exercise',
        completed: false,
      },
      {
        id: 'r-3',
        period: 'morning',
        time: '08:00 AM',
        title: 'Healthy Nutritious Breakfast',
        titleBn: 'পুষ্টিকর সকালের নাস্তা',
        description: 'Eggs, oats, fruits, milk or whole grains.',
        descriptionBn: 'ডিম, ফল বা রুটি-সবজি দিয়ে শক্তিবর্ধক নাস্তা।',
        category: 'food',
        completed: false,
      },
      {
        id: 'r-4',
        period: 'afternoon',
        time: '01:30 PM',
        title: 'Clean Balanced Lunch',
        titleBn: 'সুষম দুপুরের খাবার',
        description: 'Vegetables, lentils and clean protein.',
        descriptionBn: 'ভাত/রুটি, প্রচুর সবজি, ডাল ও প্রোটিন।',
        category: 'food',
        completed: false,
      },
      {
        id: 'r-5',
        period: 'evening',
        time: '05:30 PM',
        title: 'Outdoor Movement / Sports',
        titleBn: 'ব্যায়াম / খেলাধুলা / হাঁটা',
        description: 'Clear head from screen fatigue with physical movement.',
        descriptionBn: 'শারীরিক পরিশ্রম মানসিক চাপ দূর করে।',
        category: 'exercise',
        completed: false,
      },
      {
        id: 'r-6',
        period: 'night',
        time: '08:30 PM',
        title: 'Light Dinner (2+ hrs before sleep)',
        titleBn: 'হালকা রাতের খাবার',
        description: 'Eat light to protect your deep sleep cycles.',
        descriptionBn: 'ঘুমানোর অন্তত ২ ঘণ্টা আগে হালকা রাতের খাবার গ্রহণ করুন।',
        category: 'food',
        completed: false,
      },
      {
        id: 'r-7',
        period: 'night',
        time: '10:00 PM',
        title: 'Screen Curfew (No Late Night Scrolling)',
        titleBn: 'স্ক্রিন টাইম কমানো (মোবাইল দূরে রাখা)',
        description: 'Protect melatonin production and mental calmness.',
        descriptionBn: 'মোবাইল দূরে রেখে বই পড়ার মতো অভ্যাস করুন।',
        category: 'digital',
        completed: false,
      },
      {
        id: 'r-8',
        period: 'night',
        time: answers.sleepTime || '11:00 PM',
        title: 'Sleep & Brain Recovery',
        titleBn: 'সময়মতো ঘুম (৭-৮ ঘণ্টা)',
        description: 'Deep sleep resets your focus, muscle fibers, and mood.',
        descriptionBn: 'শান্তিময় ও গভীর ঘুমের মাধ্যমে সুস্থ থাকুন।',
        category: 'sleep',
        completed: false,
      },
    ];
    setRoutines(customized);
    setIsOnboardingOpen(false);
    triggerConfetti();
  };

  // Admin content managers
  const addQuote = (quote: MotivationQuote) => {
    setQuotes(prev => [quote, ...prev]);
  };
  const deleteQuote = (id: string) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
  };
  const addArticle = (article: HealthArticle) => {
    setArticles(prev => [article, ...prev]);
  };
  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };
  const addExercise = (exercise: ExerciseItem) => {
    setExercises(prev => [exercise, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        user,
        activeView,
        setActiveView,

        isAuthModalOpen,
        setIsAuthModalOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isFocusModalOpen,
        setIsFocusModalOpen,
        isBreathingModalOpen,
        setIsBreathingModalOpen,
        isDisclaimerModalOpen,
        setIsDisclaimerModalOpen,
        isRemindersModalOpen,
        setIsRemindersModalOpen,

        routines,
        habits,
        exercises,
        foodSuggestions,
        foodLogs,
        journalEntries,
        quotes,
        articles,
        reminders,

        waterGlasses,
        waterGoal,
        addWaterGlass,
        removeWaterGlass,
        setCustomWaterGoal,

        screenTimeHours,
        screenTimeGoal,
        setScreenTimeHours,
        setScreenTimeGoal,

        sleepHours,
        setSleepHours,

        toggleRoutine,
        addRoutineItem,
        updateRoutineItem,
        deleteRoutineItem,

        toggleHabit,
        addHabit,
        deleteHabit,

        toggleExercise,
        toggleMealLogged,
        addJournalEntry,
        toggleReminder,

        healthScore,
        streakInfo,
        todayQuote,

        updateUserProfile,
        login,
        register,
        logout,
        completeOnboarding,
        triggerConfetti,

        addQuote,
        deleteQuote,
        addArticle,
        deleteArticle,
        addExercise,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
