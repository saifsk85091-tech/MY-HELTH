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
    $stmt = $db->prepare("SELECT * FROM exercise_logs WHERE user_id = :user_id AND log_date = :log_date ORDER BY id DESC");
    $stmt->execute([':user_id' => $userId, ':log_date' => $today]);
    $logs = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode(["status" => "success", "data" => $logs]);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->exercise_name)) {
        $stmt = $db->prepare("INSERT INTO exercise_logs (user_id, exercise_name, category, duration_minutes, log_date)
                              VALUES (:user_id, :exercise_name, :category, :duration, :log_date)");
        $stmt->execute([
            ':user_id' => $userId,
            ':exercise_name' => $data->exercise_name,
            ':category' => $data->category ?? 'General Fitness',
            ':duration' => $data->duration_minutes ?? 15,
            ':log_date' => $today
        ]);

        http_response_code(201);
        echo json_encode(["status" => "success", "id" => $db->lastInsertId()]);
    }
}
