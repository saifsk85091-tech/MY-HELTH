<?php
require_once '../../config/db.php';

$database = new Database();
$db = $database->getConnection();

$stmt = $db->query("SELECT id, title, title_bn, category, read_time, summary, summary_bn, content, content_bn, is_doctor_reviewed 
                    FROM health_articles ORDER BY id DESC");
$articles = $stmt->fetchAll();

http_response_code(200);
echo json_encode(["status" => "success", "data" => $articles]);
