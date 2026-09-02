import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  CalendarDays,
  CheckSquare,
  BarChart3,
  HeartPulse,
  User,
  Sparkles,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeView, setActiveView, language } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: language === 'en' ? 'Home' : 'হোম',
      icon: Home,
    },
    {
      id: 'routine',
      label: language === 'en' ? 'Routine' : 'রুটিন',
      icon: CalendarDays,
    },
    {
      id: 'tracker',
      label: language === 'en' ? 'Trackers' : 'ট্র্যাকার',
      icon: CheckSquare,
    },
    {
      id: 'mind',
      label: language === 'en' ? 'Mind & Stress' : 'মন ও স্ট্রেস',
      icon: HeartPulse,
    },
    {
      id: 'progress',
      label: language === 'en' ? 'Progress' : 'অগ্রগতি',
      icon: BarChart3,
    },
    {
      id: 'profile',
      label: language === 'en' ? 'Profile' : 'প্রোফাইল',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 sm:hidden shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-emerald-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
