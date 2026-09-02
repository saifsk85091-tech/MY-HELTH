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
    $stmt = $db->prepare("SELECT glasses_drunk, goal_glasses FROM water_tracker WHERE user_id = :user_id AND log_date = :log_date LIMIT 1");
    $stmt->execute([':user_id' => $userId, ':log_date' => $today]);
    $log = $stmt->fetch();

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "date" => $today,
        "glasses" => $log ? (int)$log['glasses_drunk'] : 0,
        "goal" => $log ? (int)$log['goal_glasses'] : 8
    ]);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $glasses = isset($data->glasses) ? (int)$data->glasses : 1;
    $goal = isset($data->goal) ? (int)$data->goal : 8;

    $query = "INSERT INTO water_tracker (user_id, log_date, glasses_drunk, goal_glasses)
              VALUES (:user_id, :log_date, :glasses, :goal)
              ON DUPLICATE KEY UPDATE glasses_drunk = :glasses, goal_glasses = :goal";
    
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':user_id' => $userId,
        ':log_date' => $today,
        ':glasses' => $glasses,
        ':goal' => $goal
    ]);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "glasses" => $glasses,
        "goal" => $goal
    ]);
}
