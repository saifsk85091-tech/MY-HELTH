import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, CheckCircle2, HeartHandshake, Stethoscope, AlertTriangle, Sparkles } from 'lucide-react';

export const HealthDisclaimerModal: React.FC = () => {
  const { isDisclaimerModalOpen, setIsDisclaimerModalOpen, language } = useApp();

  if (!isDisclaimerModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left">
        {/* Close */}
        <button
          onClick={() => setIsDisclaimerModalOpen(false)}
          id="close-disclaimer-modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-2 rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-100">
              {language === 'en' ? 'Evidence-Based Wellness & Health Notice' : 'বিজ্ঞানভিত্তিক স্বাস্থ্য তথ্য ও নীতিমালা'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'YouthFit Medical & Safety Transparency' : 'ইউথফিট নির্ভরযোগ্য জীবনধারা গাইডলাইন'}
            </p>
          </div>
        </div>

        {/* Main Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm leading-relaxed mb-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-200 font-bold mb-1">
              {language === 'en' ? 'Important Medical Notice:' : 'জরুরি চিকিৎসা সংক্রান্ত নোটিশ:'}
            </strong>
            {language === 'en' ? (
              <span>
                "This app provides general lifestyle, fitness, routine, and wellness guidance. It <strong>does not replace professional medical diagnosis, treatment, or psychiatric advice</strong>. If you experience serious physical symptoms or severe mental health distress, <strong>please consult a qualified doctor, urologist, physician, or licensed mental health professional.</strong>"
              </span>
            ) : (
              <span>
                "এই অ্যাপ্লিকেশনটি শুধুমাত্র স্বাস্থ্যকর জীবনধারা, রুটিন এবং দৈনন্দিন অভ্যাস গঠনের জন্য সাধারণ দিকনির্দেশনা প্রদান করে। এটি <strong>কোনোভাবেই চিকিৎসকের পরামর্শ বা প্রেসক্রিপশনের বিকল্প নয়</strong>। শরীরের কোনো জটিল সমস্যা বা তীব্র মানসিক চাপ অনুভব করলে <strong>অবশ্যই একজন বিশেষজ্ঞ ডাক্তার বা মানসিক স্বাস্থ্য পেশাদারের পরামর্শ নিন।</strong>"
              </span>
            )}
          </div>
        </div>

        {/* Evidence-Based Principles */}
        <div className="space-y-3 mb-6 text-xs text-slate-300">
          <h4 className="text-sm font-heading font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {language === 'en' ? 'Our Evidence-Based Core Commitments' : 'আমাদের বৈজ্ঞানিক নীতিমালা'}
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              <span>
                <strong>{language === 'en' ? 'No Fear-Mongering or Biological Myths:' : 'ভয় বা ভুল তথ্য বর্জন:'}</strong>{' '}
                {language === 'en'
                  ? 'We do not propagate harmful unscientific myths regarding natural body biology. We promote honest, non-judgmental habit balance and dopamine regulation.'
                  : 'আমরা শরীরের স্বাভাবিক বিষয় নিয়ে কোনো অবৈজ্ঞানিক ভয় বা কুসংস্কার ছড়াই না। অপরাধবোধ নয়, বরং আত্মউন্নয়ন ও সুশৃঙ্খল রুটিন গড়ে তোলাই আমাদের লক্ষ্য।'}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">2.</span>
              <span>
                <strong>{language === 'en' ? 'Digital & Habit Science:' : 'ডিজিটাল ব্যালেন্স ও ডোপামিন:'}</strong>{' '}
                {language === 'en'
                  ? 'Late-night blue light, chronic sleep deprivation, and endless hyper-stimulating media disrupt mental clarity. We emphasize healthy sleep cycles, hydration, strength workouts, and mindful breathing.'
                  : 'দেরী রাতে ফোনের অতিরিক্ত স্ক্রিন টাইম ও অপচয় কমানো এবং তার বদলে খেলাধুলা, বই পড়া ও সঠিক ঘুমের বিজ্ঞানসম্মত অভ্যাস গড়ে তোলা।'}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">3.</span>
              <span>
                <strong>{language === 'en' ? 'General Nutrition, Not Medical Cures:' : 'সুষম খাদ্য, রোগ নিরাময় দাবি নয়:'}</strong>{' '}
                {language === 'en'
                  ? 'Food suggestions are balanced nutrient-dense whole foods designed for healthy energy, not treatments for diseases.'
                  : 'এখানে উল্লেখিত খাবারগুলো সাধারণ সুস্বাস্থ্যের জন্য প্রস্তাবিত পুষ্টিকর খাদ্যতালিকা।'}
              </span>
            </div>
          </div>
        </div>

        {/* Helplines / Support Resources */}
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs">
          <div className="flex items-center gap-2 font-bold text-indigo-300 mb-1.5">
            <HeartHandshake className="w-4 h-4" />
            <span>{language === 'en' ? 'Emergency & Mental Health Support' : 'জরুরি মানসিক সহায়তা ও হেল্পলাইন'}</span>
          </div>
          <p className="text-indigo-200/90 leading-relaxed">
            {language === 'en'
              ? 'If you ever feel overwhelmed by anxiety, depression, or distress, remember that seeking professional support is a strength. Reach out to local certified psychologists, youth counselors, or trusted medical clinics.'
              : 'যদি আপনি অতিরিক্ত মানসিক চাপ বা বিষণ্ণতায় ভোগেন, তবে সংকোচ না করে দ্রুত বিশেষজ্ঞ মানসিক স্বাস্থ্য পরামর্শকের সহায়তা নিন।'}
          </p>
        </div>

        {/* Action button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            id="acknowledge-disclaimer-btn"
            onClick={() => setIsDisclaimerModalOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            {language === 'en' ? 'I Understand & Agree' : 'আমি বুঝতে পেরেছি ও সম্মত'}
          </button>
        </div>
      </div>
    </div>
  );
};
