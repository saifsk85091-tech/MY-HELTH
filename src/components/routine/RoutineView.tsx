import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoutinePeriod, RoutineItem } from '../../types';
import {
  Sun,
  CloudSun,
  Sunset,
  Moon,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  Edit2,
  Clock,
  Sparkles,
  Check,
  RotateCcw,
} from 'lucide-react';

export const RoutineView: React.FC = () => {
  const {
    routines,
    toggleRoutine,
    addRoutineItem,
    updateRoutineItem,
    deleteRoutineItem,
    language,
    triggerConfetti,
  } = useApp();

  const [selectedPeriod, setSelectedPeriod] = useState<RoutinePeriod | 'all'>('all');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New item form
  const [newItemPeriod, setNewItemPeriod] = useState<RoutinePeriod>('morning');
  const [newItemTime, setNewItemTime] = useState('07:00 AM');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemTitleBn, setNewItemTitleBn] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<RoutineItem['category']>('general');

  // Edit item form
  const [editTime, setEditTime] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    addRoutineItem({
      period: newItemPeriod,
      time: newItemTime,
      title: newItemTitle,
      titleBn: newItemTitleBn || newItemTitle,
      category: newItemCategory,
      completed: false,
    });

    setNewItemTitle('');
    setNewItemTitleBn('');
    setIsAddingItem(false);
    triggerConfetti();
  };

  const handleStartEdit = (item: RoutineItem) => {
    setEditingId(item.id);
    setEditTime(item.time);
    setEditTitle(language === 'en' ? item.title : item.titleBn || item.title);
  };

  const handleSaveEdit = (id: string) => {
    updateRoutineItem(id, {
      time: editTime,
      title: editTitle,
    });
    setEditingId(null);
  };

  const periods: { id: RoutinePeriod | 'all'; label: string; labelBn: string; icon: any }[] = [
    { id: 'all', label: 'Full Day', labelBn: 'সারাদিনের রুটিন', icon: Sparkles },
    { id: 'morning', label: 'Morning', labelBn: 'সকাল', icon: Sun },
    { id: 'afternoon', label: 'Afternoon', labelBn: 'দুপুর', icon: CloudSun },
    { id: 'evening', label: 'Evening', labelBn: 'বিকাল / সন্ধ্যা', icon: Sunset },
    { id: 'night', label: 'Night', labelBn: 'রাত', icon: Moon },
  ];

  const filteredRoutines = selectedPeriod === 'all'
    ? routines
    : routines.filter((r) => r.period === selectedPeriod);

  const completedCount = filteredRoutines.filter((r) => r.completed).length;

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {language === 'en' ? 'Evidence-Based Scheduling' : 'দৈনন্দিন রুটিন ব্যবস্থাপনা'}
            </span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-100">
            {language === 'en' ? 'Daily Habit & Routine System' : 'দৈনিক রুটিন ও অভ্যাস সূচি'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {language === 'en'
              ? 'Customize your times. Consistency primes your brain chemistry for high energy and focus.'
              : 'আপনার প্রয়োজনমতো সময় পরিবর্তন করুন। সুনির্দিষ্ট সময়সূচি মস্তিষ্ককে শান্ত ও কর্মঠ রাখে।'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingItem(true)}
          id="add-routine-btn"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Add Routine Task' : 'নতুন কাজ যোগ করুন'}</span>
        </button>
      </div>

      {/* Period Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {periods.map((p) => {
          const Icon = p.icon;
          const isSelected = selectedPeriod === p.id;
          return (
            <button
              key={p.id}
              type="button"
              id={`period-tab-${p.id}`}
              onClick={() => setSelectedPeriod(p.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{language === 'en' ? p.label : p.labelBn}</span>
            </button>
          );
        })}
      </div>

      {/* Completion Counter */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-400">
        <span>
          {language === 'en' ? 'Completed Tasks:' : 'সম্পন্ন কাজ:'}{' '}
          <strong className="text-emerald-400 font-bold">{completedCount}</strong> / {filteredRoutines.length}
        </span>
        <span className="text-[11px] text-slate-500">
          {language === 'en' ? 'Tap any card to toggle status' : 'সম্পন্ন করতে কার্ডে ট্যাপ করুন'}
        </span>
      </div>

      {/* Add Task Modal / Accordion */}
      {isAddingItem && (
        <form
          onSubmit={handleAddSubmit}
          className="bg-slate-800/90 border border-emerald-500/40 rounded-2xl p-5 shadow-2xl space-y-4 animate-fade-in"
        >
          <h3 className="font-heading text-sm font-bold text-emerald-400 flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            {language === 'en' ? 'Add New Custom Routine Task' : 'নতুন রুটিন যুক্ত করুন'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">
                {language === 'en' ? 'Day Period' : 'দিনের অংশ'}
              </label>
              <select
                value={newItemPeriod}
                id="routine-period-select"
                onChange={(e: any) => setNewItemPeriod(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="morning">Morning (সকাল)</option>
                <option value="afternoon">Afternoon (দুপুর)</option>
                <option value="evening">Evening (বিকাল/সন্ধ্যা)</option>
                <option value="night">Night (রাত)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">
                {language === 'en' ? 'Time' : 'সময়'}
              </label>
              <input
                type="text"
                required
                id="routine-time-input"
                value={newItemTime}
                onChange={(e) => setNewItemTime(e.target.value)}
                placeholder="e.g. 06:30 AM"
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">
                {language === 'en' ? 'Category' : 'বিভাগ'}
              </label>
              <select
                value={newItemCategory}
                id="routine-category-select"
                onChange={(e: any) => setNewItemCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="sleep">Sleep & Wake (ঘুম ও জাগরণ)</option>
                <option value="water">Hydration (পানি পান)</option>
                <option value="exercise">Exercise & Walk (শরীরচর্চা)</option>
                <option value="food">Healthy Food (খাবার)</option>
                <option value="digital">Digital Detox (স্ক্রিন টাইম)</option>
                <option value="mind">Mindfulness (শ্বাস ও মন)</option>
                <option value="general">General (অন্যান্য)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1">
              {language === 'en' ? 'Activity Name' : 'কাজের নাম'}
            </label>
            <input
              type="text"
              required
              id="routine-title-input"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              placeholder={language === 'en' ? 'e.g. 15 Mins Push-ups and Core' : 'যেমন: ১৫ মিনিট পুশ-আপ ও ব্যায়াম'}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingItem(false)}
              className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-600"
            >
              {language === 'en' ? 'Cancel' : 'বাতিল'}
            </button>
            <button
              type="submit"
              id="submit-new-routine-btn"
              className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
            >
              {language === 'en' ? 'Save Task' : 'সংরক্ষণ করুন'}
            </button>
          </div>
        </form>
      )}

      {/* Routine Cards List */}
      <div className="space-y-3">
        {filteredRoutines.map((item) => {
          const isEditing = editingId === item.id;
          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                item.completed
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                  : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600 text-slate-100'
              }`}
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100"
                      placeholder="Time (e.g. 07:00 AM)"
                    />
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100"
                      placeholder="Activity name"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 text-xs bg-slate-700 text-slate-300 rounded-lg"
                    >
                      {language === 'en' ? 'Cancel' : 'বাতিল'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(item.id)}
                      className="px-3 py-1 text-xs bg-emerald-500 text-slate-950 font-bold rounded-lg"
                    >
                      {language === 'en' ? 'Save' : 'সেভ'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  {/* Checkbox and text */}
                  <div
                    onClick={() => toggleRoutine(item.id)}
                    className="flex items-start sm:items-center gap-3 cursor-pointer flex-1"
                  >
                    <button
                      type="button"
                      className={`mt-0.5 sm:mt-0 shrink-0 ${
                        item.completed ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-sm font-bold ${
                            item.completed ? 'line-through text-slate-400' : 'text-slate-100'
                          }`}
                        >
                          {language === 'en' ? item.title : item.titleBn || item.title}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-400">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {language === 'en' ? item.description : item.descriptionBn || item.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Edit / Delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 rounded-lg transition-colors"
                      title="Edit time or title"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRoutineItem(item.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-700/60 rounded-lg transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
