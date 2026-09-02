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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->prepare("SELECT id, log_date as date, mood, mood_score, note, created_at FROM journal_entries WHERE user_id = :user_id ORDER BY id DESC LIMIT 30");
    $stmt->execute([':user_id' => $userId]);
    $entries = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode(["status" => "success", "data" => $entries]);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->note)) {
        $moodScores = ['great' => 5, 'good' => 4, 'normal' => 3, 'stressed' => 2, 'down' => 1];
        $mood = $data->mood ?? 'normal';
        $score = $moodScores[$mood] ?? 3;
        $today = date('Y-m-d');

        $stmt = $db->prepare("INSERT INTO journal_entries (user_id, log_date, mood, mood_score, note)
                              VALUES (:user_id, :log_date, :mood, :mood_score, :note)");
        $stmt->execute([
            ':user_id' => $userId,
            ':log_date' => $today,
            ':mood' => $mood,
            ':mood_score' => $score,
            ':note' => $data->note
        ]);

        http_response_code(201);
        echo json_encode(["status" => "success", "id" => $db->lastInsertId()]);
    }
}
