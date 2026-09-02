import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Utensils,
  CheckCircle2,
  Circle,
  Apple,
  Salad,
  Coffee,
  Moon,
  Info,
  Sparkles,
} from 'lucide-react';

export const NutritionView: React.FC = () => {
  const { foodSuggestions, foodLogs, toggleMealLogged, language, triggerConfetti } = useApp();

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'Breakfast':
        return <Apple className="w-5 h-5 text-amber-400" />;
      case 'Lunch':
        return <Salad className="w-5 h-5 text-emerald-400" />;
      case 'Evening Snacks':
        return <Coffee className="w-5 h-5 text-cyan-400" />;
      case 'Dinner':
        return <Moon className="w-5 h-5 text-indigo-400" />;
      default:
        return <Utensils className="w-5 h-5 text-slate-400" />;
    }
  };

  const completedMealsCount = Object.values(foodLogs).filter(Boolean).length;

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {language === 'en' ? 'Daily Food Planner' : 'দৈনিক খাদ্য পরিকল্পনা'}
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-100 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-400" />
            {language === 'en' ? 'Healthy Nutrition & Meal Guide' : 'সুষম পুষ্টি ও খাবার তালিকা'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {language === 'en'
              ? 'Clean, balanced meals stabilize blood sugar, boost cognitive focus, and provide sustained energy.'
              : 'সুষম ও পুষ্টিকর খাবার মস্তিষ্কের কর্মক্ষমতা ঠিক রাখে এবং সারাদিন প্রাণবন্ত রাখে।'}
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-300 self-start sm:self-auto">
          <span>
            {language === 'en' ? 'Healthy Meals Logged:' : 'আজকের স্বাস্থ্যকর খাবার:'}{' '}
            <strong className="text-emerald-400 font-bold">{completedMealsCount} / 4</strong>
          </span>
        </div>
      </div>

      {/* Medical Transparency Note */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 flex items-start gap-2.5 leading-relaxed">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          {language === 'en'
            ? 'General wellness recommendations only. Not intended as medical disease treatments or dietary prescriptions. Consult a licensed clinical nutritionist or doctor for personalized clinical needs.'
            : 'এখানে প্রদত্ত খাবার তালিকা সাধারণ স্বাস্থ্য সুরক্ষার জন্য প্রস্তাবিত। এটি কোনো রোগ নিরাময়ের প্রেসক্রিপশন নয়। বিশেষ স্বাস্থ্য সমস্যায় পুষ্টিবিদের পরামর্শ নিন।'}
        </span>
      </div>

      {/* Meal Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {foodSuggestions.map((meal) => {
          const isLogged = !!foodLogs[meal.mealType];
          return (
            <div
              key={meal.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isLogged
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                      {getMealIcon(meal.mealType)}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                        {language === 'en' ? meal.mealType : meal.mealTypeBn}
                      </span>
                      <h4 className="text-sm font-bold text-slate-100">
                        {language === 'en' ? meal.name : meal.nameBn}
                      </h4>
                    </div>
                  </div>

                  <button
                    type="button"
                    id={`meal-log-toggle-${meal.id}`}
                    onClick={() => {
                      toggleMealLogged(meal.mealType);
                      if (!isLogged) triggerConfetti();
                    }}
                    className={`p-2 rounded-xl transition-colors ${
                      isLogged
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-500 hover:text-slate-200 border border-slate-700'
                    }`}
                    title="Toggle Meal Status"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Items tags */}
                <div className="mb-3">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                    {language === 'en' ? 'Recommended Healthy Items:' : 'প্রস্তাবিত পুষ্টিকর উপাদান:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'en' ? meal.items : meal.itemsBn).map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefit & Tip */}
                <div className="space-y-2 text-[11px] text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-700/40 mb-4">
                  <p>
                    <strong className="text-emerald-400">{language === 'en' ? 'Benefit:' : 'উপকারিতা:'}</strong>{' '}
                    {language === 'en' ? meal.nutritionalBenefits : meal.nutritionalBenefitsBn}
                  </p>
                  <p className="text-slate-400">
                    <strong className="text-slate-300">{language === 'en' ? 'Tip:' : 'পরামর্শ:'}</strong>{' '}
                    {language === 'en' ? meal.preparationTip : meal.preparationTipBn}
                  </p>
                </div>
              </div>

              {/* Status Action */}
              <button
                type="button"
                onClick={() => {
                  toggleMealLogged(meal.mealType);
                  if (!isLogged) triggerConfetti();
                }}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  isLogged
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {isLogged ? (
                  language === 'en' ? '✓ Logged as Healthy Meal' : '✓ স্বাস্থ্যকর খাবার গ্রহণ সম্পন্ন'
                ) : (
                  language === 'en' ? 'Mark Eaten Today' : 'আজ গ্রহণ করেছি হিসেবে চিহ্নিত করুন'
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
