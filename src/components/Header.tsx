import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Globe,
  Bell,
  Sparkles,
  Wind,
  Timer,
  ShieldCheck,
  User as UserIcon,
  Code2,
  Settings,
  LayoutDashboard
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    user,
    streakInfo,
    healthScore,
    activeView,
    setActiveView,
    setIsAuthModalOpen,
    setIsFocusModalOpen,
    setIsBreathingModalOpen,
    setIsDisclaimerModalOpen,
    setIsRemindersModalOpen,
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="header-brand"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                YouthFit
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Youth Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {language === 'en' ? 'Healthy Habit & Lifestyle' : 'স্বাস্থ্যকর অভ্যাস ও লাইফস্টাইল'}
            </p>
          </div>
        </div>

        {/* Quick Mind & Focus Tools (Desktop/Tablet) */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setIsBreathingModalOpen(true)}
            id="quick-breathing-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-950/60 hover:bg-teal-900/80 border border-teal-700/40 text-teal-300 text-xs font-medium transition-colors shadow-sm"
            title="4-4-6 Breathing Exercise"
          >
            <Wind className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>{language === 'en' ? '4-4-6 Breath' : 'শ্বাস নিয়ন্ত্রণ'}</span>
          </button>

          <button
            onClick={() => setIsFocusModalOpen(true)}
            id="quick-focus-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700/40 text-indigo-300 text-xs font-medium transition-colors shadow-sm"
            title="Focus Mode Timer"
          >
            <Timer className="w-3.5 h-3.5 text-indigo-400" />
            <span>{language === 'en' ? 'Focus Timer' : 'ফোকাস টাইমার'}</span>
          </button>

          <button
            onClick={() => setIsDisclaimerModalOpen(true)}
            id="quick-disclaimer-btn"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 text-xs font-medium transition-colors"
            title="Health & Medical Guidance"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'en' ? 'Guidance' : 'স্বাস্থ্য তথ্য'}</span>
          </button>
        </div>

        {/* Right actions: Streak, Language, Admin/Code, Reminders, User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak pill */}
          <div 
            onClick={() => setActiveView('progress')}
            id="streak-indicator"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold cursor-pointer hover:bg-amber-500/20 transition-colors"
            title={`${streakInfo.currentStreak} Days Streak`}
          >
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>{streakInfo.currentStreak} {language === 'en' ? 'Days' : 'দিন'}</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            id="language-toggle-btn"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            title="Change Language / ভাষা পরিবর্তন"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* Reminders button */}
          <button
            onClick={() => setIsRemindersModalOpen(true)}
            id="reminders-toggle-btn"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors relative"
            title="Reminders & Notifications"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>

          {/* Backend / Code Export button */}
          <button
            onClick={() => setActiveView(activeView === 'code-export' ? 'dashboard' : 'code-export')}
            id="backend-code-export-btn"
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              activeView === 'code-export'
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-emerald-400'
            }`}
            title="PHP + MySQL Code & cPanel Export"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>PHP & MySQL</span>
          </button>

          {/* Admin Panel button */}
          <button
            onClick={() => setActiveView(activeView === 'admin' ? 'dashboard' : 'admin')}
            id="admin-panel-toggle-btn"
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              activeView === 'admin'
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-cyan-400'
            }`}
            title="PHP Admin Panel"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Admin Panel' : 'অ্যাডমিন প্যানেল'}</span>
          </button>

          {/* User Profile Avatar / Profile Button */}
          <button
            onClick={() => setActiveView('profile')}
            id="user-profile-btn"
            className="flex items-center gap-2 p-1.5 pl-2 sm:pr-3 rounded-full bg-slate-800 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-750 transition-colors"
            title={language === 'en' ? 'Profile & Health Goals' : 'প্রোফাইল ও স্বাস্থ্য লক্ষ্য'}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-xs shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'Y'}
            </div>
            <span className="text-xs font-semibold text-slate-200 hidden md:block max-w-[100px] truncate">
              {user?.name ? user.name.split(' ')[0] : (language === 'en' ? 'Profile' : 'প্রোফাইল')}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
