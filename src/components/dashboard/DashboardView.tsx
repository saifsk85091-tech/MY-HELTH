import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Droplets,
  Activity,
  Moon,
  Smartphone,
  Flame,
  Plus,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  Wind,
  Timer,
  Utensils,
  BookOpen,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    user,
    healthScore,
    waterGlasses,
    waterGoal,
    addWaterGlass,
    exercises,
    sleepHours,
    screenTimeHours,
    screenTimeGoal,
    streakInfo,
    routines,
    toggleRoutine,
    todayQuote,
    language,
    setActiveView,
    setIsFocusModalOpen,
    setIsBreathingModalOpen,
    setIsDisclaimerModalOpen,
  } = useApp();

  const completedExercisesCount = exercises.filter((e) => e.completedToday).length;
  const isExerciseDone = completedExercisesCount > 0;

  // Greeting
  const currentHour = new Date().getHours();
  let greeting = language === 'en' ? 'Good Day' : 'শুভ দিন';
  if (currentHour < 12) greeting = language === 'en' ? 'Good Morning' : 'শুভ সকাল';
  else if (currentHour < 17) greeting = language === 'en' ? 'Good Afternoon' : 'শুভ দুপুর';
  else if (currentHour < 21) greeting = language === 'en' ? 'Good Evening' : 'শুভ সন্ধ্যা';
  else greeting = language === 'en' ? 'Good Night' : 'শুভ রাত্রি';

  const userName = user?.name ? user.name.split(' ')[0] : 'Champion';

  // Routine summary (next pending or first 3)
  const pendingRoutines = routines.filter((r) => !r.completed).slice(0, 3);
  const completedRoutines = routines.filter((r) => r.completed);

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-7xl mx-auto">
      {/* Top Banner / Greeting & Score Header */}
      <div className="bg-gradient-to-br from-slate-800/90 via-slate-900 to-slate-900 border border-slate-800/80 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {language === 'en' ? "Today's Overview" : 'আজকের সারসংক্ষেপ'}
              </span>
              <span className="text-xs text-slate-400">
                {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'bn-BD', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-100">
              {greeting}, {userName} <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              {language === 'en'
                ? 'Build consistent habits, protect your focus, and revitalize your health step-by-step.'
                : 'প্রতিদিনের স্বাস্থ্যকর রুটিনের মাধ্যমে মানসিক প্রশান্তি ও শারীরিক সুস্থতা গড়ে তুলুন।'}
            </p>
          </div>

          {/* Daily Health Score Dial Card */}
          <div 
            onClick={() => setActiveView('progress')}
            id="health-score-dial-card"
            className="flex items-center gap-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-4 rounded-2xl cursor-pointer transition-all shadow-lg hover:border-emerald-500/40 shrink-0 group"
          >
            {/* Score Ring */}
            <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="stroke-slate-700"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-emerald-400 transition-all duration-700 ease-out"
                  strokeDasharray={`${healthScore.totalScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-lg font-extrabold text-slate-100 leading-none">
                  {healthScore.totalScore}
                </span>
                <span className="text-[9px] text-slate-400 font-semibold">%</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Health Score' : 'হেলথ স্কোর'}</span>
              </div>
              <p className="text-sm font-bold text-slate-100">
                {healthScore.totalScore >= 80
                  ? (language === 'en' ? 'Optimal Wellness 🔥' : 'চমৎকার পারফরম্যান্স 🔥')
                  : healthScore.totalScore >= 50
                  ? (language === 'en' ? 'Solid Progress 💪' : 'ভালো উন্নতি হচ্ছে 💪')
                  : (language === 'en' ? 'Keep Building 🌱' : 'শুরু করুন 🌱')}
              </p>
              <span className="text-[11px] text-slate-400 group-hover:text-emerald-300 flex items-center gap-1 mt-0.5">
                {language === 'en' ? 'View analytics' : 'বিশ্লেষণ দেখুন'} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Card 1: Water */}
        <div 
          id="metric-card-water"
          className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <button
              type="button"
              onClick={addWaterGlass}
              id="dashboard-add-water-btn"
              className="p-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
              title="Add 1 Glass"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Water' : 'পানি'}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-heading text-xl font-bold text-slate-100">
                {waterGlasses}
              </span>
              <span className="text-xs text-slate-400">/ {waterGoal} {language === 'en' ? 'Glasses' : 'গ্লাস'}</span>
            </div>
            {/* mini progress bar */}
            <div className="w-full bg-slate-700/60 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (waterGlasses / waterGoal) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 2: Exercise */}
        <div 
          id="metric-card-exercise"
          onClick={() => setActiveView('tracker')}
          className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isExerciseDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
            }`}>
              {isExerciseDone ? (language === 'en' ? 'Done' : 'সম্পন্ন') : (language === 'en' ? 'Pending' : 'বাকি')}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Exercise' : 'ব্যায়াম'}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-heading text-xl font-bold text-slate-100">
                {completedExercisesCount}
              </span>
              <span className="text-xs text-slate-400">/ {exercises.length} {language === 'en' ? 'Completed' : 'সম্পন্ন'}</span>
            </div>
            <div className="w-full bg-slate-700/60 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (completedExercisesCount / exercises.length) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 3: Sleep */}
        <div 
          id="metric-card-sleep"
          onClick={() => setActiveView('routine')}
          className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
              {language === 'en' ? 'Target 8h' : 'লক্ষ্য ৮ঘ'}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Sleep' : 'ঘুম'}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-heading text-xl font-bold text-slate-100">
                {sleepHours}
              </span>
              <span className="text-xs text-slate-400">{language === 'en' ? 'Hours' : 'ঘণ্টা'}</span>
            </div>
            <div className="w-full bg-slate-700/60 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-indigo-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (sleepHours / 8) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 4: Screen Time */}
        <div 
          id="metric-card-screentime"
          onClick={() => setActiveView('tracker')}
          className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              screenTimeHours <= screenTimeGoal ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {screenTimeHours <= screenTimeGoal ? 'Safe' : 'High'}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Screen Time' : 'স্ক্রিন টাইম'}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-heading text-xl font-bold text-slate-100">
                {screenTimeHours}
              </span>
              <span className="text-xs text-slate-400">/ {screenTimeGoal} {language === 'en' ? 'h Goal' : 'ঘ লক্ষ্য'}</span>
            </div>
            <div className="w-full bg-slate-700/60 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  screenTimeHours <= screenTimeGoal ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
                style={{ width: `${Math.min(100, (screenTimeHours / (screenTimeGoal || 1)) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 5: Current Streak */}
        <div 
          id="metric-card-streak"
          onClick={() => setActiveView('progress')}
          className="col-span-2 lg:col-span-1 bg-gradient-to-br from-amber-950/40 via-slate-800/80 to-slate-800/80 border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-400 transition-all shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
              {language === 'en' ? 'On Fire' : 'অব্যাহত'}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
              {language === 'en' ? 'Current Streak' : 'ধারাবাহিকতা'}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-heading text-xl font-extrabold text-amber-300">
                {streakInfo.currentStreak}
              </span>
              <span className="text-xs text-slate-300">{language === 'en' ? 'Days Streak' : 'দিনের স্ট্রিক'}</span>
            </div>
            <p className="text-[10px] text-amber-200/70 mt-1 truncate">
              {language === 'en' ? 'Next Badge in 8 days!' : 'পরবর্তী ব্যাজ ৮ দিনে!'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Mind & Wellness Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => setIsBreathingModalOpen(true)}
          id="action-breath-card"
          className="p-3.5 rounded-2xl bg-teal-950/50 hover:bg-teal-900/60 border border-teal-700/40 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Wind className="w-4 h-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-teal-200">
            {language === 'en' ? '4-4-6 Breathing' : 'শ্বাস-প্রশ্বাস নিয়ন্ত্রণ'}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {language === 'en' ? 'Calm mind & release urges' : 'মানসিক চাপ দূর করুন'}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setIsFocusModalOpen(true)}
          id="action-focus-card"
          className="p-3.5 rounded-2xl bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-700/40 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Timer className="w-4 h-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-indigo-200">
            {language === 'en' ? 'Focus Session' : 'ডিপ ফোকাস সেশন'}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {language === 'en' ? '25/45/60 min Pomodoro' : 'মোবাইল ছাড়া মনোযোগ'}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveView('tracker')}
          id="action-food-card"
          className="p-3.5 rounded-2xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-700/40 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Utensils className="w-4 h-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-emerald-200">
            {language === 'en' ? 'Food & Nutrition' : 'পুষ্টিকর খাদ্যতালিকা'}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {language === 'en' ? 'Daily balanced planner' : 'স্বাস্থ্যকর খাবার পরিকল্পনা'}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveView('mind')}
          id="action-journal-card"
          className="p-3.5 rounded-2xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-700/40 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <BookOpen className="w-4 h-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-purple-200">
            {language === 'en' ? 'Private Journal' : 'গোপন অনুভূতি ও ডায়েরি'}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {language === 'en' ? 'Log mood & thoughts' : 'মনের ভাব লিখে রাখুন'}
          </p>
        </button>
      </div>

      {/* Main Grid: Today's Routine Snapshot + Daily Motivation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Routine Preview */}
        <div className="lg:col-span-2 bg-slate-800/70 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {language === 'en' ? "Today's Daily Routine" : 'আজকের রুটিন'}
              </h2>
              <p className="text-xs text-slate-400">
                {completedRoutines.length} of {routines.length} {language === 'en' ? 'completed today' : 'কাজ সম্পন্ন'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveView('routine')}
              id="view-full-routine-btn"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
            >
              <span>{language === 'en' ? 'Full Schedule' : 'সম্পূর্ণ রুটিন'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Routine items preview */}
          <div className="space-y-2.5">
            {routines.slice(0, 5).map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => toggleRoutine(item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    item.completed
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-slate-300'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={`shrink-0 ${item.completed ? 'text-emerald-400' : 'text-slate-500'}`}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${item.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                          {language === 'en' ? item.title : item.titleBn || item.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {item.time} • <span className="capitalize">{item.period}</span>
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.completed ? (language === 'en' ? 'Completed' : 'সম্পন্ন') : (language === 'en' ? 'Pending' : 'বাকি')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Motivation & Medical Guidance */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Motivation Quote Card */}
          <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 shadow-xl relative overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 block mb-1">
              {language === 'en' ? 'Daily Mindset' : 'আজকের অনুপ্রেরণা'}
            </span>
            <blockquote className="text-xs sm:text-sm text-slate-200 font-medium italic leading-relaxed">
              "{language === 'en' ? todayQuote.quote : todayQuote.quoteBn}"
            </blockquote>
            <p className="text-[11px] text-indigo-300 font-semibold mt-3 text-right">
              — {todayQuote.author}
            </p>
          </div>

          {/* Evidence-Based Guidance Card */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200">
                {language === 'en' ? 'Evidence-Based Wellness' : 'বিজ্ঞানসম্মত সুস্থতা'}
              </h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Healthy habits are about building self-discipline without fear or misinformation. If facing health distress, consult a medical doctor.'
                : 'কুসংস্কার বা ভয় নয়, বরং সঠিক রুটিন ও ডিসিপ্লিনই আপনাকে কর্মঠ রাখবে। কোনো শারীরিক সমস্যায় চিকিৎসকের পরামর্শ নিন।'}
            </p>
            <button
              type="button"
              onClick={() => setIsDisclaimerModalOpen(true)}
              id="read-disclaimer-card-btn"
              className="mt-3 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
            >
              <span>{language === 'en' ? 'Read Health & Medical Notice' : 'মেডিকেল গাইডলাইন পড়ুন'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
