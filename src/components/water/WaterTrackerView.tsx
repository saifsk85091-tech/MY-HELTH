import React from 'react';
import { useApp } from '../../context/AppContext';
import { Droplets, Plus, Minus, RotateCcw, Sparkles, CheckCircle2, Heart } from 'lucide-react';

export const WaterTrackerView: React.FC = () => {
  const {
    waterGlasses,
    waterGoal,
    addWaterGlass,
    removeWaterGlass,
    setCustomWaterGoal,
    language,
    triggerConfetti,
  } = useApp();

  const percentage = Math.min(100, Math.round((waterGlasses / (waterGoal || 8)) * 100));
  const isGoalReached = waterGlasses >= waterGoal;

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              {language === 'en' ? 'Hydration & Energy' : 'পানিশূন্যতা দূরীকরণ'}
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-100 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-cyan-400 fill-cyan-400/30" />
            {language === 'en' ? 'Daily Water Tracker' : 'দৈনিক পানি পান ট্র্যাকার'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {language === 'en'
              ? 'Adequate water intake prevents daytime fatigue, curbs sugar cravings, and aids focus.'
              : 'পর্যাপ্ত পানি পান মাথাব্যথা দূর করে, ক্লান্তি কমায় এবং ত্বক ও হজম ভালো রাখে।'}
          </p>
        </div>

        {/* Goal Selector */}
        <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-700/60 self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-semibold pl-1">
            {language === 'en' ? 'Goal:' : 'লক্ষ্য:'}
          </span>
          {[6, 8, 10, 12].map((g) => (
            <button
              key={g}
              type="button"
              id={`water-goal-${g}`}
              onClick={() => setCustomWaterGoal(g)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                waterGoal === g
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {g}
            </button>
          ))}
          <span className="text-[11px] text-slate-500 pr-1">{language === 'en' ? 'Glasses' : 'গ্লাস'}</span>
        </div>
      </div>

      {/* Main Glass Visual & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Visual Glass Container */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-900/70 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="relative w-28 h-40 border-4 border-cyan-400/40 rounded-b-3xl rounded-t-lg overflow-hidden bg-slate-950/60 shadow-inner flex flex-col justify-end">
            {/* Water Fill Animated level */}
            <div
              className="bg-gradient-to-t from-cyan-600 via-cyan-400 to-teal-300 w-full transition-all duration-500 ease-out relative"
              style={{ height: `${percentage}%` }}
            >
              {/* Waves effect */}
              <div className="absolute -top-2 left-0 right-0 h-4 bg-white/20 rounded-full blur-xs animate-pulse"></div>
            </div>

            {/* Glass Markers */}
            <div className="absolute inset-0 flex flex-col justify-between py-3 px-2 pointer-events-none opacity-30 text-[9px] text-cyan-200 font-mono">
              <div className="border-b border-dashed border-cyan-300/50 pb-0.5">100%</div>
              <div className="border-b border-dashed border-cyan-300/50 pb-0.5">75%</div>
              <div className="border-b border-dashed border-cyan-300/50 pb-0.5">50%</div>
              <div className="border-b border-dashed border-cyan-300/50 pb-0.5">25%</div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="font-heading text-3xl font-extrabold text-cyan-300">
              {percentage}%
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              {waterGlasses * 250} ml / {waterGoal * 250} ml
            </span>
          </div>
        </div>

        {/* Center Control Panel */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                {language === 'en' ? 'Today Logged' : 'আজকের পানকৃত পানি'}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-100">
                  {waterGlasses}
                </span>
                <span className="text-sm font-semibold text-slate-400">
                  / {waterGoal} {language === 'en' ? 'Glasses (250ml each)' : 'গ্লাস (প্রতিটি ২৫০ মিলি)'}
                </span>
              </div>
            </div>

            {isGoalReached && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'en' ? 'Goal Met!' : 'লক্ষ্য অর্জিত!'}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              id="add-water-glass-btn"
              onClick={addWaterGlass}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>{language === 'en' ? '+ Add 1 Glass (250ml)' : '+ ১ গ্লাস পানি যোগ করুন'}</span>
            </button>

            <button
              type="button"
              id="remove-water-glass-btn"
              onClick={removeWaterGlass}
              disabled={waterGlasses === 0}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Remove 1 Glass"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Visual Glass Row */}
          <div className="flex flex-wrap gap-2 pt-2">
            {Array.from({ length: waterGoal }).map((_, idx) => {
              const isFilled = idx < waterGlasses;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (idx < waterGlasses) removeWaterGlass();
                    else addWaterGlass();
                  }}
                  className={`flex-1 min-w-[32px] h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                    isFilled
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105'
                      : 'bg-slate-800 text-slate-600 border border-slate-700/60 hover:bg-slate-700'
                  }`}
                  title={`Glass ${idx + 1}`}
                >
                  <Droplets className="w-4 h-4 fill-current" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
