import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  PlusCircle,
  Trash2,
  BookOpen,
  Sparkles,
  Dumbbell,
  Users,
  CheckCircle2,
  Shield,
  FileCode2,
  Edit2
} from 'lucide-react';
import { MotivationQuote, HealthArticle, ExerciseItem } from '../../types';

export const AdminPanelView: React.FC = () => {
  const {
    language,
    quotes,
    articles,
    exercises,
    addQuote,
    deleteQuote,
    addArticle,
    deleteArticle,
    addExercise,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState<'quotes' | 'articles' | 'exercises' | 'system'>('quotes');

  // New Quote Form State
  const [newQuote, setNewQuote] = useState({
    quote: '',
    quoteBn: '',
    author: '',
    category: 'discipline' as const,
  });

  // New Article Form State
  const [newArticle, setNewArticle] = useState({
    title: '',
    titleBn: '',
    category: 'Sleep & Brain' as const,
    readTime: '3 min read',
    summary: '',
    summaryBn: '',
    content: '',
    contentBn: '',
    isDoctorAdviceDisclaimer: true,
  });

  const handleAddQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.quote || !newQuote.author) return;
    const item: MotivationQuote = {
      id: `q-${Date.now()}`,
      quote: newQuote.quote,
      quoteBn: newQuote.quoteBn || newQuote.quote,
      author: newQuote.author,
      category: newQuote.category,
    };
    addQuote(item);
    setNewQuote({ quote: '', quoteBn: '', author: '', category: 'discipline' });
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.content) return;
    const item: HealthArticle = {
      id: `art-${Date.now()}`,
      title: newArticle.title,
      titleBn: newArticle.titleBn || newArticle.title,
      category: newArticle.category,
      readTime: newArticle.readTime,
      summary: newArticle.summary,
      summaryBn: newArticle.summaryBn || newArticle.summary,
      content: newArticle.content,
      contentBn: newArticle.contentBn || newArticle.content,
      isDoctorAdviceDisclaimer: newArticle.isDoctorAdviceDisclaimer,
    };
    addArticle(item);
    setNewArticle({
      title: '',
      titleBn: '',
      category: 'Sleep & Brain',
      readTime: '3 min read',
      summary: '',
      summaryBn: '',
      content: '',
      contentBn: '',
      isDoctorAdviceDisclaimer: true,
    });
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Admin Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 border border-slate-700/80 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>YouthFit Content Manager (PHP/MySQL)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1.5">
            {language === 'en' ? 'Admin Dashboard & Content Control' : 'অ্যাডমিন ড্যাশবোর্ড ও কন্টেন্ট প্যানেল'}
          </h1>
          <p className="text-xs text-slate-300">
            {language === 'en'
              ? 'Manage educational health guides, daily motivational quotes, and exercise catalogs.'
              : 'মোটিভেশনাল উক্তি, স্বাস্থ্য নির্দেশিকা ও ব্যায়াম কন্টেন্ট ম্যানেজ করুন।'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
            Logged as: <strong className="text-cyan-400">{user?.role === 'admin' ? 'Admin' : 'SuperUser'}</strong>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('quotes')}
          id="tab-quotes"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'quotes'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Quotes' : 'উক্তি'} ({quotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          id="tab-articles"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'articles'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Health Articles' : 'স্বাস্থ্য আর্টিকেল'} ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('exercises')}
          id="tab-exercises"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'exercises'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Exercises' : 'ব্যায়াম'} ({exercises.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          id="tab-system"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'system'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'PHP Endpoints & DB' : 'পিএইচপি ব্যাকএন্ড'}</span>
        </button>
      </div>

      {/* Tab: Quotes */}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          {/* Add Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? 'Add New Motivational Quote' : 'নতুন মোটিভেশনাল উক্তি যোগ করুন'}</span>
            </h3>
            <form onSubmit={handleAddQuote} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Quote (English)</label>
                <input
                  type="text"
                  id="input-quote-en"
                  placeholder="Small daily habits compound into massive lifelong strength."
                  value={newQuote.quote}
                  onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Quote (Bangla)</label>
                <input
                  type="text"
                  id="input-quote-bn"
                  placeholder="প্রতিদিনের ছোট ছোট ভালো অভ্যাস একদিন বিশাল শক্তিতে পরিণত হয়।"
                  value={newQuote.quoteBn}
                  onChange={(e) => setNewQuote({ ...newQuote, quoteBn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Author / Source</label>
                <input
                  type="text"
                  id="input-quote-author"
                  placeholder="James Clear / YouthFit Team"
                  value={newQuote.author}
                  onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Category</label>
                <select
                  value={newQuote.category}
                  id="select-quote-category"
                  onChange={(e) => setNewQuote({ ...newQuote, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                >
                  <option value="discipline">Discipline</option>
                  <option value="mindset">Mindset</option>
                  <option value="health">Health</option>
                  <option value="growth">Growth</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  id="submit-new-quote-btn"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                >
                  {language === 'en' ? 'Add Quote' : 'উক্তি যোগ করুন'}
                </button>
              </div>
            </form>
          </div>

          {/* List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {q.category}
                  </span>
                  <p className="text-xs text-slate-200 italic mt-1.5">"{q.quote}"</p>
                  <p className="text-[11px] text-slate-400 italic">"{q.quoteBn}"</p>
                  <p className="text-[11px] text-slate-500 font-semibold">— {q.author}</p>
                </div>
                <button
                  onClick={() => deleteQuote(q.id)}
                  id={`delete-quote-${q.id}`}
                  className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Delete Quote"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Articles */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          {/* Add Article Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? 'Publish Evidence-Based Health Guide' : 'নতুন বিজ্ঞানসম্মত আর্টিকেল প্রকাশ করুন'}</span>
            </h3>
            <form onSubmit={handleAddArticle} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Title (English)</label>
                  <input
                    type="text"
                    id="input-article-title-en"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                    placeholder="Dopamine Reset & Mental Clarity Guide"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Title (Bangla)</label>
                  <input
                    type="text"
                    id="input-article-title-bn"
                    value={newArticle.titleBn}
                    onChange={(e) => setNewArticle({ ...newArticle, titleBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                    placeholder="ডোপামিন নিয়ন্ত্রণ ও মানসিক সতেজতা"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Category</label>
                  <select
                    value={newArticle.category}
                    id="select-article-cat"
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Sleep & Brain">Sleep & Brain</option>
                    <option value="Screen & Dopamine">Screen & Dopamine</option>
                    <option value="Habit Science">Habit Science</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Mental Health">Mental Health</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Read Time</label>
                  <input
                    type="text"
                    id="input-article-readtime"
                    value={newArticle.readTime}
                    onChange={(e) => setNewArticle({ ...newArticle, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                    placeholder="3 min read"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Summary (English)</label>
                <input
                  type="text"
                  id="input-article-summary-en"
                  value={newArticle.summary}
                  onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  placeholder="Key takeaway..."
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Content (English & Markdown)</label>
                <textarea
                  rows={4}
                  id="input-article-content-en"
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  placeholder="Detailed scientific explanation..."
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  id="submit-new-article-btn"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                >
                  {language === 'en' ? 'Publish Guide' : 'আর্টিকেল প্রকাশ করুন'}
                </button>
              </div>
            </form>
          </div>

          {/* Articles list */}
          <div className="space-y-3">
            {articles.map((art) => (
              <div
                key={art.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {art.category}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-slate-200 mt-1">
                    {language === 'en' ? art.title : art.titleBn}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{art.summary}</p>
                </div>
                <button
                  onClick={() => deleteArticle(art.id)}
                  id={`delete-article-${art.id}`}
                  className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Exercises */}
      {activeTab === 'exercises' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="font-heading font-bold text-sm text-white mb-3">
              {language === 'en' ? 'Current Exercise Catalog' : 'বর্তমান ব্যায়াম তালিকা'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exercises.map((ex) => (
                <div key={ex.id} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">{ex.category}</span>
                    <span className="text-[10px] text-slate-400">{ex.duration}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-200 mt-1">{ex.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{ex.benefits}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: System & PHP Info */}
      {activeTab === 'system' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <FileCode2 className="w-5 h-5" />
            <h3 className="font-heading font-bold text-base text-white">
              {language === 'en' ? 'PHP Admin & REST API Connection' : 'পিএইচপি এপিআই ও ডেটাবেজ সংযোগ'}
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The PHP/MySQL backend is fully structured in the <code>/backend/</code> directory. You can import <code>database.sql</code> into phpMyAdmin on any cPanel host, upload the <code>backend</code> files to <code>public_html/api/</code>, and configure <code>config/db.php</code> with your database credentials.
          </p>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
            <div className="text-emerald-400 font-bold"># REST API Endpoints:</div>
            <div>POST /api/auth/register.php - User Registration</div>
            <div>POST /api/auth/login.php - JWT Authentication</div>
            <div>GET/POST /api/routines/index.php - Routine Management</div>
            <div>GET/POST /api/water/index.php - Hydration Logs</div>
            <div>GET/POST /api/habits/index.php - 7-Day Habit Matrix</div>
            <div>GET/POST /api/screentime/index.php - Screen Time & Curfew</div>
            <div>GET/POST /api/journal/index.php - Mood Journaling</div>
            <div>GET /api/health_score/index.php - 100-Point Score Calculation</div>
            <div>GET /api/articles/index.php - Doctor-Approved Health Articles</div>
          </div>
        </div>
      )}
    </div>
  );
};
