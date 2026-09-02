import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExerciseItem } from '../../types';
import {
  Dumbbell,
  CheckCircle2,
  Circle,
  Timer,
  Flame,
  Award,
  Sparkles,
  Play,
  RotateCcw,
  Check,
} from 'lucide-react';

export const ExerciseView: React.FC = () => {
  const { exercises, toggleExercise, language, triggerConfetti } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTimerExercise, setActiveTimerExercise] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const categories = [
    'All',
    'Home Workout',
    'Push-ups',
    'Squats',
    'Stretching',
    'Walking',
    'Meditation',
  ];

  const filtered = selectedCategory === 'All'
    ? exercises
    : exercises.filter((ex) => ex.category === selectedCategory);

  const completedCount = exercises.filter((e) => e.completedToday).length;

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {language === 'en' ? 'Physical Health & Dopamine' : 'শরীরচর্চা ও এনার্জি'}
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-100 flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-emerald-400" />
            {language === 'en' ? 'Beginner-Friendly Exercise Catalog' : 'শরীরচর্চা ও ব্যায়াম সূচি'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {language === 'en'
              ? 'Physical movement releases endorphins, channels energy, and builds natural strength.'
              : 'প্রতিদিনের শরীরচর্চা মানসিক অস্থিরতা দূর করে এবং প্রাকৃতিক শক্তি বৃদ্ধি করে।'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-300 self-start sm:self-auto">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>
            {completedCount} / {exercises.length} {language === 'en' ? 'Completed Today' : 'আজ সম্পন্ন'}
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ex) => {
          const isDone = ex.completedToday;
          return (
            <div
              key={ex.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-100'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {ex.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {ex.difficulty}
                  </span>
                </div>

                <h4 className="text-base font-heading font-bold text-slate-100">
                  {language === 'en' ? ex.name : ex.nameBn || ex.name}
                </h4>

                <div className="flex items-center gap-3 text-xs text-emerald-400 font-semibold my-2">
                  <span className="flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    {language === 'en' ? ex.duration : ex.durationBn || ex.duration}
                  </span>
                  {ex.targetReps && (
                    <span>• {ex.targetReps}</span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {language === 'en' ? ex.instructions : ex.instructionsBn}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-[11px] text-slate-400 mb-4">
                  <strong className="text-slate-300 font-semibold block mb-0.5">
                    {language === 'en' ? 'Evidence-Based Benefit:' : 'উপকারিতা:'}
                  </strong>
                  {language === 'en' ? ex.benefits : ex.benefitsBn}
                </div>
              </div>

              {/* Complete Toggle Button */}
              <button
                type="button"
                id={`exercise-complete-${ex.id}`}
                onClick={() => toggleExercise(ex.id)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isDone
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                }`}
              >
                {isDone ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 fill-emerald-400/20 text-emerald-400" />
                    <span>{language === 'en' ? '✓ Completed Today' : '✓ সম্পন্ন হয়েছে'}</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>{language === 'en' ? 'Mark Complete' : 'সম্পন্ন করুন'}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
