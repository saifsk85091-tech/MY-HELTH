import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JournalEntry } from '../../types';
import {
  HeartPulse,
  Wind,
  Timer,
  BookOpen,
  Headphones,
  Footprints,
  Sparkles,
  Smile,
  Meh,
  Frown,
  Plus,
  Trash2,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export const StressHubView: React.FC = () => {
  const {
    journalEntries,
    addJournalEntry,
    setIsBreathingModalOpen,
    setIsFocusModalOpen,
    language,
    triggerConfetti,
  } = useApp();

  const [selectedMood, setSelectedMood] = useState<JournalEntry['mood']>('good');
  const [noteText, setNoteText] = useState('');
  const [activeSoundtrack, setActiveSoundtrack] = useState<string | null>(null);

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    addJournalEntry(selectedMood, noteText);
    setNoteText('');
  };

  const moods: { id: JournalEntry['mood']; icon: string; label: string; labelBn: string; color: string }[] = [
    { id: 'great', icon: '⚡', label: 'Energetic', labelBn: 'উদ্যমী', color: 'text-amber-400 border-amber-400/40' },
    { id: 'good', icon: '😊', label: 'Good & Calm', labelBn: 'শান্ত ও ভালো', color: 'text-emerald-400 border-emerald-400/40' },
    { id: 'normal', icon: '😐', label: 'Normal', labelBn: 'স্বাভাবিক', color: 'text-slate-300 border-slate-600' },
    { id: 'stressed', icon: '😔', label: 'Stressed', labelBn: 'চাপগ্রস্ত', color: 'text-orange-400 border-orange-400/40' },
    { id: 'down', icon: '🌧️', label: 'Overwhelmed', labelBn: 'ক্লান্ত', color: 'text-rose-400 border-rose-400/40' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20">
            {language === 'en' ? 'Mental Wellness & Focus' : 'মানসিক প্রশান্তি ও চাপমুক্তি'}
          </span>
        </div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-teal-400" />
          {language === 'en' ? 'Stress Management & Mind Sanctuary' : 'মানসিক স্বাস্থ্য ও স্ট্রেস ম্যানেজমেন্ট'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          {language === 'en'
            ? 'Regulate your nervous system through somatic breathing, private reflection, and mindful movement.'
            : 'শ্বাস-প্রশ্বাসের ব্যায়াম, ডায়েরি এবং মেডিটেশনের মাধ্যমে যেকোনো অস্থিরতা কাটিয়ে উঠুন।'}
        </p>
      </div>

      {/* Stress Relief Toolkit Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Deep Breathing */}
        <div
          onClick={() => setIsBreathingModalOpen(true)}
          id="mind-card-breathing"
          className="p-5 rounded-2xl bg-gradient-to-br from-teal-950/60 to-slate-900 border border-teal-500/30 hover:border-teal-400 transition-all cursor-pointer shadow-lg group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Wind className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-base font-bold text-teal-200">
            {language === 'en' ? '4-4-6 Deep Breathing' : '৪-৪-৬ শ্বাস-প্রশ্বাস'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'en'
              ? '4s Inhale, 4s Hold, 6s Exhale with animated expanding circle.'
              : 'অ্যানিমেটেড ভিজ্যুয়াল দিয়ে স্নায়ু শান্ত করুন।'}
          </p>
          <span className="text-[11px] font-bold text-teal-400 mt-3 inline-block">
            {language === 'en' ? 'Start Session →' : 'শুরু করুন →'}
          </span>
        </div>

        {/* 2. Focus Mode Timer */}
        <div
          onClick={() => setIsFocusModalOpen(true)}
          id="mind-card-focus"
          className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 hover:border-indigo-400 transition-all cursor-pointer shadow-lg group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Timer className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-base font-bold text-indigo-200">
            {language === 'en' ? 'Focus Mode (Pomodoro)' : 'ডিপ ফোকাস টাইমার'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'en'
              ? '25, 45, 60 min timers with calming 136Hz ambient frequency.'
              : 'মোবাইল ছাড়া একটানা মনোযোগে পড়াশোনা বা কাজ।'}
          </p>
          <span className="text-[11px] font-bold text-indigo-400 mt-3 inline-block">
            {language === 'en' ? 'Open Timer →' : 'টাইমার খুলুন →'}
          </span>
        </div>

        {/* 3. Short Walk */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
            <Footprints className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-base font-bold text-emerald-200">
            {language === 'en' ? '10-Min Mindful Walk' : '১০ মিনিট হাঁটা'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'en'
              ? 'Step outside without earphones. Notice 5 objects and breathe fresh air.'
              : 'বাইরে কিছুক্ষণ হাঁটুন এবং সতেজ বাতাস নিন।'}
          </p>
          <span className="text-[11px] text-emerald-400/80 mt-3 inline-block font-semibold">
            {language === 'en' ? 'Lowers Cortisol by 24%' : 'মানসিক চাপ ২৪% কমায়'}
          </span>
        </div>

        {/* 4. Ambient Tone */}
        <div
          onClick={() => setIsFocusModalOpen(true)}
          className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/30 hover:border-purple-400 transition-all cursor-pointer shadow-lg group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-base font-bold text-purple-200">
            {language === 'en' ? 'Relaxation Soundscape' : 'শান্ত সুর ও শব্দ'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'en'
              ? 'Binaural soothing tones designed to settle overthinking.'
              : 'অতিরিক্ত চিন্তা থামাতে সাহায্যকারী মেডিটেশন সাউন্ড।'}
          </p>
          <span className="text-[11px] font-bold text-purple-400 mt-3 inline-block">
            {language === 'en' ? 'Listen Now →' : 'প্লে করুন →'}
          </span>
        </div>
      </div>

      {/* Private Journal Section */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                {language === 'en' ? 'Private & Encrypted' : 'সম্পূর্ণ গোপন ও ব্যক্তিগত'}
              </span>
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              {language === 'en' ? 'Daily Feelings & Reflection Journal' : 'দৈনিক অনুভূতির ডায়েরি'}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {language === 'en'
                ? 'Writing down thoughts unloads cognitive burden and helps process triggers without guilt.'
                : 'নিজের ভাবনা ও অনুভূতি লিখে রাখলে মনের বোঝা হালকা হয়।'}
            </p>
          </div>
        </div>

        {/* Mood Logger Form */}
        <form onSubmit={handleJournalSubmit} className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              {language === 'en' ? 'How are you feeling right now?' : 'আজকে আপনি কেমন বোধ করছেন?'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {moods.map((m) => {
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMood(m.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                      isSelected
                        ? `bg-slate-800 ${m.color} shadow-md scale-105 ring-2 ring-purple-500/50`
                        : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-2xl mb-1">{m.icon}</span>
                    <span className="text-[11px]">{language === 'en' ? m.label : m.labelBn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {language === 'en' ? 'Notes & Thoughts (Private)' : 'আপনার চিন্তা ও নোট লিখুন (গোপনীয়)'}
            </label>
            <textarea
              required
              rows={3}
              id="journal-note-input"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'What was challenging today? What are you grateful for? What habit are you proud of?'
                  : 'আজকের কোন বিষয় নিয়ে আপনি ভাবছেন? কোন ভালো কাজটি সম্পন্ন করেছেন?'
              }
              className="w-full p-3 text-xs sm:text-sm bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 leading-relaxed"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              id="submit-journal-entry-btn"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'en' ? 'Save Entry' : 'এন্ট্রি সংরক্ষণ করুন'}</span>
            </button>
          </div>
        </form>

        {/* Previous Entries History */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {language === 'en' ? 'Recent Reflections' : 'পূর্ববর্তী জার্নাল নোট'}
          </h4>

          {journalEntries.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6">
              {language === 'en' ? 'No journal entries yet. Log your first reflection above!' : 'কোনো এন্ট্রি নেই। প্রথম নোট লিখুন!'}
            </p>
          ) : (
            <div className="space-y-2.5">
              {journalEntries.map((entry) => {
                const moodObj = moods.find((m) => m.id === entry.mood) || moods[1];
                return (
                  <div
                    key={entry.id}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{moodObj.icon}</span>
                        <span className="font-bold text-slate-200">
                          {language === 'en' ? moodObj.label : moodObj.labelBn}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {entry.date} • {entry.createdAt}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-7">
                      {entry.note}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
