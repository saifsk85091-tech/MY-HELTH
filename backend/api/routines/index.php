<?php
require_once '../../config/db.php';
require_once '../../config/jwt_helper.php';

$token = JWTHelper::getBearerToken();
$decoded = JWTHelper::validateToken($token);

if (!$decoded) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized token."]);
    exit();
}

$database = new Database();
$db = $database->getConnection();
$userId = $decoded['user_id'];
$today = date('Y-m-d');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $query = "SELECT r.*, 
                     COALESCE(rl.is_completed, 0) as completed
              FROM daily_routines r
              LEFT JOIN routine_logs rl ON r.id = rl.routine_id AND rl.log_date = :today AND rl.user_id = :user_id
              WHERE r.user_id = :user_id
              ORDER BY FIELD(r.period, 'morning', 'afternoon', 'evening', 'night'), r.time ASC";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':today', $today);
    $stmt->bindParam(':user_id', $userId);
    $stmt->execute();
    $routines = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode(["status" => "success", "data" => $routines]);

} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->action) && $data->action === 'toggle' && !empty($data->routine_id)) {
        // Toggle completion status
        $logQuery = "INSERT INTO routine_logs (routine_id, user_id, log_date, is_completed, completed_at)
                     VALUES (:routine_id, :user_id, :log_date, 1, NOW())
                     ON DUPLICATE KEY UPDATE is_completed = IF(is_completed = 1, 0, 1), completed_at = NOW()";
        $lStmt = $db->prepare($logQuery);
        $lStmt->bindParam(':routine_id', $data->routine_id);
        $lStmt->bindParam(':user_id', $userId);
        $lStmt->bindParam(':log_date', $today);
        $lStmt->execute();

        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Routine completion updated."]);
    } else {
        // Create new routine item
        if (!empty($data->title) && !empty($data->time) && !empty($data->period)) {
            $query = "INSERT INTO daily_routines (user_id, period, time, title, title_bn, description, description_bn, category)
                      VALUES (:user_id, :period, :time, :title, :title_bn, :description, :description_bn, :category)";
            $stmt = $db->prepare($query);
            $stmt->execute([
                ':user_id' => $userId,
                ':period' => $data->period,
                ':time' => $data->time,
                ':title' => $data->title,
                ':title_bn' => $data->titleBn ?? $data->title,
                ':description' => $data->description ?? '',
                ':description_bn' => $data->descriptionBn ?? '',
                ':category' => $data->category ?? 'general'
            ]);

            http_response_code(201);
            echo json_encode(["status" => "success", "id" => $db->lastInsertId()]);
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Title, time, and period are required."]);
        }
    }
} elseif ($method === 'DELETE') {
    $routineId = $_GET['id'] ?? null;
    if ($routineId) {
        $stmt = $db->prepare("DELETE FROM daily_routines WHERE id = :id AND user_id = :user_id");
        $stmt->execute([':id' => $routineId, ':user_id' => $userId]);
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Routine deleted."]);
    }
}
