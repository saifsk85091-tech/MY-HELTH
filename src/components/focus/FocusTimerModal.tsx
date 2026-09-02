import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

export const FocusTimerModal: React.FC = () => {
  const { isFocusModalOpen, setIsFocusModalOpen, language, triggerConfetti } = useApp();
  
  const [selectedDuration, setSelectedDuration] = useState<number>(25); // in minutes
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Set duration
  const setDuration = (mins: number) => {
    setSelectedDuration(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
    setIsCompleted(false);
  };

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setIsCompleted(true);
      triggerConfetti();
      stopAmbientSound();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Audio Ambient Synth
  const toggleAmbientSound = () => {
    if (!soundEnabled) {
      startAmbientSound();
      setSoundEnabled(true);
    } else {
      stopAmbientSound();
      setSoundEnabled(false);
    }
  };

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Soft binaural calming frequency (144Hz + gentle pink-like hum)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(136.1, ctx.currentTime); // Om/calming frequency
      gain.gain.setValueAtTime(0.04, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (e) {
      console.log('Audio init error', e);
    }
  };

  const stopAmbientSound = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setIsRunning(false);
    stopAmbientSound();
    setSoundEnabled(false);
    setIsFocusModalOpen(false);
  };

  if (!isFocusModalOpen) return null;

  const totalSeconds = selectedDuration * 60;
  const progressPct = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative text-center">
        {/* Close */}
        <button
          onClick={handleClose}
          id="close-focus-timer-modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-2 rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Deep Work & Dopamine Reset' : 'ডিপ ফোকাস মোড'}</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-100">
            {language === 'en' ? 'Focus Session' : 'ফোকাস টাইমার'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'en'
              ? 'Put mobile away. Focus uninterrupted on your goals.'
              : 'মোবাইল দূরে রাখুন এবং পুরোপুরি কাজে মনোনিবেশ করুন।'}
          </p>
        </div>

        {/* Preset Selectors */}
        <div className="flex justify-center gap-2 mb-6">
          {[25, 45, 60].map((mins) => (
            <button
              key={mins}
              type="button"
              id={`focus-preset-${mins}`}
              onClick={() => setDuration(mins)}
              disabled={isRunning}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDuration === mins
                  ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/25 scale-105'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {mins} {language === 'en' ? 'Mins' : 'মিনিট'}
            </button>
          ))}
        </div>

        {/* Circular Countdown Display */}
        <div className="relative w-56 h-56 mx-auto mb-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-slate-800"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-indigo-400 transition-all duration-1000 ease-linear"
              strokeWidth="6"
              strokeDasharray={276.4}
              strokeDashoffset={276.4 - (276.4 * progressPct) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isCompleted ? (
              <div className="animate-fade-in text-emerald-400 flex flex-col items-center">
                <CheckCircle2 className="w-10 h-10 mb-1" />
                <span className="text-sm font-bold">
                  {language === 'en' ? 'Great Job!' : 'দারুণ কাজ!'}
                </span>
                <span className="text-[11px] text-slate-300">
                  {language === 'en' ? 'Take a short break.' : 'এবার ৫ মিনিট বিরতি নিন।'}
                </span>
              </div>
            ) : (
              <>
                <span className="text-4xl font-heading font-extrabold text-slate-100 tracking-tight">
                  {timeFormatted}
                </span>
                <span className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">
                  {isRunning ? (language === 'en' ? 'Focusing...' : 'চলছে...') : (language === 'en' ? 'Ready' : 'প্রস্তুত')}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Ambient Calm Sound toggle */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={toggleAmbientSound}
            id="ambient-sound-toggle"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              soundEnabled
                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{language === 'en' ? 'Calming Ambient Tone (136Hz)' : 'শান্ত সুর / অ্যাম্বিয়েন্ট সাউন্ড'}</span>
          </button>
        </div>

        {/* Control buttons */}
        <div className="flex justify-center items-center gap-3">
          <button
            type="button"
            id="reset-focus-timer-btn"
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(selectedDuration * 60);
              setIsCompleted(false);
              stopAmbientSound();
              setSoundEnabled(false);
            }}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            type="button"
            id="toggle-focus-timer-btn"
            onClick={() => {
              setIsRunning(!isRunning);
              if (isCompleted) {
                setIsCompleted(false);
                setTimeLeft(selectedDuration * 60);
              }
            }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all transform active:scale-95 cursor-pointer"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>{language === 'en' ? 'Pause' : 'বিরতি'}</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{language === 'en' ? 'Start Focus' : 'শুরু করুন'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
