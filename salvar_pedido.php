<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

error_log("salvar_pedido.php foi chamado");
error_log("Dados recebidos: " . file_get_contents("php://input"));

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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
    http_response_code(500);
    echo json_encode(["error" => "Falha na conexão com o banco de dados: " . $conn->connect_error]);
    exit();
}

// Receber dados do POST
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Dados inválidos recebidos"]);
    exit();
}

// Adicione este log no início do arquivo
error_log("Requisição recebida em salvar_pedido.php");

$conn->begin_transaction();

try {
    // Log antes de inserir o pedido
    error_log("Tentando inserir pedido");

    // Inserir pedido no banco de dados
    $stmt = $conn->prepare("INSERT INTO pedidos (numero_mesa, data_pedido, total, desconto, gorjeta, observacoes) VALUES (?, NOW(), ?, ?, ?, ?)");
    $stmt->bind_param("sddds", $data['mesa'], $data['total'], $data['desconto'], $data['gorjeta'], $data['observacoes']);
    $stmt->execute();
    $pedido_id = $stmt->insert_id;
    $stmt->close();

    // Log após inserir o pedido
    error_log("Pedido inserido com ID: " . $pedido_id);

    // Inserir produtos do pedido
    $stmt = $conn->prepare("INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade) VALUES (?, ?, ?)");
    $stmt_obs = $conn->prepare("INSERT INTO observacoes_produto (pedido_id, produto_id, observacao) VALUES (?, ?, ?)");

    foreach ($data['produtos'] as $produto) {
        // Log para cada produto
        error_log("Inserindo produto: " . json_encode($produto));

        $stmt->bind_param("iii", $pedido_id, $produto['id'], $produto['quantidade']);
        $stmt->execute();

        if (!empty($produto['observacao'])) {
            $stmt_obs->bind_param("iis", $pedido_id, $produto['id'], $produto['observacao']);
            $stmt_obs->execute();
        }
    }
    $stmt->close();
    $stmt_obs->close();

    $conn->commit();

    // Log de sucesso
    error_log("Pedido salvo com sucesso");

    // Retornar resposta em JSON
    echo json_encode([
        "status" => "success",
        "message" => "Pedido salvo com sucesso",
        "pedido_id" => $pedido_id
    ]);
} catch (Exception $e) {
    $conn->rollback();
    // Log de erro
    error_log("Erro ao salvar pedido: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Erro ao salvar o pedido: " . $e->getMessage()]);
}

$conn->close();
