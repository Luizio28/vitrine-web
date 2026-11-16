<?php
// GET /api/produtos.php                -> todos os produtos
// GET /api/produtos.php?categoria=Chaveiro&status=pronta -> filtrados
require __DIR__ . '/../conexao.php';
header('Content-Type: application/json; charset=utf-8');

try {
    $sql = 'SELECT p.id, p.titulo AS title, p.preco AS price, p.status, p.imagem AS image,
                   GROUP_CONCAT(c.categoria ORDER BY c.categoria SEPARATOR "|") AS categorias
            FROM produtos p
            LEFT JOIN produto_categorias c ON c.produto_id = p.id';
    $where = []; $params = [];
    if (!empty($_GET['status']) && in_array($_GET['status'], ['pronta', 'encomenda'], true)) {
        $where[] = 'p.status = ?'; $params[] = $_GET['status'];
    }
    if (!empty($_GET['categoria'])) {
        $where[] = 'p.id IN (SELECT produto_id FROM produto_categorias WHERE categoria = ?)'; $params[] = $_GET['categoria'];
    }
    if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
    $sql .= ' GROUP BY p.id ORDER BY p.ordem, p.titulo';

    $st = conectar()->prepare($sql);
    $st->execute($params);
    $rows = array_map(function ($r) {
        $r['price'] = (float) $r['price'];
        $r['categories'] = $r['categorias'] ? explode('|', $r['categorias']) : [];
        unset($r['categorias']);
        return $r;
    }, $st->fetchAll());

    echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    error_log('produtos.php: ' . $e->getMessage()); // detalhe só no log do servidor, não vai pro navegador
    http_response_code(500);
    echo json_encode(['erro' => 'Falha ao consultar o banco'], JSON_UNESCAPED_UNICODE);
}
