<?php
// Conexão PDO com o MySQL/MariaDB (XAMPP). Ajuste via variáveis de ambiente se precisar.
function conectar(): PDO {
    static $pdo = null;
    if ($pdo) return $pdo;

    $host  = getenv('DB_HOST') ?: '127.0.0.1';
    $porta = getenv('DB_PORT') ?: '3306';
    $banco = getenv('DB_NAME') ?: 'euna3d';
    $user  = getenv('DB_USER') ?: 'root';
    $senha = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';

    $pdo = new PDO(
        "mysql:host=$host;port=$porta;dbname=$banco;charset=utf8mb4",
        $user,
        $senha,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
    return $pdo;
}
