<?php
declare(strict_types=1);
function ideamos_recaptcha_valid(array $result): bool {
    $time = isset($result['challenge_ts']) && is_string($result['challenge_ts']) ? strtotime($result['challenge_ts']) : false;
    return ($result['success'] ?? false) === true
        && empty($result['error-codes'])
        && ($result['action'] ?? '') === 'contact_submit'
        && in_array($result['hostname'] ?? '', ['ideamos.com.ar', 'www.ideamos.com.ar'], true)
        && isset($result['score']) && is_numeric($result['score']) && (float)$result['score'] >= 0.5
        && $time !== false && $time >= time() - 120 && $time <= time() + 30;
}
function ideamos_verify_recaptcha(string $token, string $secret): bool {
    if ($token === '' || strlen($token) > 8192 || $secret === '' || !function_exists('curl_init')) return false;
    $curl = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($curl, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => http_build_query(['secret' => $secret, 'response' => $token]), CURLOPT_RETURNTRANSFER => true, CURLOPT_CONNECTTIMEOUT => 4, CURLOPT_TIMEOUT => 10, CURLOPT_FOLLOWLOCATION => false]);
    $body = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    if ($status !== 200 || !is_string($body)) return false;
    $result = json_decode($body, true);
    return is_array($result) && ideamos_recaptcha_valid($result);
}
