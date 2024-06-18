<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$servername = getenv('DB_HOST');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');
$dbname = getenv('DB_NAME');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    http_response_code(400);
    die("Erro ao receber dados JSON.");
}

$produtos = $data['produtos'];
$total = $data['total'];
$mesa = isset($data['mesa']) ? $data['mesa'] : '';

$stmt = $conn->prepare("INSERT INTO pedidos (data_pedido, total, numero_mesa) VALUES (NOW(), ?, ?)");
$stmt->bind_param("ds", $total, $mesa);
$stmt->execute();
$pedido_id = $stmt->insert_id;
$stmt->close();

$stmt = $conn->prepare("INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade) VALUES (?, ?, ?)");
foreach ($produtos as $produto) {
    $stmt->bind_param("iii", $pedido_id, $produto['id'], $produto['quantidade']);
    $stmt->execute();
}
$stmt->close();

$conn->close();

$response = [
    'status' => 'success',
    'message' => 'Pedido salvo com sucesso.'
];
header('Content-Type: application/json');
echo json_encode($response);
?>
