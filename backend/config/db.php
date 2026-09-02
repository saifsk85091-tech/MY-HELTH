<?php
// ==================================================================
// YouthFit Backend - Database Connection Configuration (PHP PDO)
// Compatible with cPanel, Apache, Nginx & phpMyAdmin
// ==================================================================

// CORS Headers for API accessibility
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class Database {
    // Database credentials (adjust according to your cPanel setup)
    private $host = "localhost";
    private $db_name = "youthfit_db";
    private $username = "root";
    private $password = "";
    private $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
        } catch(PDOException $exception) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Database connection error: " . $exception->getMessage()
            ]);
            exit();
        }
        return $this->conn;
    }
}
