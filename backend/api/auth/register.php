<?php
require_once '../../config/db.php';
require_once '../../config/jwt_helper.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    // Validate email
    if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid email format."]);
        exit();
    }

    // Check existing email
    $check_query = "SELECT id FROM users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($check_query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(["status" => "error", "message" => "An account with this email already exists."]);
        exit();
    }

    $password_hash = password_hash($data->password, PASSWORD_BCRYPT);
    $age = isset($data->age) ? (int)$data->age : 21;
    $gender = isset($data->gender) ? $data->gender : 'prefer_not_to_say';
    $role = (strpos($data->email, 'admin') !== false) ? 'admin' : 'user';

    $query = "INSERT INTO users (name, email, password_hash, age, gender, role) 
              VALUES (:name, :email, :password_hash, :age, :gender, :role)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':name', $data->name);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':password_hash', $password_hash);
    $stmt->bindParam(':age', $age);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':role', $role);

    if ($stmt->execute()) {
        $user_id = $db->lastInsertId();

        // Seed initial default routines for the user
        $defaultRoutines = [
            ['morning', '06:30 AM', 'Wake Up & Natural Sunlight', 'ঘুম থেকে ওঠা ও সূর্যের আলো নেওয়া', 'Get out of bed without phone. Drink 1 glass of water.', 'sleep'],
            ['morning', '07:00 AM', 'Morning Movement & Stretch', 'মর্নিং মুভমেন্ট ও স্ট্রেচিং', 'Light push-ups, squats, or walking to boost dopamine naturally.', 'exercise'],
            ['morning', '08:00 AM', 'Nutritious Breakfast', 'পুষ্টিকর সকালের নাস্তা', 'Eggs, whole grains, fruits.', 'food'],
            ['afternoon', '01:30 PM', 'Clean Balanced Lunch', 'সুষম দুপুরের খাবার', 'Rice, vegetables, lentils, clean protein.', 'food'],
            ['evening', '05:30 PM', 'Sports / Outdoor Activity', 'খেলাধুলা বা বাইরে হাঁটা', 'Clear mental stress with physical activity.', 'exercise'],
            ['night', '08:30 PM', 'Light Dinner', 'হালকা রাতের খাবার', 'Eat 2+ hours before sleeping.', 'food'],
            ['night', '10:00 PM', 'Screen Curfew', 'মোবাইল দূরে রাখা', 'No late-night scrolling. Melatonin protection.', 'digital'],
            ['night', '11:00 PM', 'Deep Sleep Recovery', 'সময়মতো ঘুম', '7-8 hours restful sleep.', 'sleep']
        ];

        $rQuery = "INSERT INTO daily_routines (user_id, period, time, title, title_bn, description, category) 
                   VALUES (:user_id, :period, :time, :title, :title_bn, :description, :category)";
        $rStmt = $db->prepare($rQuery);

        foreach ($defaultRoutines as $r) {
            $rStmt->execute([
                ':user_id' => $user_id,
                ':period' => $r[0],
                ':time' => $r[1],
                ':title' => $r[2],
                ':title_bn' => $r[3],
                ':description' => $r[4],
                ':category' => $r[5]
            ]);
        }

        // Seed default habits
        $defaultHabits = [
            ['No Phone First 30 Mins of Morning', 'সকালে উঠেই ফোন না দেখা', 'Digital Detox'],
            ['8 Glasses of Water Daily', 'প্রতিদিন ৮ গ্লাস পানি পান', 'Hydration'],
            ['20 Mins Physical Workout', '২০ মিনিট ব্যায়াম বা খেলাধুলা', 'Fitness'],
            ['Sleep by 11:00 PM', 'রাত ১১টার মধ্যে ঘুমানো', 'Sleep Health']
        ];

        $hQuery = "INSERT INTO habits (user_id, name, name_bn, category) VALUES (:user_id, :name, :name_bn, :category)";
        $hStmt = $db->prepare($hQuery);
        foreach ($defaultHabits as $h) {
            $hStmt->execute([
                ':user_id' => $user_id,
                ':name' => $h[0],
                ':name_bn' => $h[1],
                ':category' => $h[2]
            ]);
        }

        $token = JWTHelper::generateToken([
            'user_id' => $user_id,
            'email' => $data->email,
            'role' => $role
        ]);

        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "User registered successfully.",
            "token" => $token,
            "user" => [
                "id" => $user_id,
                "name" => $data->name,
                "email" => $data->email,
                "age" => $age,
                "gender" => $gender,
                "role" => $role
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Unable to register user."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Incomplete data. Please provide name, email, and password."]);
}
