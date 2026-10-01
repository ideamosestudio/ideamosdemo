<?php
declare(strict_types=1);

$allowedOrigin = 'https://ideamos.com.ar';
$to = 'hola@ideamos.com.ar';

header("Cache-Control: no-store, private");
header("Access-Control-Allow-Origin: $allowedOrigin");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

function clean(string $value): string {
    $value = trim($value);
    return preg_replace('/[\r\n]+/', ' ', $value);
}

$honeypot = $_POST['_gotcha'] ?? '';
if ($honeypot !== '') {
    // Bot detected: pretend success, do nothing.
    echo json_encode(['ok' => true]);
    exit;
}

$config = require '/home8/ideamosc/.ideamos-recaptcha/config.php';
require_once '/home8/ideamosc/.ideamos-recaptcha/verify.php';
$token = $_POST['g-recaptcha-response'] ?? '';
if (!is_string($token) || !ideamos_verify_recaptcha($token, (string)($config['secret'] ?? ''))) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'captcha_failed']);
    exit;
}

$nombre = clean($_POST['nombre'] ?? '');
$empresa = clean($_POST['empresa'] ?? '');
$email = clean($_POST['email'] ?? '');
$telefono = clean($_POST['telefono'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');
$origen = clean($_POST['origen'] ?? 'Sitio web Ideamos');

if ($nombre === '' || $email === '' || $telefono === '' || $mensaje === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'missing_fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_email']);
    exit;
}

$subject = "Nueva consulta desde $origen - $nombre";

$body = "Nombre: $nombre\n";
$body .= "Empresa: $empresa\n";
$body .= "Email: $email\n";
$body .= "Teléfono: $telefono\n";
$body .= "Origen: $origen\n\n";
$body .= "Mensaje:\n$mensaje\n";

$fromAddress = 'no-responder@ideamos.com.ar';
$headers = [];
$headers[] = "From: Formulario Ideamos <$fromAddress>";
$headers[] = "Reply-To: $nombre <$email>";
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=utf-8';

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
