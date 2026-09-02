import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Settings,
  Flame,
  ShieldCheck,
  Moon,
  Sun,
  Smartphone,
  Droplets,
  Globe,
  Bell,
  Sparkles,
  Download,
  Trash2,
  CheckCircle2,
  Edit3,
  Award,
  ChevronRight,
  Code2,
  Check
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    user,
    language,
    setLanguage,
    updateUserProfile,
    setIsOnboardingOpen,
    setIsRemindersModalOpen,
    setIsDisclaimerModalOpen,
    setActiveView,
    streakInfo,
    healthScore,
    setCustomWaterGoal,
    setScreenTimeGoal,
    setSleepHours,
    waterGoal,
    screenTimeGoal,
    sleepHours,
    triggerConfetti
  } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(user?.name || 'Saif Ahmed');
  const [tempAge, setTempAge] = useState(user?.age || 22);

  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [tempWaterGoal, setTempWaterGoal] = useState(waterGoal || 8);
  const [tempScreenGoal, setTempScreenGoal] = useState(screenTimeGoal || 3.5);
  const [tempSleepHours, setTempSleepHours] = useState(sleepHours || 7);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name: tempName, age: tempAge });
    setIsEditingProfile(false);
    setSaveSuccess(true);
    triggerConfetti();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomWaterGoal(tempWaterGoal);
    setScreenTimeGoal(tempScreenGoal);
    setSleepHours(tempSleepHours);
    setIsEditingGoals(false);
    setSaveSuccess(true);
    triggerConfetti();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportData = () => {
    const backup = {
      user,
      streakInfo,
      exportedAt: new Date().toISOString(),
      routines: localStorage.getItem('youthfit_routines'),
      habits: localStorage.getItem('youthfit_habits'),
      water: localStorage.getItem(`youthfit_water_${new Date().toISOString().split('T')[0]}`),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `youthfit-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    if (window.confirm(language === 'en' ? 'Reset today’s tracker data and routine state?' : 'আজকের ট্র্যাকার ও রুটিন ডেটা রিসেট করবেন?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-2xl shadow-xl shadow-emerald-500/20">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'Y'}
          </div>

          <div className="flex-1 space-y-1.5 w-full">
            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {language === 'en' ? 'Your Name' : 'আপনার নাম'}
                    </label>
                    <input
                      type="text"
                      required
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {language === 'en' ? 'Age (Years)' : 'বয়স (বছর)'}
                    </label>
                    <input
                      type="number"
                      min="12"
                      max="99"
                      value={tempAge}
                      onChange={(e) => setTempAge(parseInt(e.target.value) || 20)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-center sm:justify-start">
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Save Profile' : 'সংরক্ষণ করুন'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                  >
                    {language === 'en' ? 'Cancel' : 'বাতিল'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                    {user?.name || 'Saif Ahmed'}
                  </h2>
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="p-1 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                    title={language === 'en' ? 'Edit Profile Name' : 'নাম পরিবর্তন করুন'}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                    {user?.age ? `${user.age} Yrs` : 'Youth'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {language === 'en' ? 'Direct local profile – No login required' : 'সরাসরি এক্সেস – লগইনের প্রয়োজন নেই'}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <strong>{streakInfo.currentStreak} {language === 'en' ? 'Days Streak' : 'দিন স্ট্রাইক'}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <strong>{healthScore.totalScore}/100 {language === 'en' ? 'Health Score' : 'স্বাস্থ্য স্কোর'}</strong>
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              id="reconfigure-routine-wizard-btn"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Customize Routine' : 'রুটিন উইজার্ড'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Goals Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            <h3 className="font-heading font-bold text-base text-white">
              {language === 'en' ? 'Personal Health Goals & Routine Limits' : 'ব্যক্তিগত স্বাস্থ্য লক্ষ্য ও রুটিন'}
            </h3>
          </div>
          <button
            onClick={() => setIsEditingGoals(!isEditingGoals)}
            id="toggle-edit-goals-btn"
            className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingGoals ? (language === 'en' ? 'Cancel' : 'বাতিল') : (language === 'en' ? 'Edit Goals' : 'এডিট করুন')}</span>
          </button>
        </div>

        {saveSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'en' ? 'Goals updated successfully!' : 'লক্ষ্য সফলভাবে আপডেট হয়েছে!'}</span>
          </div>
        )}

        {isEditingGoals ? (
          <form onSubmit={handleSaveGoals} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  {language === 'en' ? 'Water Goal (Glasses/Day)' : 'দৈনিক পানি পান (গ্লাস)'}
                </label>
                <input
                  type="number"
                  min="4"
                  max="20"
                  id="input-edit-water-goal"
                  value={tempWaterGoal}
                  onChange={(e) => setTempWaterGoal(parseInt(e.target.value) || 8)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'en' ? 'Max Screen Time (Hours)' : 'স্ক্রিন টাইম সীমা (ঘণ্টা)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="12"
                  id="input-edit-screen-goal"
                  value={tempScreenGoal}
                  onChange={(e) => setTempScreenGoal(parseFloat(e.target.value) || 3.5)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  {language === 'en' ? 'Target Sleep (Hours)' : 'লক্ষ্য ঘুম (ঘণ্টা)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="5"
                  max="10"
                  id="input-edit-sleep-goal"
                  value={tempSleepHours}
                  onChange={(e) => setTempSleepHours(parseFloat(e.target.value) || 7)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                id="save-goals-btn"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
              >
                {language === 'en' ? 'Save Target Goals' : 'সংরক্ষণ করুন'}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">{language === 'en' ? 'Water Target' : 'পানি পানের লক্ষ্য'}</p>
                <p className="text-sm font-bold text-slate-100">{waterGoal} {language === 'en' ? 'Glasses (2.5L)' : 'গ্লাস'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">{language === 'en' ? 'Max Screen Time' : 'সর্বোচ্চ স্ক্রিন সময়'}</p>
                <p className="text-sm font-bold text-slate-100">{screenTimeGoal} {language === 'en' ? 'Hours / day' : 'ঘণ্টা / দিন'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">{language === 'en' ? 'Sleep Target' : 'ঘুমের লক্ষ্য'}</p>
                <p className="text-sm font-bold text-slate-100">{sleepHours} {language === 'en' ? 'Hours / night' : 'ঘণ্টা / রাত'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick App Actions & Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Onboarding re-run */}
        <div 
          onClick={() => setIsOnboardingOpen(true)}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between group"
          id="profile-relaunch-onboarding"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-200">
                {language === 'en' ? 'Personal Routine Wizard' : 'রুটিন কাস্টমাইজেশন উইজার্ড'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Reconfigure sleep/wake times and goals' : 'ঘুম ও জাগার সময় অনুসারে রুটিন সাজান'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Reminders & Notifications */}
        <div 
          onClick={() => setIsRemindersModalOpen(true)}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group"
          id="profile-open-reminders"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-200">
                {language === 'en' ? 'Daily Notification Reminders' : 'দৈনিক রিমাইন্ডার ও নোটিফিকেশন'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Water, exercise, and screen curfew alerts' : 'পানি, ব্যায়াম ও স্ক্রিন কারফিউ অ্যালার্ট'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Health Disclaimer */}
        <div 
          onClick={() => setIsDisclaimerModalOpen(true)}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between group"
          id="profile-open-disclaimer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-200">
                {language === 'en' ? 'Evidence-Based Health Disclaimer' : 'বিজ্ঞানসম্মত মেডিকেল নির্দেশিকা'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Professional medical advice boundaries' : 'ভুল তথ্যমুক্ত সঠিক গাইডলাইন'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Backend & MySQL Architecture */}
        <div 
          onClick={() => setActiveView('code-export')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all flex items-center justify-between group"
          id="profile-open-code-export"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-200">
                {language === 'en' ? 'PHP & MySQL Architecture' : 'পিএইচপি ও মাইএসকিউএল ব্যাকএন্ড'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'cPanel setup, SQL scripts & REST APIs' : 'cPanel হোস্টিং সেটআপ ও এপিআই'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Data Management & Backup */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-heading font-bold text-base text-white">
          {language === 'en' ? 'Data Backup & Privacy' : 'ডেটা ব্যাকআপ ও প্রাইভেসি'}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          {language === 'en'
            ? 'YouthFit stores your daily records securely in offline local storage and can sync with your custom PHP/MySQL backend server.'
            : 'YouthFit আপনার গোপনীয়তাকে সম্মান করে। আপনি যেকোনো সময় ডেটা এক্সপোর্ট করতে পারেন।'}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleExportData}
            id="export-json-backup-btn"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{language === 'en' ? 'Export Local Backup (JSON)' : 'ব্যাকআপ ডাউনলোড করুন'}</span>
          </button>

          <button
            onClick={handleResetData}
            id="reset-local-data-btn"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>{language === 'en' ? 'Clear Today State' : 'ডেটা রিসেট'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
