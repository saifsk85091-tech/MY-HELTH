import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WaterTrackerView } from '../water/WaterTrackerView';
import { HabitTrackerView } from '../habits/HabitTrackerView';
import { ExerciseView } from '../exercise/ExerciseView';
import { NutritionView } from '../nutrition/NutritionView';
import { ScreenTimeView } from '../screentime/ScreenTimeView';
import {
  Droplets,
  CheckSquare,
  Dumbbell,
  Utensils,
  Smartphone,
  Sparkles,
} from 'lucide-react';

export const TrackersHubView: React.FC = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'water' | 'habits' | 'exercise' | 'food' | 'screen'>('water');

  const tabs = [
    { id: 'water', label: 'Water', labelBn: 'পানি', icon: Droplets, color: 'text-cyan-400' },
    { id: 'habits', label: 'Habits', labelBn: 'অভ্যাস', icon: CheckSquare, color: 'text-emerald-400' },
    { id: 'exercise', label: 'Workout', labelBn: 'ব্যায়াম', icon: Dumbbell, color: 'text-amber-400' },
    { id: 'food', label: 'Food Planner', labelBn: 'খাবার', icon: Utensils, color: 'text-rose-400' },
    { id: 'screen', label: 'Screen Time', labelBn: 'স্ক্রিন টাইম', icon: Smartphone, color: 'text-indigo-400' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Sub-navigation bar */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              id={`tracker-hub-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-800 text-slate-100 border border-slate-700 shadow-md scale-100'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-500'}`} />
              <span>{language === 'en' ? tab.label : tab.labelBn}</span>
            </button>
          );
        })}
      </div>

      {/* Render selected tracker */}
      {activeTab === 'water' && <WaterTrackerView />}
      {activeTab === 'habits' && <HabitTrackerView />}
      {activeTab === 'exercise' && <ExerciseView />}
      {activeTab === 'food' && <NutritionView />}
      {activeTab === 'screen' && <ScreenTimeView />}
    </div>
  );
};
