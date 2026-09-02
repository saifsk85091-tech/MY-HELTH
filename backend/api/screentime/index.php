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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->prepare("SELECT screen_hours, goal_hours, late_night_minutes FROM screen_time_logs WHERE user_id = :user_id AND log_date = :log_date LIMIT 1");
    $stmt->execute([':user_id' => $userId, ':log_date' => $today]);
    $row = $stmt->fetch();

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "date" => $today,
        "screen_hours" => $row ? (float)$row['screen_hours'] : 0.0,
        "goal_hours" => $row ? (float)$row['goal_hours'] : 3.5,
        "late_night_minutes" => $row ? (int)$row['late_night_minutes'] : 0
    ]);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $hours = isset($data->hours) ? (float)$data->hours : 0.0;
    $goal = isset($data->goal) ? (float)$data->goal : 3.5;
    $lateNight = isset($data->late_night_minutes) ? (int)$data->late_night_minutes : 0;

    $query = "INSERT INTO screen_time_logs (user_id, log_date, screen_hours, goal_hours, late_night_minutes)
              VALUES (:user_id, :log_date, :screen_hours, :goal_hours, :late_night)
              ON DUPLICATE KEY UPDATE screen_hours = :screen_hours, goal_hours = :goal_hours, late_night_minutes = :late_night";
    
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':user_id' => $userId,
        ':log_date' => $today,
        ':screen_hours' => $hours,
        ':goal_hours' => $goal,
        ':late_night' => $lateNight
    ]);

    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Screen time logged."]);
}
