import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Pause, RotateCcw, Wind, Sparkles, Heart } from 'lucide-react';

type BreathPhase = 'inhale' | 'hold' | 'exhale';

export const BreathingExerciseModal: React.FC = () => {
  const { isBreathingModalOpen, setIsBreathingModalOpen, language } = useApp();
  
  const [isRunning, setIsRunning] = useState(true);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [secondsLeftInPhase, setSecondsLeftInPhase] = useState(4);
  const [cycleCount, setCycleCount] = useState(1);

  // Inhale: 4s, Hold: 4s, Exhale: 6s
  useEffect(() => {
    if (!isBreathingModalOpen || !isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeftInPhase((prev) => {
        if (prev <= 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 6;
          } else {
            setPhase('inhale');
            setCycleCount((c) => c + 1);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingModalOpen, isRunning, phase]);

  if (!isBreathingModalOpen) return null;

  const getPhaseDetails = () => {
    switch (phase) {
      case 'inhale':
        return {
          title: language === 'en' ? 'INHALE' : 'শ্বাস নিন (ইনহেল)',
          sub: language === 'en' ? 'Deeply through your nose...' : 'নাক দিয়ে ধীরে ধীরে গভীর শ্বাস নিন...',
          duration: 4,
          circleScale: 'scale-125 bg-teal-500/30 border-teal-400 text-teal-300',
          ringColor: 'border-teal-400/60 shadow-teal-500/30',
        };
      case 'hold':
        return {
          title: language === 'en' ? 'HOLD' : 'ধরে রাখুন (হোল্ড)',
          sub: language === 'en' ? 'Keep calm and hold steady...' : 'শান্ত থেকে শ্বাস আটকে রাখুন...',
          duration: 4,
          circleScale: 'scale-125 bg-amber-500/30 border-amber-400 text-amber-300',
          ringColor: 'border-amber-400/60 shadow-amber-500/30',
        };
      case 'exhale':
        return {
          title: language === 'en' ? 'EXHALE' : 'শ্বাস ছাড়ুন (এক্সহেল)',
          sub: language === 'en' ? 'Slowly through mouth, release tension...' : 'মুখ দিয়ে ধীরে ধীরে সমস্ত চাপ ছেড়ে দিন...',
          duration: 6,
          circleScale: 'scale-90 bg-indigo-500/20 border-indigo-400 text-indigo-300',
          ringColor: 'border-indigo-400/60 shadow-indigo-500/30',
        };
    }
  };

  const details = getPhaseDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative text-center overflow-hidden">
        {/* Close */}
        <button
          onClick={() => setIsBreathingModalOpen(false)}
          id="close-breathing-modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-2 rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-2">
            <Wind className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Vagus Nerve Activation' : '৪-৪-৬ শ্বাস-প্রশ্বাস পদ্ধতি'}</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-100">
            {language === 'en' ? '4-4-6 Relaxing Breath' : 'মানসিক প্রশান্তি ও শ্বাস নিয়ন্ত্রণ'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {language === 'en'
              ? 'Slow 6-second exhalation instantly lowers heart rate and dissolves anxiety & urges.'
              : 'দীর্ঘ ৬ সেকেন্ডের শ্বাস ত্যাগ মস্তিষ্কের অস্থিরতা ও অতিরিক্ত চাপ দ্রুত দূর করে।'}
          </p>
        </div>

        {/* Dynamic Breathing Visualizer Circle */}
        <div className="py-8 flex items-center justify-center">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer pulsating aura */}
            <div
              className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ease-in-out shadow-2xl ${details.ringColor} ${
                phase === 'inhale' ? 'scale-110 opacity-70' : phase === 'hold' ? 'scale-110 opacity-100' : 'scale-95 opacity-30'
              }`}
            ></div>

            {/* Inner Core Circle */}
            <div
              className={`w-48 h-48 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out backdrop-blur-sm ${details.circleScale}`}
            >
              <span className="text-2xl font-heading font-extrabold tracking-wider">
                {details.title}
              </span>
              <span className="text-4xl font-extrabold font-heading mt-1">
                {secondsLeftInPhase}s
              </span>
              <span className="text-[11px] font-medium opacity-80 mt-1">
                {phase === 'inhale' ? '4s' : phase === 'hold' ? '4s' : '6s'}
              </span>
            </div>
          </div>
        </div>

        {/* Phase subtitle */}
        <p className="text-xs font-medium text-slate-300 mb-6 h-5 animate-pulse">
          {details.sub}
        </p>

        {/* Cycle Count */}
        <div className="flex justify-center items-center gap-4 text-xs text-slate-400 mb-6">
          <span>
            {language === 'en' ? 'Cycle Completed:' : 'সম্পন্ন সাইকেল:'}{' '}
            <strong className="text-emerald-400">{cycleCount}</strong>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-rose-400">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            {language === 'en' ? 'Heart Rate Calming' : 'হৃদস্পন্দন স্বাভাবিক হচ্ছে'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setPhase('inhale');
              setSecondsLeftInPhase(4);
              setCycleCount(1);
            }}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 transition-all active:scale-95 cursor-pointer"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>{language === 'en' ? 'Pause' : 'বিরতি'}</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{language === 'en' ? 'Resume' : 'চালু রাখুন'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
