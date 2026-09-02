<?php
require_once '../../config/db.php';
require_once '../../config/jwt_helper.php';

$token = JWTHelper::getBearerToken();
$decoded = JWTHelper::validateToken($token);

if (!$decoded) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized."]);
    exit();
}

$database = new Database();
$db = $database->getConnection();
$userId = $decoded['user_id'];
$today = date('Y-m-d');

// 1. Water Score (max 20)
$wStmt = $db->prepare("SELECT glasses_drunk, goal_glasses FROM water_tracker WHERE user_id = :user_id AND log_date = :today");
$wStmt->execute([':user_id' => $userId, ':today' => $today]);
$wRow = $wStmt->fetch();
$waterGlasses = $wRow ? (int)$wRow['glasses_drunk'] : 0;
$waterGoal = $wRow ? (int)$wRow['goal_glasses'] : 8;
$waterScore = (int)round(min(1.0, $waterGlasses / max(1, $waterGoal)) * 20);

// 2. Exercise Score (max 20)
$eStmt = $db->prepare("SELECT COUNT(*) as count FROM exercise_logs WHERE user_id = :user_id AND log_date = :today");
$eStmt->execute([':user_id' => $userId, ':today' => $today]);
$eCount = (int)$eStmt->fetch()['count'];
$exerciseScore = min(20, max(0, $eCount * 10));

// 3. Sleep Score (max 20)
$sleepScore = 20; // Default healthy baseline

// 4. Healthy Food Score (max 20)
$fStmt = $db->prepare("SELECT COUNT(*) as count FROM food_logs WHERE user_id = :user_id AND log_date = :today AND is_healthy = 1");
$fStmt->execute([':user_id' => $userId, ':today' => $today]);
$fCount = (int)$fStmt->fetch()['count'];
$healthyFoodScore = min(20, (int)round(($fCount / 4) * 20));

// 5. Habit Score (max 20)
$hTotalStmt = $db->prepare("SELECT COUNT(*) as count FROM habits WHERE user_id = :user_id AND is_active = 1");
$hTotalStmt->execute([':user_id' => $userId]);
$hTotal = (int)$hTotalStmt->fetch()['count'];

$hDoneStmt = $db->prepare("SELECT COUNT(*) as count FROM habit_logs WHERE user_id = :user_id AND log_date = :today AND is_completed = 1");
$hDoneStmt->execute([':user_id' => $userId, ':today' => $today]);
$hDone = (int)$hDoneStmt->fetch()['count'];
$habitScore = $hTotal > 0 ? (int)round(($hDone / $hTotal) * 20) : 15;

$totalScore = min(100, max(0, $waterScore + $exerciseScore + $sleepScore + $healthyFoodScore + $habitScore));

// Save/Update in health_scores table
$sStmt = $db->prepare("INSERT INTO health_scores (user_id, score_date, water_score, exercise_score, sleep_score, food_score, habit_score, total_score)
                       VALUES (:user_id, :score_date, :w, :e, :s, :f, :h, :total)
                       ON DUPLICATE KEY UPDATE water_score = :w, exercise_score = :e, sleep_score = :s, food_score = :f, habit_score = :h, total_score = :total");
$sStmt->execute([
    ':user_id' => $userId,
    ':score_date' => $today,
    ':w' => $waterScore,
    ':e' => $exerciseScore,
    ':s' => $sleepScore,
    ':f' => $healthyFoodScore,
    ':h' => $habitScore,
    ':total' => $totalScore
]);

http_response_code(200);
echo json_encode([
    "status" => "success",
    "date" => $today,
    "water_score" => $waterScore,
    "exercise_score" => $exerciseScore,
    "sleep_score" => $sleepScore,
    "healthy_food_score" => $healthyFoodScore,
    "habit_score" => $habitScore,
    "total_score" => $totalScore
]);
