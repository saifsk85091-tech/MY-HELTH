import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Flame,
  Award,
  Droplets,
  Activity,
  Moon,
  CheckSquare,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Zap,
} from 'lucide-react';

export const ProgressAnalyticsView: React.FC = () => {
  const { healthScore, streakInfo, language, triggerConfetti } = useApp();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

  // Weekly data points for visualizations
  const weeklyData = [
    { day: 'Mon', date: 'Aug 26', score: 72, water: 6, sleep: 7.2, exercise: 1, habitsPct: 70 },
    { day: 'Tue', date: 'Aug 27', score: 78, water: 7, sleep: 7.0, exercise: 1, habitsPct: 85 },
    { day: 'Wed', date: 'Aug 28', score: 85, water: 8, sleep: 7.5, exercise: 1, habitsPct: 90 },
    { day: 'Thu', date: 'Aug 29', score: 80, water: 7, sleep: 6.8, exercise: 0, habitsPct: 80 },
    { day: 'Fri', date: 'Aug 30', score: 88, water: 8, sleep: 8.0, exercise: 1, habitsPct: 95 },
    { day: 'Sat', date: 'Aug 31', score: 92, water: 8, sleep: 7.8, exercise: 1, habitsPct: 100 },
    { day: 'Sun (Today)', date: 'Sep 01', score: healthScore.totalScore, water: 5, sleep: 7.0, exercise: 1, habitsPct: 85 },
  ];

  const badges = [
    {
      id: 'b-3',
      name: '3-Day Starter',
      nameBn: '৩-দিনের সূচনা ব্যাজ',
      streakRequired: 3,
      icon: '🌱',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
      unlocked: true,
      desc: 'Completed 3 consecutive healthy routine days.',
      descBn: 'টানা ৩ দিন স্বাস্থ্যকর রুটিন বজায় রেখেছেন।',
    },
    {
      id: 'b-7',
      name: '7-Day Warrior',
      nameBn: '৭-দিনের বিজয়ী ব্যাজ',
      streakRequired: 7,
      icon: '🔥',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
      unlocked: true,
      desc: 'Formed a steady neurological habit loop.',
      descBn: 'টানা এক সপ্তাহ নিয়ম মেনেছেন।',
    },
    {
      id: 'b-15',
      name: '15-Day Champion',
      nameBn: '১৫-দিনের চ্যাম্পিয়ন',
      streakRequired: 15,
      icon: '⚡',
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
      unlocked: false,
      desc: 'Massive reduction in late-night screen impulses.',
      descBn: 'দেরী রাতের মোবাইল ব্যবহারের অভ্যাস সফলভাবে নিয়ন্ত্রণ।',
    },
    {
      id: 'b-30',
      name: '30-Day Master',
      nameBn: '৩০-দিনের মাস্টার ব্যাজ',
      streakRequired: 30,
      icon: '👑',
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
      unlocked: false,
      desc: 'Complete lifestyle reset and dopamine balance.',
      descBn: 'সম্পূর্ণ নতুন ও প্রাণবন্ত জীবনযাত্রা তৈরি।',
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {language === 'en' ? 'Data & Analytics' : 'অগ্রগতি ও অ্যানালিটিক্স'}
              </span>
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              {language === 'en' ? 'Health Analytics & Streak Milestones' : 'দৈনিক স্বাস্থ্য স্কোর ও ব্যাজ'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {language === 'en'
                ? 'Track your measurable improvements across hydration, workouts, sleep, and discipline.'
                : 'প্রতি সপ্তাহের অগ্রগতি দেখুন এবং ধারাবাহিকতা বজায় রাখুন।'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/80 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTimeframe('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === 'weekly' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'en' ? 'Weekly' : 'সাপ্তাহিক'}
            </button>
            <button
              type="button"
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === 'monthly' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'en' ? 'Monthly' : 'মাসিক'}
            </button>
          </div>
        </div>
      </div>

      {/* Health Score Deep-Dive Breakdown (5x 20pts = 100pts) */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              {language === 'en' ? "Today's Health Score Breakdown" : 'আজকের হেলথ স্কোর বিশ্লেষণ'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'Calculated out of 100 points across 5 evidence-based pillars' : '৫টি মূল ভিত্তির ওপর ১০০ নম্বরে পরিমাপকৃত'}
            </p>
          </div>
          <div className="text-right">
            <span className="font-heading text-3xl font-extrabold text-emerald-400">
              {healthScore.totalScore}
            </span>
            <span className="text-xs text-slate-400 font-bold"> / 100</span>
          </div>
        </div>

        {/* 5 Pillars Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* Pillar 1: Water */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-cyan-400 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5" />
                {language === 'en' ? 'Water' : 'পানি'}
              </span>
              <span className="font-bold text-slate-200">{healthScore.waterScore} / 20</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(healthScore.waterScore / 20) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Pillar 2: Exercise */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                {language === 'en' ? 'Exercise' : 'ব্যায়াম'}
              </span>
              <span className="font-bold text-slate-200">{healthScore.exerciseScore} / 20</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(healthScore.exerciseScore / 20) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Pillar 3: Sleep */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-indigo-400 flex items-center gap-1">
                <Moon className="w-3.5 h-3.5" />
                {language === 'en' ? 'Sleep' : 'ঘুম'}
              </span>
              <span className="font-bold text-slate-200">{healthScore.sleepScore} / 20</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(healthScore.sleepScore / 20) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Pillar 4: Healthy Food */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'en' ? 'Food' : 'খাবার'}
              </span>
              <span className="font-bold text-slate-200">{healthScore.healthyFoodScore} / 20</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(healthScore.healthyFoodScore / 20) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Pillar 5: Habits */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-teal-400 flex items-center gap-1">
                <CheckSquare className="w-3.5 h-3.5" />
                {language === 'en' ? 'Habits' : 'অভ্যাস'}
              </span>
              <span className="font-bold text-slate-200">{healthScore.habitScore} / 20</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(healthScore.habitScore / 20) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Charts: Weekly Score Trend */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            {language === 'en' ? 'Weekly Health Score Trend' : 'সাপ্তাহিক স্বাস্থ্য স্কোর চার্ট'}
          </h3>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            +14% {language === 'en' ? 'this week' : 'এই সপ্তাহে বৃদ্ধি'}
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-4 pb-2">
          <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 px-2">
            {weeklyData.map((item, idx) => {
              const heightPct = (item.score / 100) * 100;
              const isHighest = item.score >= 90;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-[10px] text-slate-200 py-1 px-1.5 rounded border border-slate-700 whitespace-nowrap shadow-lg">
                    {item.score}% ({item.water} gls)
                  </div>

                  {/* Bar */}
                  <div className="w-full max-w-[40px] bg-slate-900/60 rounded-t-xl overflow-hidden h-full flex flex-col justify-end p-0.5">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ${
                        isHighest
                          ? 'bg-gradient-to-t from-emerald-500 to-cyan-400 shadow-md shadow-emerald-500/20'
                          : 'bg-emerald-500/70 group-hover:bg-emerald-400'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    ></div>
                  </div>

                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-full text-center">
                    {item.day.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Streak Badges Showcase */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-100 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
              {language === 'en' ? 'Consistency Badges & Milestones' : 'ধারাবাহিকতা ব্যাজ ও অর্জন'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'Reward loops for sustained habit discipline' : 'নিয়মিত অভ্যাস বজায় রাখার জন্য আনলককৃত ব্যাজ'}
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
            {streakInfo.currentStreak} {language === 'en' ? 'Days Active' : 'দিন সক্রিয়'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                onClick={() => {
                  if (badge.unlocked) triggerConfetti();
                }}
                className={`p-4 rounded-2xl border bg-gradient-to-br transition-all flex flex-col justify-between ${
                  badge.color
                } ${badge.unlocked ? 'cursor-pointer hover:scale-105 shadow-lg' : 'opacity-50 grayscale'}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{badge.icon}</span>
                    <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                      badge.unlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {badge.unlocked ? (language === 'en' ? 'Unlocked' : 'অর্জিত') : `${badge.streakRequired} Days`}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">
                    {language === 'en' ? badge.name : badge.nameBn}
                  </h4>
                  <p className="text-[11px] text-slate-300/80 mt-1 leading-relaxed">
                    {language === 'en' ? badge.desc : badge.descBn}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/40 text-[10px] font-bold">
                  {badge.unlocked
                    ? (language === 'en' ? '✓ Mastered' : '✓ সম্পন্ন')
                    : (language === 'en' ? `Target: ${badge.streakRequired} days` : `লক্ষ্য: ${badge.streakRequired} দিন`)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
