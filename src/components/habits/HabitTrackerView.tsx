import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  Plus,
  CheckCircle2,
  Circle,
  Flame,
  Trash2,
  Sparkles,
  Calendar,
  Zap,
} from 'lucide-react';

export const HabitTrackerView: React.FC = () => {
  const {
    habits,
    toggleHabit,
    addHabit,
    deleteHabit,
    language,
    triggerConfetti,
  } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitNameBn, setNewHabitNameBn] = useState('');
  const [newCategory, setNewCategory] = useState('Daily Health');

  // Past 7 days dates array
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      dateStr: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
      dayNum: d.getDate(),
      isToday: i === 6,
    };
  });

  const todayStr = last7Days[6].dateStr;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    addHabit(newHabitName, newHabitNameBn || newHabitName, newCategory);
    setNewHabitName('');
    setNewHabitNameBn('');
    setIsAdding(false);
  };

  const completedTodayCount = habits.filter((h) => !!h.history[todayStr]).length;

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {language === 'en' ? 'Discipline & Neuroplasticity' : 'অভ্যাস ও আত্মনিয়ন্ত্রণ'}
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-100 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-400" />
            {language === 'en' ? 'Habit Tracker & Weekly Matrix' : 'হ্যাবিট ট্র্যাকার ও সাপ্তাহিক অগ্রগতি'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {language === 'en'
              ? 'Tracking daily wins rewires dopamine pathways away from impulsive triggers.'
              : 'প্রতিদিনের অভ্যাস সফলভাবে সম্পন্ন করলে মস্তিষ্কের আত্মবিশ্বাস ও একাগ্রতা বহুগুণ বৃদ্ধি পায়।'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(true)}
          id="add-habit-toggle-btn"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'New Habit' : 'নতুন অভ্যাস যোগ করুন'}</span>
        </button>
      </div>

      {/* Progress pill */}
      <div className="flex items-center justify-between bg-slate-900/60 px-4 py-3 rounded-2xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-slate-300 font-semibold">
            {language === 'en' ? "Today's Habit Wins:" : 'আজকের সম্পন্ন অভ্যাস:'}
          </span>
          <span className="text-emerald-400 font-bold font-heading text-sm">
            {completedTodayCount} / {habits.length}
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          {Math.round((completedTodayCount / (habits.length || 1)) * 100)}% {language === 'en' ? 'Completed' : 'সম্পন্ন'}
        </span>
      </div>

      {/* Add Habit Form */}
      {isAdding && (
        <form
          onSubmit={handleAddSubmit}
          className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-5 shadow-2xl space-y-4 animate-fade-in"
        >
          <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            {language === 'en' ? 'Create Custom Habit' : 'নতুন অভ্যাসের নাম লিখুন'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">
                {language === 'en' ? 'Habit Name (English)' : 'অভ্যাসের নাম (ইংরেজি)'}
              </label>
              <input
                type="text"
                required
                id="habit-name-input"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="e.g. Read 15 Pages of Book"
                className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">
                {language === 'en' ? 'Habit Name (Bengali / বাংলা)' : 'অভ্যাসের নাম (বাংলা)'}
              </label>
              <input
                type="text"
                id="habit-name-bn-input"
                value={newHabitNameBn}
                onChange={(e) => setNewHabitNameBn(e.target.value)}
                placeholder="যেমন: ১৫ পৃষ্ঠা বই পড়া"
                className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              {language === 'en' ? 'Cancel' : 'বাতিল'}
            </button>
            <button
              type="submit"
              id="save-new-habit-btn"
              className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 shadow-md"
            >
              {language === 'en' ? 'Save Habit' : 'সংরক্ষণ করুন'}
            </button>
          </div>
        </form>
      )}

      {/* Habits List with 7-day Matrix */}
      <div className="space-y-3">
        {habits.map((habit) => {
          const isDoneToday = !!habit.history[todayStr];
          return (
            <div
              key={habit.id}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Habit Details & Quick Toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id={`habit-toggle-today-${habit.id}`}
                  onClick={() => toggleHabit(habit.id, todayStr)}
                  className={`p-2 rounded-xl transition-colors ${
                    isDoneToday
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 text-slate-500 hover:text-slate-300 border border-slate-700/60'
                  }`}
                  title="Mark Complete Today"
                >
                  <CheckSquare className="w-5 h-5" />
                </button>

                <div>
                  <h4
                    className={`text-sm font-bold ${
                      isDoneToday ? 'text-emerald-300' : 'text-slate-100'
                    }`}
                  >
                    {language === 'en' ? habit.name : habit.nameBn || habit.name}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {habit.category} • {isDoneToday ? (language === 'en' ? '✓ Completed Today' : '✓ আজ সম্পন্ন') : (language === 'en' ? '○ Incomplete' : '○ বাকি আছে')}
                  </span>
                </div>
              </div>

              {/* 7 Days Mini Matrix */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                {last7Days.map((day) => {
                  const completedOnDay = !!habit.history[day.dateStr];
                  return (
                    <button
                      key={day.dateStr}
                      type="button"
                      onClick={() => toggleHabit(habit.id, day.dateStr)}
                      className={`w-7 h-9 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold transition-all ${
                        completedOnDay
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800/80 text-slate-500 hover:bg-slate-700 border border-slate-700/50'
                      } ${day.isToday ? 'ring-2 ring-cyan-400/80' : ''}`}
                      title={`${day.dateStr}: ${completedOnDay ? 'Completed' : 'Missed'}`}
                    >
                      <span className="text-[9px] opacity-75">{day.dayName}</span>
                      <span>{day.dayNum}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => deleteHabit(habit.id)}
                  className="p-1.5 ml-2 text-slate-600 hover:text-rose-400 transition-colors"
                  title="Delete Habit"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
