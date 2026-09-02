<?php
require_once '../../config/db.php';
require_once '../../config/jwt_helper.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $query = "SELECT id, name, email, password_hash, age, gender, role, target_sleep_time, target_wake_time, daily_screen_time_goal_hours, daily_water_goal_glasses, onboarding_completed 
              FROM users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch();

        if (password_verify($data->password, $row['password_hash'])) {
            $token = JWTHelper::generateToken([
                'user_id' => $row['id'],
                'email' => $row['email'],
                'role' => $row['role']
            ]);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Login successful.",
                "token" => $token,
                "user" => [
                    "id" => $row['id'],
                    "name" => $row['name'],
                    "email" => $row['email'],
                    "age" => (int)$row['age'],
                    "gender" => $row['gender'],
                    "role" => $row['role'],
                    "targetSleepTime" => $row['target_sleep_time'],
                    "targetWakeTime" => $row['target_wake_time'],
                    "dailyScreenTimeGoalHours" => (float)$row['daily_screen_time_goal_hours'],
                    "dailyWaterGoalGlasses" => (int)$row['daily_water_goal_glasses'],
                    "onboardingCompleted" => (bool)$row['onboarding_completed']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "Invalid password."]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "No user found with this email."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Please provide both email and password."]);
}
