<?php
header("Access-Control-Allow-Origin: *"); // Permitir acesso de qualquer origem
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Authorization");
header("Content-Type: application/json");

$servername = "sql200.infinityfree.com"; // Verifique as configurações no painel do InfinityFree
$username = "if0_36752603";      // Seu usuário de banco de dados
$password = "VSDUJFg2wUQtFR";            // Sua senha de banco de dados
$dbname = "if0_36752603_comii";   // Nome do banco de dados

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Consulta para obter pedidos
$sql = "SELECT p.numero_mesa, pp.quantidade, pr.nome, TIME_TO_SEC(TIMEDIFF(NOW(), p.data_pedido))/60 AS tempo_espera
        FROM pedidos p
        JOIN pedido_produtos pp ON p.id = pp.pedido_id
        JOIN produtos pr ON pp.produto_id = pr.id
        ORDER BY p.data_pedido DESC";

$result = $conn->query($sql);

$pedidos = array();

if ($result->num_rows > 0) {
    $tempo_espera = array();
    while ($row = $result->fetch_assoc()) {
        $mesa = $row['numero_mesa'];
        $produtos[] = array('nome' => $row['nome'], 'quantidade' => $row['quantidade']);
        $tempo_espera[] = $row['tempo_espera'];
    }
    $pedidos[] = array('numero_mesa' => $mesa, 'produtos' => $produtos, 'tempo_espera' => $tempo_espera[0]);
}

echo json_encode($pedidos);

$conn->close();
?>
