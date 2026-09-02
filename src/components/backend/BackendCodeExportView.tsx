import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Code2,
  Database,
  Server,
  Download,
  Copy,
  Check,
  FolderTree,
  FileCode,
  ShieldAlert,
  Play,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Smartphone,
  Github
} from 'lucide-react';

export const BackendCodeExportView: React.FC = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'sql' | 'architecture' | 'php-api' | 'cpanel-guide' | 'apk-guide' | 'tester'>('sql');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const sqlSchemaCode = `-- ========================================================
-- YouthFit - Healthy Habit & Lifestyle Management App
-- MySQL Database Schema (cPanel & phpMyAdmin Compatible)
-- Engine: InnoDB, Charset: utf8mb4_unicode_ci
-- ========================================================

CREATE DATABASE IF NOT EXISTS \`youthfit_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`youthfit_db\`;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`age\` INT NOT NULL,
  \`gender\` ENUM('male', 'female', 'other', 'prefer_not_to_say') DEFAULT 'prefer_not_to_say',
  \`role\` ENUM('user', 'admin') DEFAULT 'user',
  \`target_sleep_time\` VARCHAR(20) DEFAULT '11:00 PM',
  \`target_wake_time\` VARCHAR(20) DEFAULT '06:30 AM',
  \`daily_screen_time_goal_hours\` DECIMAL(3,1) DEFAULT 3.5,
  \`daily_water_goal_glasses\` INT DEFAULT 8,
  \`primary_goals\` TEXT DEFAULT NULL,
  \`onboarding_completed\` TINYINT(1) DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Daily Routines Table
CREATE TABLE IF NOT EXISTS \`daily_routines\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`period\` ENUM('morning', 'afternoon', 'evening', 'night') NOT NULL,
  \`time\` VARCHAR(20) NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`title_bn\` VARCHAR(255) DEFAULT NULL,
  \`description\` TEXT DEFAULT NULL,
  \`description_bn\` TEXT DEFAULT NULL,
  \`category\` VARCHAR(50) DEFAULT 'general',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Routine Daily Completion Logs
CREATE TABLE IF NOT EXISTS \`routine_logs\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`routine_id\` INT NOT NULL,
  \`user_id\` INT NOT NULL,
  \`log_date\` DATE NOT NULL,
  \`is_completed\` TINYINT(1) DEFAULT 0,
  \`completed_at\` TIMESTAMP NULL DEFAULT NULL,
  UNIQUE KEY \`user_routine_date\` (\`user_id\`, \`routine_id\`, \`log_date\`),
  FOREIGN KEY (\`routine_id\`) REFERENCES \`daily_routines\`(\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Habits Master Table
CREATE TABLE IF NOT EXISTS \`habits\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`name\` VARCHAR(150) NOT NULL,
  \`name_bn\` VARCHAR(150) DEFAULT NULL,
  \`category\` VARCHAR(50) DEFAULT 'General',
  \`icon\` VARCHAR(50) DEFAULT 'CheckCircle2',
  \`target_days_per_week\` INT DEFAULT 7,
  \`is_active\` TINYINT(1) DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Habit Daily Logs
CREATE TABLE IF NOT EXISTS \`habit_logs\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`habit_id\` INT NOT NULL,
  \`user_id\` INT NOT NULL,
  \`log_date\` DATE NOT NULL,
  \`is_completed\` TINYINT(1) DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY \`user_habit_date\` (\`user_id\`, \`habit_id\`, \`log_date\`),
  FOREIGN KEY (\`habit_id\`) REFERENCES \`habits\`(\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Water Tracker Logs Table
CREATE TABLE IF NOT EXISTS \`water_tracker\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`log_date\` DATE NOT NULL,
  \`glasses_drunk\` INT DEFAULT 0,
  \`goal_glasses\` INT DEFAULT 8,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY \`user_water_date\` (\`user_id\`, \`log_date\`),
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Screen Time Tracker Logs
CREATE TABLE IF NOT EXISTS \`screen_time_logs\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`log_date\` DATE NOT NULL,
  \`screen_hours\` DECIMAL(4,2) DEFAULT 0.00,
  \`goal_hours\` DECIMAL(4,2) DEFAULT 3.50,
  \`late_night_minutes\` INT DEFAULT 0,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY \`user_screen_date\` (\`user_id\`, \`log_date\`),
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Exercise Logs Table
CREATE TABLE IF NOT EXISTS \`exercise_logs\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`exercise_name\` VARCHAR(150) NOT NULL,
  \`category\` VARCHAR(50) NOT NULL,
  \`duration_minutes\` INT NOT NULL,
  \`log_date\` DATE NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Daily Food Logs Table
CREATE TABLE IF NOT EXISTS \`food_logs\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`meal_type\` ENUM('Breakfast', 'Lunch', 'Evening Snacks', 'Dinner') NOT NULL,
  \`log_date\` DATE NOT NULL,
  \`is_healthy\` TINYINT(1) DEFAULT 1,
  \`notes\` TEXT DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY \`user_meal_date\` (\`user_id\`, \`meal_type\`, \`log_date\`),
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Journal & Mood Entries Table
CREATE TABLE IF NOT EXISTS \`journal_entries\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`log_date\` DATE NOT NULL,
  \`mood\` ENUM('great', 'good', 'normal', 'stressed', 'down') NOT NULL,
  \`mood_score\` INT DEFAULT 3,
  \`note\` TEXT NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Daily 100-Point Health Scores Table
CREATE TABLE IF NOT EXISTS \`health_scores\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`score_date\` DATE NOT NULL,
  \`water_score\` INT DEFAULT 0,
  \`exercise_score\` INT DEFAULT 0,
  \`sleep_score\` INT DEFAULT 0,
  \`food_score\` INT DEFAULT 0,
  \`habit_score\` INT DEFAULT 0,
  \`total_score\` INT DEFAULT 0,
  \`calculated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY \`user_score_date\` (\`user_id\`, \`score_date\`),
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. Health Education Articles (Admin Managed)
CREATE TABLE IF NOT EXISTS \`health_articles\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`title_bn\` VARCHAR(255) DEFAULT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`read_time\` VARCHAR(50) DEFAULT '3 min read',
  \`summary\` TEXT NOT NULL,
  \`summary_bn\` TEXT DEFAULT NULL,
  \`content\` LONGTEXT NOT NULL,
  \`content_bn\` LONGTEXT DEFAULT NULL,
  \`is_doctor_reviewed\` TINYINT(1) DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. Motivation Quotes Table
CREATE TABLE IF NOT EXISTS \`motivation_quotes\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`quote\` TEXT NOT NULL,
  \`quote_bn\` TEXT DEFAULT NULL,
  \`author\` VARCHAR(100) NOT NULL,
  \`category\` VARCHAR(50) DEFAULT 'discipline',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. Seed Sample Admin User & Initial Quotes
INSERT INTO \`users\` (\`name\`, \`email\`, \`password_hash\`, \`age\`, \`gender\`, \`role\`)
VALUES ('Admin User', 'admin@youthfit.app', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 24, 'male', 'admin')
ON DUPLICATE KEY UPDATE \`name\` = \`name\`;

INSERT INTO \`motivation_quotes\` (\`quote\`, \`quote_bn\`, \`author\`, \`category\`)
VALUES 
('Small daily habits compound into massive lifelong strength.', 'প্রতিদিনের ছোট ছোট ভালো অভ্যাস একদিন বিশাল শক্তিতে পরিণত হয়।', 'James Clear', 'discipline'),
('Master your morning routine, conquer your entire day.', 'সকালকে জয় করুন, সারাদিন আপনার হবে।', 'Marcus Aurelius', 'mindset')
ON DUPLICATE KEY UPDATE \`author\` = \`author\`;
`;

  const architectureTree = `
YOUTHFIT FULL PROJECT ARCHITECTURE
==================================

youthfit-app/                  <-- Client Application (Web + React Native / Expo)
├── src/
│   ├── components/
│   │   ├── dashboard/         # DashboardView, HealthScoreCard, GreetingHeader
│   │   ├── routine/           # RoutineView, RoutinePeriodList, AddRoutineModal
│   │   ├── water/             # WaterTrackerView, HydrationWaveVisualizer
│   │   ├── habits/            # HabitTrackerView, 7DayMatrix, HabitStats
│   │   ├── exercise/          # ExerciseView, WorkoutPlayer, RepTimer
│   │   ├── nutrition/         # NutritionView, MealPlanner, HealthyRecipes
│   │   ├── screentime/        # ScreenTimeView, DigitalCurfewManager
│   │   ├── stress/            # StressHubView, 4-4-6 Breathwork, MoodJournal
│   │   ├── analytics/         # ProgressAnalyticsView, RechartsTrends, StreakBadges
│   │   ├── articles/          # HealthArticlesView, EvidenceBasedGuide
│   │   ├── profile/           # ProfileView, GoalSettings, BackupExport
│   │   └── admin/             # AdminPanelView, ContentManager
│   ├── context/               # AppContext.tsx (Global State & Local Persistence)
│   ├── data/                  # initialData.ts (Exercises, Quotes, Articles)
│   ├── services/              # apiService.ts (REST API Client for PHP Backend)
│   ├── types.ts               # Complete TypeScript Definitions
│   └── App.tsx                # Master Container & View Router
│
backend/                       <-- Production PHP Backend (cPanel Ready)
├── config/
│   ├── db.php                 # MySQL PDO Connection & CORS Config
│   └── jwt_helper.php         # Pure PHP JWT Generator & Token Validator
├── api/
│   ├── auth/
│   │   ├── register.php       # POST /api/auth/register.php (Password Hash)
│   │   ├── login.php          # POST /api/auth/login.php (JWT Auth)
│   │   └── profile.php        # GET/PUT /api/auth/profile.php
│   ├── routines/
│   │   └── index.php          # GET/POST/PUT/DELETE /api/routines/
│   ├── water/
│   │   └── index.php          # GET/POST /api/water/
│   ├── habits/
│   │   └── index.php          # GET/POST/DELETE /api/habits/ & toggle
│   ├── exercises/
│   │   └── index.php          # GET/POST /api/exercises/
│   ├── screentime/
│   │   └── index.php          # GET/POST /api/screentime/
│   ├── journal/
│   │   └── index.php          # GET/POST /api/journal/
│   ├── health_score/
│   │   └── index.php          # GET /api/health_score/ (100-pt algorithm)
│   └── articles/
│       └── index.php          # GET /api/articles/
├── admin/
│   └── index.php              # Lightweight PHP Admin Dashboard
├── .htaccess                  # Apache URL rewrite and CORS headers
├── database.sql               # Complete MySQL Database Schema
└── README.md                  # cPanel Hosting & phpMyAdmin Setup Guide
`;

  const phpDbConnectCode = `<?php
// ========================================================
// backend/config/db.php - YouthFit Database Connection
// ========================================================

// Prevent direct script execution without CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class Database {
    // Replace with your cPanel MySQL credentials
    private $host = "localhost";
    private $db_name = "youthfit_db";
    private $username = "youthfit_user";
    private $password = "YourSecurePasswordHere123!";
    private $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
        } catch(PDOException $exception) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Database Connection Failed: " . $exception->getMessage()
            ]);
            exit();
        }
        return $this->conn;
    }
}
`;

  const downloadSql = () => {
    const blob = new Blob([sqlSchemaCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'youthfit_database.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Server className="w-3.5 h-3.5" />
            <span>cPanel + PHP + MySQL Production Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {language === 'en' ? 'Backend Architecture & Database Setup' : 'ব্যাকএন্ড আর্কিটেকচার ও ডাটাবেজ সেটআপ'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Complete MySQL database tables, REST API controllers (PHP PDO), secure token authentication, and step-by-step cPanel hosting deployment instructions.'
              : 'সম্পূর্ণ মাইএসকিউএল ডাটাবেজ টেবিল, পিএইচপি রেস্ট এপিআই ও cPanel হোস্টিং সেটআপ নির্দেশিকা।'}
          </p>
        </div>

        <button
          onClick={downloadSql}
          id="download-sql-btn"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all self-start md:self-auto whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>{language === 'en' ? 'Download database.sql' : 'ডাটাবেজ ফাইল ডাউনলোড'}</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('sql')}
          id="tab-backend-sql"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'sql'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>MySQL Schema SQL</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          id="tab-backend-arch"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'architecture'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" />
          <span>Folder Structure</span>
        </button>

        <button
          onClick={() => setActiveTab('php-api')}
          id="tab-backend-php"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'php-api'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>PHP PDO & APIs</span>
        </button>

        <button
          onClick={() => setActiveTab('cpanel-guide')}
          id="tab-backend-cpanel"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'cpanel-guide'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>cPanel Deployment</span>
        </button>

        <button
          onClick={() => setActiveTab('apk-guide')}
          id="tab-backend-apk"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'apk-guide'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android APK & Mobile</span>
        </button>

        <button
          onClick={() => setActiveTab('tester')}
          id="tab-backend-tester"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'tester'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>API Tester Console</span>
        </button>
      </div>

      {/* Tab 1: MySQL Schema SQL */}
      {activeTab === 'sql' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              InnoDB Tables: <code>users</code>, <code>daily_routines</code>, <code>routine_logs</code>, <code>habits</code>, <code>habit_logs</code>, <code>water_tracker</code>, <code>screen_time_logs</code>, <code>exercise_logs</code>, <code>food_logs</code>, <code>journal_entries</code>, <code>health_scores</code>, <code>health_articles</code>, <code>motivation_quotes</code>
            </span>
            <button
              onClick={() => copyToClipboard(sqlSchemaCode, 'sql')}
              id="copy-sql-schema-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-medium border border-slate-700 transition-colors"
            >
              {copiedSection === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'sql' ? 'Copied SQL!' : 'Copy SQL Script'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono overflow-x-auto max-h-[550px] leading-relaxed scrollbar-thin">
            {sqlSchemaCode}
          </pre>
        </div>
      )}

      {/* Tab 2: Architecture Tree */}
      {activeTab === 'architecture' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Clean modular separation between client frontend and cPanel PHP backend
            </span>
            <button
              onClick={() => copyToClipboard(architectureTree, 'arch')}
              id="copy-arch-tree-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-medium border border-slate-700 transition-colors"
            >
              {copiedSection === 'arch' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'arch' ? 'Copied Tree!' : 'Copy Architecture Tree'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-mono overflow-x-auto max-h-[550px] leading-relaxed">
            {architectureTree}
          </pre>
        </div>
      )}

      {/* Tab 3: PHP PDO Code */}
      {activeTab === 'php-api' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-slate-200">
                1. <code>backend/config/db.php</code> (PDO Connection Class)
              </h3>
              <button
                onClick={() => copyToClipboard(phpDbConnectCode, 'dbphp')}
                id="copy-dbphp-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-medium border border-slate-700"
              >
                {copiedSection === 'dbphp' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'dbphp' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono overflow-x-auto leading-relaxed">
              {phpDbConnectCode}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-200">
              2. <code>backend/api/auth/register.php</code> (Secure Registration Endpoint)
            </h3>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono overflow-x-auto leading-relaxed">
{`<?php
require_once '../../config/db.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    // Check if email exists
    $check_query = "SELECT id FROM users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($check_query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email is already registered."]);
        exit();
    }

    $password_hash = password_hash($data->password, PASSWORD_BCRYPT);
    $age = isset($data->age) ? (int)$data->age : 21;
    $gender = isset($data->gender) ? $data->gender : 'prefer_not_to_say';

    $query = "INSERT INTO users (name, email, password_hash, age, gender) VALUES (:name, :email, :password_hash, :age, :gender)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':name', $data->name);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':password_hash', $password_hash);
    $stmt->bindParam(':age', $age);
    $stmt->bindParam(':gender', $gender);

    if ($stmt->execute()) {
        $user_id = $db->lastInsertId();
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "User registered successfully.",
            "user" => [
                "id" => $user_id,
                "name" => $data->name,
                "email" => $data->email,
                "age" => $age,
                "gender" => $gender
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Unable to register user."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Incomplete registration data."]);
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 4: cPanel Deployment Guide */}
      {activeTab === 'cpanel-guide' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-heading font-extrabold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              <span>Step-by-Step cPanel Hosting Setup Guide</span>
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5 text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
                  Create MySQL Database & User in cPanel
                </h4>
                <p>Log in to your cPanel &gt; Navigate to <strong>MySQL® Database Wizard</strong>.</p>
                <p>Create a database name (e.g., <code>yourcpanel_youthfit_db</code>) and a database user with a strong password. Assign <strong>ALL PRIVILEGES</strong> to the user.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5 text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">2</span>
                  Import <code>database.sql</code> via phpMyAdmin
                </h4>
                <p>Open <strong>phpMyAdmin</strong> from cPanel &gt; Select your database &gt; Click the <strong>Import</strong> tab.</p>
                <p>Choose the downloaded <code>youthfit_database.sql</code> file and click <strong>Go</strong> to create all 13 tables automatically.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5 text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">3</span>
                  Upload Backend Files to <code>public_html/api/</code>
                </h4>
                <p>In cPanel <strong>File Manager</strong>, create an <code>api</code> folder inside <code>public_html</code>.</p>
                <p>Upload the contents of the <code>/backend/</code> folder. Edit <code>config/db.php</code> with your database name, username, and password.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5 text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">4</span>
                  Connect React Web / Mobile App
                </h4>
                <p>Point your frontend API client base URL to <code>https://yourdomain.com/api</code>.</p>
                <p>All endpoints accept and return clean JSON with UTF-8 support and CORS headers.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Android APK & Mobile Guide */}
      {activeTab === 'apk-guide' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-lg font-heading font-extrabold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>Android APK Generation & Deployment</span>
              </h3>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold w-fit">
                Capacitor 8.5 + Android 34 Ready
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              YouthFit is engineered with native mobile readiness using Capacitor. You can build, test, and generate the release or debug <code>.apk</code> in 3 effortless ways:
            </p>

            <div className="space-y-4 text-xs text-slate-300">
              {/* Method 1: GitHub Actions */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
                    <Github className="w-4 h-4 text-emerald-400" />
                    <span>Method 1: 1-Click Automated Cloud Build (Recommended)</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">
                    .github/workflows/build-apk.yml
                  </span>
                </div>
                <p>
                  Export or push this repository to GitHub. The included GitHub Actions workflow will automatically compile the Android APK in the cloud with Java 21, Gradle 8, and Android SDK, outputting a downloadable <code>app-debug.apk</code> artifact under the <strong>Actions</strong> tab.
                </p>
              </div>

              {/* Method 2: Android Studio */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2">
                <h4 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">2</span>
                  <span>Method 2: Android Studio (GUI)</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1">
                  <li>Download or clone this project onto your computer with Android Studio installed.</li>
                  <li>Run <code>npm install && npm run build && npx cap sync</code></li>
                  <li>Run <code>npx cap open android</code> to open the native project in Android Studio.</li>
                  <li>Go to <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.</li>
                  <li>Click <strong>locate</strong> in the pop-up notification to get your installable <code>app-debug.apk</code>.</li>
                </ol>
              </div>

              {/* Method 3: Command Line */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2">
                <h4 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">3</span>
                  <span>Method 3: Terminal / Command Line with Gradle</span>
                </h4>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400">
                  cd android && ./gradlew assembleDebug
                </div>
                <p className="text-[11px] text-slate-400">
                  Output path: <code>android/app/build/outputs/apk/debug/app-debug.apk</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: API Tester Console */}
      {activeTab === 'tester' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>REST API Test & Simulation Console</span>
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Ready for Live & Mock Testing
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Simulate testing the API endpoints before deploying to your live cPanel server.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">POST /api/auth/register.php</span>
                  <span className="text-[10px] text-slate-400">HTTP 201</span>
                </div>
                <pre className="text-[11px] text-slate-300 font-mono overflow-x-auto">
{`{
  "status": "success",
  "message": "User registered successfully.",
  "user": {
    "id": 1,
    "name": "Saif Ahmed",
    "email": "saifsk85091@gmail.com"
  }
}`}
                </pre>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">GET /api/health_score/index.php</span>
                  <span className="text-[10px] text-slate-400">HTTP 200</span>
                </div>
                <pre className="text-[11px] text-slate-300 font-mono overflow-x-auto">
{`{
  "date": "2026-09-01",
  "water_score": 18,
  "exercise_score": 20,
  "sleep_score": 20,
  "food_score": 15,
  "habit_score": 20,
  "total_score": 93
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
