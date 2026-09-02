-- ========================================================
-- YouthFit - Healthy Habit & Lifestyle Management App
-- MySQL Database Schema (cPanel & phpMyAdmin Compatible)
-- Engine: InnoDB, Charset: utf8mb4_unicode_ci
-- ========================================================

CREATE DATABASE IF NOT EXISTS `youthfit_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `youthfit_db`;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `age` INT NOT NULL,
  `gender` ENUM('male', 'female', 'other', 'prefer_not_to_say') DEFAULT 'prefer_not_to_say',
  `role` ENUM('user', 'admin') DEFAULT 'user',
  `target_sleep_time` VARCHAR(20) DEFAULT '11:00 PM',
  `target_wake_time` VARCHAR(20) DEFAULT '06:30 AM',
  `daily_screen_time_goal_hours` DECIMAL(3,1) DEFAULT 3.5,
  `daily_water_goal_glasses` INT DEFAULT 8,
  `primary_goals` TEXT DEFAULT NULL,
  `onboarding_completed` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Daily Routines Table
CREATE TABLE IF NOT EXISTS `daily_routines` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `period` ENUM('morning', 'afternoon', 'evening', 'night') NOT NULL,
  `time` VARCHAR(20) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `title_bn` VARCHAR(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `description_bn` TEXT DEFAULT NULL,
  `category` VARCHAR(50) DEFAULT 'general',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Routine Daily Completion Logs
CREATE TABLE IF NOT EXISTS `routine_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `routine_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `log_date` DATE NOT NULL,
  `is_completed` TINYINT(1) DEFAULT 0,
  `completed_at` TIMESTAMP NULL DEFAULT NULL,
  UNIQUE KEY `user_routine_date` (`user_id`, `routine_id`, `log_date`),
  FOREIGN KEY (`routine_id`) REFERENCES `daily_routines`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Habits Master Table
CREATE TABLE IF NOT EXISTS `habits` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `name_bn` VARCHAR(150) DEFAULT NULL,
  `category` VARCHAR(50) DEFAULT 'General',
  `icon` VARCHAR(50) DEFAULT 'CheckCircle2',
  `target_days_per_week` INT DEFAULT 7,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Habit Daily Logs
CREATE TABLE IF NOT EXISTS `habit_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `habit_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `log_date` DATE NOT NULL,
  `is_completed` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `user_habit_date` (`user_id`, `habit_id`, `log_date`),
  FOREIGN KEY (`habit_id`) REFERENCES `habits`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Water Tracker Logs Table
CREATE TABLE IF NOT EXISTS `water_tracker` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `log_date` DATE NOT NULL,
  `glasses_drunk` INT DEFAULT 0,
  `goal_glasses` INT DEFAULT 8,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `user_water_date` (`user_id`, `log_date`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Screen Time Tracker Logs
CREATE TABLE IF NOT EXISTS `screen_time_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `log_date` DATE NOT NULL,
  `screen_hours` DECIMAL(4,2) DEFAULT 0.00,
  `goal_hours` DECIMAL(4,2) DEFAULT 3.50,
  `late_night_minutes` INT DEFAULT 0,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `user_screen_date` (`user_id`, `log_date`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Exercise Logs Table
CREATE TABLE IF NOT EXISTS `exercise_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `exercise_name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `duration_minutes` INT NOT NULL,
  `log_date` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Daily Food Logs Table
CREATE TABLE IF NOT EXISTS `food_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `meal_type` ENUM('Breakfast', 'Lunch', 'Evening Snacks', 'Dinner') NOT NULL,
  `log_date` DATE NOT NULL,
  `is_healthy` TINYINT(1) DEFAULT 1,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `user_meal_date` (`user_id`, `meal_type`, `log_date`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Journal & Mood Entries Table
CREATE TABLE IF NOT EXISTS `journal_entries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `log_date` DATE NOT NULL,
  `mood` ENUM('great', 'good', 'normal', 'stressed', 'down') NOT NULL,
  `mood_score` INT DEFAULT 3,
  `note` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Daily 100-Point Health Scores Table
CREATE TABLE IF NOT EXISTS `health_scores` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `score_date` DATE NOT NULL,
  `water_score` INT DEFAULT 0,
  `exercise_score` INT DEFAULT 0,
  `sleep_score` INT DEFAULT 0,
  `food_score` INT DEFAULT 0,
  `habit_score` INT DEFAULT 0,
  `total_score` INT DEFAULT 0,
  `calculated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `user_score_date` (`user_id`, `score_date`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. Health Education Articles (Admin Managed)
CREATE TABLE IF NOT EXISTS `health_articles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `title_bn` VARCHAR(255) DEFAULT NULL,
  `category` VARCHAR(100) NOT NULL,
  `read_time` VARCHAR(50) DEFAULT '3 min read',
  `summary` TEXT NOT NULL,
  `summary_bn` TEXT DEFAULT NULL,
  `content` LONGTEXT NOT NULL,
  `content_bn` LONGTEXT DEFAULT NULL,
  `is_doctor_reviewed` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. Motivation Quotes Table
CREATE TABLE IF NOT EXISTS `motivation_quotes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `quote` TEXT NOT NULL,
  `quote_bn` TEXT DEFAULT NULL,
  `author` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) DEFAULT 'discipline',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. Seed Sample Admin User & Initial Data
INSERT INTO `users` (`name`, `email`, `password_hash`, `age`, `gender`, `role`)
VALUES ('Admin User', 'admin@youthfit.app', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 24, 'male', 'admin')
ON DUPLICATE KEY UPDATE `name` = `name`;

INSERT INTO `motivation_quotes` (`quote`, `quote_bn`, `author`, `category`)
VALUES 
('Small daily habits compound into massive lifelong strength.', 'প্রতিদিনের ছোট ছোট ভালো অভ্যাস একদিন বিশাল শক্তিতে পরিণত হয়।', 'James Clear', 'discipline'),
('Master your morning routine, conquer your entire day.', 'সকালকে জয় করুন, সারাদিন আপনার হবে।', 'Marcus Aurelius', 'mindset')
ON DUPLICATE KEY UPDATE `author` = `author`;
