<?php
require __DIR__ . '/conexao.php';
header('Content-Type: text/plain; charset=utf-8');
try {
    $pdo = conectar();
    echo "PHP " . PHP_VERSION . " OK\n";
    echo "Banco: " . $pdo->query('SELECT DATABASE()')->fetchColumn() . " (" . $pdo->query('SELECT VERSION()')->fetchColumn() . ")\n";
    echo "Produtos: " . $pdo->query('SELECT COUNT(*) FROM produtos')->fetchColumn() . "\n";
    echo "CONEXAO OK\n";
} catch (Throwable $e) {
    http_response_code(500);
    echo "FALHOU: " . $e->getMessage() . "\n";
}
