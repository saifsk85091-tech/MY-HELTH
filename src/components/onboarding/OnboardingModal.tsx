import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Moon,
  Sun,
  Smartphone,
  Dumbbell,
  Target,
  Check,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, completeOnboarding, language } = useApp();
  const [step, setStep] = useState(1);

  // Form states
  const [sleepTime, setSleepTime] = useState('11:00 PM');
  const [wakeTime, setWakeTime] = useState('06:30 AM');
  const [screenHours, setScreenHours] = useState(5);
  const [exercises, setExercises] = useState(true);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Better Sleep',
    'Reduce Screen Time',
    'Build Better Habits',
  ]);

  if (!isOnboardingOpen) return null;

  const goalOptions = [
    { id: 'Better Sleep', label: 'Better Sleep', labelBn: 'ভালো ও গভীর ঘুম', icon: '😴' },
    { id: 'Fitness', label: 'Fitness & Physical Health', labelBn: 'ফিটনেস ও শারীরিক গঠন', icon: '🏃' },
    { id: 'Healthy Eating', label: 'Healthy Eating & Nutrition', labelBn: 'স্বাস্থ্যকর খাদ্যাভ্যাস', icon: '🥗' },
    { id: 'Reduce Screen Time', label: 'Reduce Screen Time & Dopamine Detox', labelBn: 'স্ক্রিন টাইম কমানো', icon: '📱' },
    { id: 'Build Better Habits', label: 'Build Better Habits & Discipline', labelBn: 'নতুন ভালো অভ্যাস তৈরি', icon: '🎯' },
    { id: 'Stress Management', label: 'Stress & Anxiety Relief', labelBn: 'মানসিক চাপ ও উদ্বেগ কমানো', icon: '🧘' },
    { id: 'Improve Focus', label: 'Improve Focus & Productivity', labelBn: 'কাজে মনোযোগ বৃদ্ধি', icon: '⚡' },
  ];

  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(g => g !== id));
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      sleepTime,
      wakeTime,
      screenHours,
      exercises,
      primaryGoals: selectedGoals,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Step Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'en' ? 'Personalized Lifestyle Setup' : 'ব্যক্তিগত লাইফস্টাইল সেটআপ'}
            </span>
            <span>
              {language === 'en' ? `Step ${step} of 5` : `ধাপ ${step} / ৫`}
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Sleep Time */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-100">
                {language === 'en' ? 'What time do you usually go to sleep?' : 'আপনি সাধারণত কয়টায় ঘুমান?'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'en'
                  ? 'Consistent sleep schedules regulate circadian rhythm and brain neurotransmitters.'
                  : 'নিয়মিত ঘুমের সময় মস্তিষ্কের ভারসাম্য ও সারকাডিয়ান রিদম ঠিক রাখে।'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {['10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM', '12:00 AM', '01:00 AM'].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSleepTime(time)}
                  className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                    sleepTime === time
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Wake-Up Time */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-100">
                {language === 'en' ? 'What time do you wake up?' : 'কয়টায় ঘুম থেকে ওঠেন?'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'en'
                  ? 'Early morning sunlight activates cortisol for alert daytime energy and reduces anxiety.'
                  : 'সকালের প্রাকৃতিক আলো সারাদিন কাজ করার দারুণ শক্তি জোগায়।'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {['05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:30 AM'].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setWakeTime(time)}
                  className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                    wakeTime === time
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Screen Time Hours */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-100">
                {language === 'en' ? 'How many hours do you use your mobile daily?' : 'প্রতিদিন কত ঘণ্টা mobile ব্যবহার করেন?'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'en'
                  ? 'We will set an achievable awareness goal to help reclaim your focus.'
                  : 'আমরা আপনাকে বাস্তবসম্মত স্ক্রিন টাইম কমানোর লক্ষ্য ঠিক করতে সাহায্য করব।'}
              </p>
            </div>

            <div className="py-4 text-center">
              <div className="text-4xl font-heading font-extrabold text-cyan-400 mb-2">
                {screenHours} <span className="text-base text-slate-400 font-normal">{language === 'en' ? 'Hours / Day' : 'ঘণ্টা / দিন'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="0.5"
                value={screenHours}
                onChange={(e) => setScreenHours(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                <span>1 hr (Low)</span>
                <span>6 hrs (Average)</span>
                <span>12 hrs (Heavy)</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Exercise Activity */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-100">
                {language === 'en' ? 'Do you currently exercise or do physical workouts?' : 'Exercise করেন কি?'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'en'
                  ? 'Even 10-15 minutes of bodyweight movements or walking builds immense mental resilience.'
                  : 'প্রতিদিন অল্প কিছু ব্যায়াম বা হাঁটা মন ও শরীরকে ফিট রাখে।'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setExercises(true)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  exercises
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300'
                }`}
              >
                <div className="text-base font-bold mb-1">💪 {language === 'en' ? 'Yes, regularly / sometimes' : 'হ্যাঁ, নিয়মিত বা মাঝে মাঝে'}</div>
                <div className="text-xs text-slate-400">{language === 'en' ? 'Include workout routine' : 'ওয়ার্কআউট রুটিন যুক্ত করুন'}</div>
              </button>

              <button
                type="button"
                onClick={() => setExercises(false)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  !exercises
                    ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300'
                }`}
              >
                <div className="text-base font-bold mb-1">🚶 {language === 'en' ? 'Beginner / Walking' : 'নতুন / হালকা হাঁটা'}</div>
                <div className="text-xs text-slate-400">{language === 'en' ? 'Start with gentle steps' : 'হালকা স্ট্রেচিং দিয়ে শুরু'}</div>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Primary Goals */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-100">
                {language === 'en' ? 'What are your primary goals?' : 'আপনার প্রধান লক্ষ্য কী?'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'en' ? 'Select all that apply to personalize your dashboard.' : 'আপনার প্রয়োজন অনুযায়ী এক বা একাধিক অপশন বেছে নিন।'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {goalOptions.map((goal) => {
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleGoal(goal.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-base">{goal.icon}</span>
                    <span className="flex-1 truncate">
                      {language === 'en' ? goal.label : goal.labelBn}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Back' : 'পেছনে'}</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              <span>{language === 'en' ? 'Next' : 'পরবর্তী'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'en' ? 'Generate My Routine' : 'আমার রুটিন তৈরি করুন'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
