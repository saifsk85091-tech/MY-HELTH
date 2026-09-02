import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  AlertCircle,
  Moon,
  Clock,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  Shield,
} from 'lucide-react';

export const ScreenTimeView: React.FC = () => {
  const {
    screenTimeHours,
    screenTimeGoal,
    setScreenTimeHours,
    setScreenTimeGoal,
    language,
    triggerConfetti,
  } = useApp();

  const [inputHours, setInputHours] = useState(screenTimeHours.toString());
  const [inputGoal, setInputGoal] = useState(screenTimeGoal.toString());
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(inputHours) || 0;
    const g = parseFloat(inputGoal) || 3.5;
    setScreenTimeHours(h);
    setScreenTimeGoal(g);
    setSavedMsg(true);
    if (h <= g) triggerConfetti();
    setTimeout(() => setSavedMsg(false), 2500);
  };

  const isUnderGoal = screenTimeHours <= screenTimeGoal;
  const ratio = Math.min(100, Math.round((screenTimeHours / (screenTimeGoal || 1)) * 100));

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              {language === 'en' ? 'Digital Awareness & Sleep' : 'স্ক্রিন টাইম নিয়ন্ত্রণ'}
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-100 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-400" />
            {language === 'en' ? 'Screen Time & Dopamine Detox' : 'স্ক্রিন টাইম ও ডিজিটাল ব্যালেন্স'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {language === 'en'
              ? 'Excessive late-night scrolling spikes impulsive habits. Regain control with mindful boundaries.'
              : 'অতিরিক্ত মোবাইল ব্যবহার ঘুমের ব্যাঘাত ঘটায়। পরিমিত স্ক্রিন টাইম দিয়ে মনোযোগ ফিরিয়ে আনুন।'}
          </p>
        </div>

        <div className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 self-start sm:self-auto ${
          isUnderGoal
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
        }`}>
          {isUnderGoal ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>
            {isUnderGoal
              ? (language === 'en' ? 'Within Healthy Goal' : 'লক্ষ্যের মধ্যে রয়েছে')
              : (language === 'en' ? 'Exceeding Target' : 'লক্ষ্যের চেয়ে বেশি')}
          </span>
        </div>
      </div>

      {/* Manual Input Form */}
      <form onSubmit={handleSave} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {language === 'en' ? "Today's Total Screen Time (Hours)" : 'আজকের স্ক্রিন টাইম (ঘণ্টা)'}
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="24"
              id="input-screen-hours"
              value={inputHours}
              onChange={(e) => setInputHours(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'en' ? 'Daily Max Target Goal (Hours)' : 'দৈনিক সর্বোচ্চ লক্ষ্য (ঘণ্টা)'}
            </label>
            <input
              type="number"
              step="0.1"
              min="0.5"
              max="16"
              id="input-screen-goal"
              value={inputGoal}
              onChange={(e) => setInputGoal(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedMsg ? (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {language === 'en' ? 'Screen time updated!' : 'আপডেট করা হয়েছে!'}
            </span>
          ) : <div></div>}

          <button
            type="submit"
            id="save-screentime-btn"
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            {language === 'en' ? 'Update Screen Log' : 'লগ আপডেট করুন'}
          </button>
        </div>
      </form>

      {/* Visual Progress Meter */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-semibold">
            {language === 'en' ? 'Current Ratio:' : 'অনুপাত:'}{' '}
            <strong className="text-slate-100">{screenTimeHours}h</strong> / {screenTimeGoal}h
          </span>
          <span className={`font-bold ${isUnderGoal ? 'text-emerald-400' : 'text-rose-400'}`}>
            {ratio}% of Goal
          </span>
        </div>

        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isUnderGoal
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                : 'bg-gradient-to-r from-amber-500 to-rose-500'
            }`}
            style={{ width: `${Math.min(100, ratio)}%` }}
          ></div>
        </div>
      </div>

      {/* Evidence-Based Digital Boundary Rules */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-400" />
          {language === 'en' ? 'Evidence-Based Digital Wellness Rules' : 'স্ক্রিন টাইম কমানোর বৈজ্ঞানিক কৌশল'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">
              📱 1. {language === 'en' ? '10 PM Screen Curfew' : 'রাত ১০টায় ফোন বন্ধ'}
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {language === 'en'
                ? 'Keep phone charging away from the bed. Protects melatonin and deep REM sleep.'
                : 'বিছানা থেকে দূরে ফোন চার্জে রাখুন। এতে গভীর ঘুম নিশ্চিত হয়।'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">
              ⚡ 2. {language === 'en' ? '10-Min Urge Delay' : '১০ মিনিট বিরতি'}
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {language === 'en'
                ? 'Whenever you feel like endless scrolling, do 10 push-ups or drink water first.'
                : 'সোশ্যাল মিডিয়া স্ক্রল করার ইচ্ছা হলে পানি পান করুন বা স্ট্রেচিং করুন।'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="text-cyan-400 font-bold block mb-1">
              📖 3. {language === 'en' ? 'Physical Replacements' : 'বিকল্প অভ্যাস'}
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {language === 'en'
                ? 'Replace doom-scrolling with reading physical books, workouts, or learning a skill.'
                : 'ফোনের বদলে ভালো বই পড়া, শরীরচর্চা বা নতুন কোনো স্কিল শিখুন।'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
