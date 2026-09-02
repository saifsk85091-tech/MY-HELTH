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
    // Get master habits
    $stmt = $db->prepare("SELECT * FROM habits WHERE user_id = :user_id AND is_active = 1 ORDER BY id ASC");
    $stmt->execute([':user_id' => $userId]);
    $habits = $stmt->fetchAll();

    // Get logs for past 14 days
    $logStmt = $db->prepare("SELECT habit_id, log_date, is_completed FROM habit_logs 
                             WHERE user_id = :user_id AND log_date >= DATE_SUB(:today, INTERVAL 14 DAY)");
    $logStmt->execute([':user_id' => $userId, ':today' => $today]);
    $logs = $logStmt->fetchAll();

    $historyMap = [];
    foreach ($logs as $l) {
        if ($l['is_completed'] == 1) {
            $historyMap[$l['habit_id']][$l['log_date']] = true;
        }
    }

    $result = array_map(function($h) use ($historyMap) {
        $h['history'] = $historyMap[$h['id']] ?? new stdClass();
        return $h;
    }, $habits);

    http_response_code(200);
    echo json_encode(["status" => "success", "data" => $result]);

} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->action) && $data->action === 'toggle' && !empty($data->habit_id)) {
        $logDate = !empty($data->date) ? $data->date : $today;
        
        $toggleQuery = "INSERT INTO habit_logs (habit_id, user_id, log_date, is_completed)
                        VALUES (:habit_id, :user_id, :log_date, 1)
                        ON DUPLICATE KEY UPDATE is_completed = IF(is_completed = 1, 0, 1)";
        $tStmt = $db->prepare($toggleQuery);
        $tStmt->execute([
            ':habit_id' => $data->habit_id,
            ':user_id' => $userId,
            ':log_date' => $logDate
        ]);

        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Habit toggled."]);
    } else {
        // Create new habit
        if (!empty($data->name)) {
            $stmt = $db->prepare("INSERT INTO habits (user_id, name, name_bn, category, icon, target_days_per_week) 
                                  VALUES (:user_id, :name, :name_bn, :category, :icon, :target)");
            $stmt->execute([
                ':user_id' => $userId,
                ':name' => $data->name,
                ':name_bn' => $data->nameBn ?? $data->name,
                ':category' => $data->category ?? 'General',
                ':icon' => $data->icon ?? 'CheckCircle2',
                ':target' => $data->targetDaysPerWeek ?? 7
            ]);

            http_response_code(201);
            echo json_encode(["status" => "success", "id" => $db->lastInsertId()]);
        }
    }
} elseif ($method === 'DELETE') {
    $habitId = $_GET['id'] ?? null;
    if ($habitId) {
        $stmt = $db->prepare("DELETE FROM habits WHERE id = :id AND user_id = :user_id");
        $stmt->execute([':id' => $habitId, ':user_id' => $userId]);
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Habit removed."]);
    }
}
