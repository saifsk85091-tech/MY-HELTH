<?php
require_once '../../config/db.php';
require_once '../../config/jwt_helper.php';

$token = JWTHelper::getBearerToken();
$decoded = JWTHelper::validateToken($token);

if (!$decoded) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized: Invalid or expired token."]);
    exit();
}

$database = new Database();
$db = $database->getConnection();
$userId = $decoded['user_id'];

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $query = "SELECT id, name, email, age, gender, role, target_sleep_time, target_wake_time, 
                     daily_screen_time_goal_hours, daily_water_goal_glasses, primary_goals, onboarding_completed, created_at 
              FROM users WHERE id = :id LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $userId);
    $stmt->execute();
    $user = $stmt->fetch();

    if ($user) {
        http_response_code(200);
        echo json_encode(["status" => "success", "user" => $user]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "User not found."]);
    }
} elseif ($method === 'PUT' || $method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "UPDATE users SET 
                name = COALESCE(:name, name),
                target_sleep_time = COALESCE(:target_sleep_time, target_sleep_time),
                target_wake_time = COALESCE(:target_wake_time, target_wake_time),
                daily_screen_time_goal_hours = COALESCE(:daily_screen_time_goal_hours, daily_screen_time_goal_hours),
                daily_water_goal_glasses = COALESCE(:daily_water_goal_glasses, daily_water_goal_glasses),
                primary_goals = COALESCE(:primary_goals, primary_goals),
                onboarding_completed = COALESCE(:onboarding_completed, onboarding_completed)
              WHERE id = :id";
    
    $stmt = $db->prepare($query);
    $name = $data->name ?? null;
    $sleep = $data->targetSleepTime ?? null;
    $wake = $data->targetWakeTime ?? null;
    $screen = $data->dailyScreenTimeGoalHours ?? null;
    $water = $data->dailyWaterGoalGlasses ?? null;
    $goals = isset($data->primaryGoals) ? json_encode($data->primaryGoals) : null;
    $onboard = isset($data->onboardingCompleted) ? ($data->onboardingCompleted ? 1 : 0) : null;

    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':target_sleep_time', $sleep);
    $stmt->bindParam(':target_wake_time', $wake);
    $stmt->bindParam(':daily_screen_time_goal_hours', $screen);
    $stmt->bindParam(':daily_water_goal_glasses', $water);
    $stmt->bindParam(':primary_goals', $goals);
    $stmt->bindParam(':onboarding_completed', $onboard);
    $stmt->bindParam(':id', $userId);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Profile updated successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to update profile."]);
    }
}
