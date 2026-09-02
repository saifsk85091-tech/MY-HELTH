import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  ShieldCheck,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  HelpCircle,
  Brain,
  Moon,
  Smartphone,
  Apple,
  Activity,
  HeartHandshake,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { HealthArticle } from '../../types';

export const HealthArticlesView: React.FC = () => {
  const { language, articles, setIsDisclaimerModalOpen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<HealthArticle | null>(null);

  const categories = [
    'All',
    'Sleep & Brain',
    'Screen & Dopamine',
    'Habit Science',
    'Nutrition',
    'Fitness',
    'Mental Health'
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const titleText = (language === 'en' ? article.title : article.titleBn).toLowerCase();
    const summaryText = (language === 'en' ? article.summary : article.summaryBn).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || titleText.includes(query) || summaryText.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-teal-950 border border-slate-800 p-5 sm:p-7 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Evidence-Based & Doctor Reviewed' : 'বিজ্ঞানসম্মত ও সঠিক স্বাস্থ্য তথ্য'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === 'en' ? 'Youth Health & Habit Science' : 'যুব স্বাস্থ্য ও জীবনধারা জ্ঞানকোষ'}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Accurate, non-judgmental guidance on dopamine reset, sleep quality, reducing compulsive screen usage, and building high-energy routines without myths or fear.'
                : 'ভুল ধারণা ও ভয় দূর করে সঠিক বিজ্ঞানভিত্তিক তথ্য: ডোপামিন নিয়ন্ত্রণ, গভীর ঘুম, স্ক্রিন অ্যাডিকশন থেকে মুক্তি এবং সুস্থ জীবনধারা।'}
            </p>
          </div>

          <button
            onClick={() => setIsDisclaimerModalOpen(true)}
            id="open-disclaimer-guide-btn"
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow-md transition-all whitespace-nowrap"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>{language === 'en' ? 'Medical Disclaimer' : 'মেডিকেল পরামর্শ বার্তা'}</span>
          </button>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            id="article-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'en' ? 'Search topics, dopamine, sleep, habit loops...' : 'টপিক বা স্বাস্থ্য তথ্য সার্চ করুন...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: List or Modal Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((article) => {
          const title = language === 'en' ? article.title : article.titleBn;
          const summary = language === 'en' ? article.summary : article.summaryBn;

          return (
            <div
              key={article.id}
              id={`article-card-${article.id}`}
              onClick={() => setActiveArticle(article)}
              className="bg-slate-900/90 border border-slate-800/90 hover:border-emerald-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/60 text-emerald-400">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-100 group-hover:text-emerald-400 transition-colors leading-snug">
                  {title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
                <span className="flex items-center gap-1 font-medium text-emerald-400">
                  {language === 'en' ? 'Read Guide' : 'সম্পূর্ণ পড়ুন'}
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === 'en' ? 'Doctor Reviewed' : 'মেডিকেল পর্যালোচনা'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            id="article-detail-modal"
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/50">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {activeArticle.category}
                </span>
                <h2 className="text-xl font-heading font-bold text-white mt-2 leading-snug">
                  {language === 'en' ? activeArticle.title : activeArticle.titleBn}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activeArticle.readTime}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">
                    {language === 'en' ? 'Evidence-Based' : 'বিজ্ঞানসম্মত নির্দেশিকা'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                id="close-article-modal-btn"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200 text-xs italic">
                {language === 'en' ? activeArticle.summary : activeArticle.summaryBn}
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 space-y-3 whitespace-pre-line text-sm leading-relaxed">
                {language === 'en' ? activeArticle.content : activeArticle.contentBn}
              </div>

              {activeArticle.isDoctorAdviceDisclaimer && (
                <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{language === 'en' ? 'Important Medical Clarification' : 'জরুরি স্বাস্থ্য তথ্য'}</span>
                  </div>
                  <p className="text-slate-300">
                    {language === 'en'
                      ? 'This content provides educational lifestyle and habit guidance. If you experience persistent anxiety, depression, or physical symptoms, please consult a registered medical doctor or certified counselor.'
                      : 'এই তথ্যগুলো শুধুমাত্র স্বাস্থ্য সচেতনতা ও সুঅভ্যাস তৈরির জন্য। জটিল কোনো মানসিক বা শারীরিক লক্ষণ থাকলে অবশ্যই রেজিস্টার্ড চিকিৎসকের পরামর্শ নিন।'}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                id="modal-article-done-btn"
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
              >
                {language === 'en' ? 'Close Guide' : 'বন্ধ করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
