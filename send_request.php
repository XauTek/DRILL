<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method is not allowed.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$rawInput = file_get_contents('php://input');
$json = json_decode($rawInput ?: '', true);

if (!is_array($json)) {
    $json = $_POST;
}

$fullName = isset($json['fullName']) ? trim((string)$json['fullName']) : '';
$phone = isset($json['phone']) ? trim((string)$json['phone']) : '';
$email = isset($json['email']) ? trim((string)$json['email']) : '';

if ($fullName === '' || $phone === '' || $email === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Full name, phone and email are required.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!preg_match('/^[\p{L}\s\-]{5,100}$/u', $fullName)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid full name format.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$phoneNormalized = preg_replace('/[\s\-\(\)]/', '', $phone) ?? '';
if (!preg_match('/^(\+7|8)\d{10}$/', $phoneNormalized)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Phone must match +7XXXXXXXXXX or 8XXXXXXXXXX.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email format.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Corporate mailbox for incoming requests.
$to = 'popovdanila054@gmail.ru';

// Sender from the same domain for better deliverability.
$from = 'noreply@img-industry.ru';

$subject = '=?UTF-8?B?' . base64_encode('New lead from IMG website') . '?=';
$message = "New lead from IMG website\n\n"
    . "Full name: {$fullName}\n"
    . "Phone: {$phone}\n"
    . "Email: {$email}\n"
    . "Date: " . date('Y-m-d H:i:s') . "\n"
    . "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$headers = "From: {$from}\r\n"
    . "Reply-To: {$email}\r\n"
    . "MIME-Version: 1.0\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n";

$isSent = @mail($to, $subject, $message, $headers);

if (!$isSent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Email was not sent. Check PHP mail configuration.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Request sent successfully.'
], JSON_UNESCAPED_UNICODE);
