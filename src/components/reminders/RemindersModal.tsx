import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, BellOff, Clock, Check, Sparkles } from 'lucide-react';

export const RemindersModal: React.FC = () => {
  const { isRemindersModalOpen, setIsRemindersModalOpen, reminders, toggleReminder, language } = useApp();

  if (!isRemindersModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-left">
        {/* Close */}
        <button
          onClick={() => setIsRemindersModalOpen(false)}
          id="close-reminders-modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-2 rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-100">
              {language === 'en' ? 'Smart Habit Reminders' : 'অভ্যাস রিমাইন্ডার ও নোটিফিকেশন'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'Stay on track with gentle notifications' : 'সময়মতো কাজ করার নোটিফিকেশন সেট করুন'}
            </p>
          </div>
        </div>

        {/* Reminders List */}
        <div className="space-y-2.5 mb-6">
          {reminders.map((rem) => {
            const isEnabled = rem.enabled;
            return (
              <div
                key={rem.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isEnabled
                    ? 'bg-slate-800/80 border-slate-700/80 text-slate-100'
                    : 'bg-slate-900/50 border-slate-800/60 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isEnabled ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-600'}`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold">
                      {language === 'en' ? rem.label : rem.labelBn}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {rem.time}
                    </span>
                  </div>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  id={`reminder-toggle-${rem.id}`}
                  onClick={() => toggleReminder(rem.id)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    isEnabled ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform"></div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Info box */}
        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40 text-[11px] text-slate-400 flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {language === 'en'
              ? 'Push notification integration ready for Firebase Cloud Messaging (FCM) on production hosting.'
              : 'পুশ নোটিফিকেশন সিস্টেম ফায়ারবেস বা লোকাল ব্রাউজার সার্ভিসের সাথে ইন্টিগ্রেট করার জন্য প্রস্তুত।'}
          </span>
        </div>

        {/* Done button */}
        <button
          type="button"
          onClick={() => setIsRemindersModalOpen(false)}
          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-colors"
        >
          {language === 'en' ? 'Save & Close' : 'সংরক্ষণ করুন'}
        </button>
      </div>
    </div>
  );
};
