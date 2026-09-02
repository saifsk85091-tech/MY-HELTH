<?php
// ==================================================================
// YouthFit Backend - Lightweight Pure PHP JWT Helper
// Works seamlessly on any cPanel shared hosting environment
// ==================================================================

class JWTHelper {
    private static $secret_key = "YouthFit_Super_Secret_JWT_Key_2026_ChangeInProduction!";

    public static function generateToken($payload, $expiry_seconds = 2592000) { // 30 days default
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload['exp'] = time() + $expiry_seconds;
        $payload['iat'] = time();
        $payload_json = json_encode($payload);

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload_json));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret_key, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function validateToken($jwt) {
        if (empty($jwt)) return false;

        $tokenParts = explode('.', $jwt);
        if (count($tokenParts) !== 3) return false;

        $header = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[0]));
        $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[1]));
        $signature_provided = $tokenParts[2];

        $payload_data = json_decode($payload, true);
        if (!$payload_data || !isset($payload_data['exp'])) return false;

        // Check token expiration
        if ($payload_data['exp'] < time()) {
            return false;
        }

        $base64UrlHeader = $tokenParts[0];
        $base64UrlPayload = $tokenParts[1];
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret_key, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        if (hash_equals($base64UrlSignature, $signature_provided)) {
            return $payload_data;
        }

        return false;
    }

    public static function getBearerToken() {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }

        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }
}
