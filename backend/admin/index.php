<?php
require_once '../config/db.php';

$database = new Database();
$db = $database->getConnection();

// Fetch summary metrics
$userCount = $db->query("SELECT COUNT(*) FROM users")->fetchColumn();
$routineCount = $db->query("SELECT COUNT(*) FROM daily_routines")->fetchColumn();
$habitCount = $db->query("SELECT COUNT(*) FROM habits")->fetchColumn();
$journalCount = $db->query("SELECT COUNT(*) FROM journal_entries")->fetchColumn();
$recentUsers = $db->query("SELECT id, name, email, age, gender, role, created_at FROM users ORDER BY id DESC LIMIT 10")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouthFit Admin Panel - Content & System Overview</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6">
    <div class="max-w-6xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
                <h1 class="text-2xl font-extrabold text-emerald-400">YouthFit Admin Panel</h1>
                <p class="text-xs text-slate-400">cPanel PHP & MySQL Content Management & Analytics</p>
            </div>
            <div class="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Database: MySQL InnoDB (UTF-8)
            </div>
        </div>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p class="text-xs text-slate-400 font-medium">Registered Users</p>
                <p class="text-2xl font-bold text-white mt-1"><?= (int)$userCount ?></p>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p class="text-xs text-slate-400 font-medium">Active Routines</p>
                <p class="text-2xl font-bold text-cyan-400 mt-1"><?= (int)$routineCount ?></p>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p class="text-xs text-slate-400 font-medium">Tracked Habits</p>
                <p class="text-2xl font-bold text-amber-400 mt-1"><?= (int)$habitCount ?></p>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p class="text-xs text-slate-400 font-medium">Journal Reflections</p>
                <p class="text-2xl font-bold text-indigo-400 mt-1"><?= (int)$journalCount ?></p>
            </div>
        </div>

        <!-- User Accounts Table -->
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 class="text-base font-bold text-slate-200">Recent User Registrations</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-300">
                    <thead class="bg-slate-950 text-slate-400 uppercase text-[10px]">
                        <tr>
                            <th class="p-2.5">ID</th>
                            <th class="p-2.5">Name</th>
                            <th class="p-2.5">Email</th>
                            <th class="p-2.5">Age</th>
                            <th class="p-2.5">Gender</th>
                            <th class="p-2.5">Role</th>
                            <th class="p-2.5">Registered</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/60">
                        <?php if (empty($recentUsers)): ?>
                        <tr><td colspan="7" class="p-4 text-center text-slate-500">No users found. Please import database.sql.</td></tr>
                        <?php else: ?>
                            <?php foreach ($recentUsers as $u): ?>
                            <tr class="hover:bg-slate-800/40">
                                <td class="p-2.5 font-mono"><?= $u['id'] ?></td>
                                <td class="p-2.5 font-bold text-white"><?= htmlspecialchars($u['name']) ?></td>
                                <td class="p-2.5"><?= htmlspecialchars($u['email']) ?></td>
                                <td class="p-2.5"><?= $u['age'] ?></td>
                                <td class="p-2.5 capitalize"><?= $u['gender'] ?></td>
                                <td class="p-2.5"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold"><?= $u['role'] ?></span></td>
                                <td class="p-2.5 text-slate-400"><?= $u['created_at'] ?></td>
                            </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
