# YouthFit Backend - PHP & MySQL (cPanel Deployment Guide)

## Overview
This backend provides high-performance, secure REST API endpoints for the **YouthFit - Healthy Habit & Lifestyle** application. Designed for standard cPanel shared hosting and VPS environments with zero external composer bloat.

---

## 1. Quick cPanel Setup Instructions

### Step 1: Create Database in cPanel
1. Log into your **cPanel** dashboard.
2. Go to **Databases** > **MySQL® Database Wizard**.
3. Create database: `yourcpanel_youthfit_db`.
4. Create database user: `yourcpanel_youthfit_user` and set a strong password.
5. Grant **ALL PRIVILEGES** to the user on the created database.

### Step 2: Import Database Tables
1. Open **phpMyAdmin** from cPanel.
2. Select your newly created database (`yourcpanel_youthfit_db`).
3. Click the **Import** tab in the top navigation bar.
4. Choose the `database.sql` file included in this directory.
5. Click **Go** (Creates all 13 InnoDB tables and initial seeds).

### Step 3: Upload Backend Files
1. In cPanel **File Manager**, navigate to `public_html`.
2. Create a folder named `api` (or upload to root).
3. Upload all contents of the `backend/` folder into `public_html/api/`.
4. Edit `config/db.php` and update your database credentials:
   ```php
   private $host = "localhost";
   private $db_name = "yourcpanel_youthfit_db";
   private $username = "yourcpanel_youthfit_user";
   private $password = "YourStrongPasswordHere";
   ```

---

## 2. API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register.php` | Register new user | No |
| `POST` | `/api/auth/login.php` | Login & receive JWT token | No |
| `GET` / `PUT` | `/api/auth/profile.php` | Get & update profile/goals | Yes (Bearer Token) |
| `GET` / `POST` | `/api/routines/index.php` | Fetch & manage daily routine | Yes |
| `GET` / `POST` | `/api/water/index.php` | Fetch & log daily water glasses | Yes |
| `GET` / `POST` | `/api/habits/index.php` | Fetch & toggle 7-day habit matrix | Yes |
| `GET` / `POST` | `/api/exercises/index.php` | Fetch & log daily workouts | Yes |
| `GET` / `POST` | `/api/screentime/index.php` | Fetch & log screen time/curfew | Yes |
| `GET` / `POST` | `/api/journal/index.php` | Fetch & log mood reflections | Yes |
| `GET` | `/api/health_score/index.php` | Calculate 100-point daily score | Yes |
| `GET` | `/api/articles/index.php` | Fetch evidence-based health articles | No |
| `GET` | `/api/admin/index.php` | PHP Admin content overview | Session / Admin |
