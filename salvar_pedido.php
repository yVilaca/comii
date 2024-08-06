<?php
// Verifica se a requisição é do tipo OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost"; // Verifique as configurações no painel do InfinityFree
$username = "root";      // Seu usuário de banco de dados
$password = "";            // Sua senha de banco de dados
$dbname = "comii";   // Nome do banco de dados


// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Receber dados do POST
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    http_response_code(400);
    die("Erro ao receber dados JSON.");
}

$produtos = $data['produtos'];
$total = $data['total'];
$mesa = isset($data['mesa']) ? $data['mesa'] : '';

// Inserir pedido no banco de dados
$stmt = $conn->prepare("INSERT INTO pedidos (data_pedido, total, numero_mesa) VALUES (NOW(), ?, ?)");
$stmt->bind_param("ds", $total, $mesa);
$stmt->execute();
$pedido_id = $stmt->insert_id;
$stmt->close();

// Inserir produtos do pedido
$stmt = $conn->prepare("INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade) VALUES (?, ?, ?)");
foreach ($produtos as $produto) {
    $stmt->bind_param("iii", $pedido_id, $produto['id'], $produto['quantidade']);
    $stmt->execute();
}
$stmt->close();

$conn->close();

// Retornar resposta em JSON
$response = [
    'status' => 'success',
    'message' => 'Pedido salvo com sucesso.'
];
header('Content-Type: application/json');
echo json_encode($response);
?>
