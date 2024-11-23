import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import InputMask from "react-input-mask";
import validator from "validator";
import "./UserPanel.css"; // Adicione estilos para o painel
import { Button } from "react-bootstrap"; // Importando um botão mais moderno

const UserPanel = ({ user, onClose }) => {
  const [fullName, setFullName] = useState(user.user_metadata.full_name || "");
  const [username, setUsername] = useState(user.user_metadata.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.user_metadata.phone || "");
  const [address, setAddress] = useState(user.user_metadata.address || "");
  const [preferences, setPreferences] = useState(
    user.user_metadata.preferences || ""
  );
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile"); // Estado para controlar a aba ativa

  useEffect(() => {
    fetchOrders();
    fetchCoupons();
  }, [email]); // Dependência de email para atualizar os pedidos e cupons quando o email mudar

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .eq("cliente_email", email);
    if (error) {
      console.error("Erro ao buscar pedidos:", error);
    } else {
      setOrders(data);
    }
  };

  const fetchCoupons = async () => {
    const { data, error } = await supabase
      .from("cupons")
      .select("*")
      .eq("cliente_email", email); // Supondo que você tenha uma tabela de cupons
    if (error) {
      console.error("Erro ao buscar cupons:", error);
    } else {
      setCoupons(data);
    }
  };

  const handleUpdateProfile = async () => {
    if (!validator.isEmail(email)) {
      setError("Email inválido.");
      return;
    }
    if (!validator.isMobilePhone(phone, "any")) {
      setError("Telefone inválido.");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        username: username,
        email: email,
        phone: phone,
        address: address,
        preferences: preferences,
      })
      .eq("id", user.id);
    if (error) {
      console.error("Erro ao atualizar perfil:", error);
    } else {
      alert("Perfil atualizado com sucesso!");
      onClose(); // Fecha o painel após a atualização
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erro ao fazer logout:", error);
    } else {
      alert("Logout realizado com sucesso!");
      onClose(); // Fecha o painel após o logout
    }
  };

  return (
    <div className="user-panel">
      <h2>Perfil do Usuário</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Meu Perfil
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Histórico de Pedidos
        </button>
        <button
          className={activeTab === "coupons" ? "active" : ""}
          onClick={() => setActiveTab("coupons")}
        >
          Meus Cupons
        </button>
      </div>

      {activeTab === "profile" && (
        <div className="profile-section card">
          <h3>Informações Pessoais</h3>
          <input
            type="text"
            placeholder="Nome completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled
          />
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
          <InputMask
            mask="(99) 99999-9999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefone"
          />
          <InputMask
            mask="99999-999"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="CEP"
          />
          <textarea
            placeholder="Preferências Alimentares"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
          <button onClick={handleUpdateProfile}>Atualizar Perfil</button>
          <button onClick={onClose}>Fechar</button>
          <Button variant="danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </Button>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="orders-section card">
          <h3>Histórico de Pedidos</h3>
          <ul>
            {orders.length > 0 ? (
              orders.map((order) => (
                <li key={order.id} className="order-item">
                  <h4>Pedido ID: {order.id}</h4>
                  <p>
                    Data: {new Date(order.data_pedido).toLocaleDateString()}
                  </p>
                  <p>
                    Status: {order.status_preparo || "Status não disponível"}
                  </p>
                  <p>Valor: R$ {order.total.toFixed(2)}</p>
                </li>
              ))
            ) : (
              <p>Nenhum pedido encontrado.</p>
            )}
          </ul>
        </div>
      )}

      {activeTab === "coupons" && (
        <div className="coupons-section card">
          <h3>Meus Cupons</h3>
          <ul>
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <li key={coupon.id} className="coupon-item">
                  <h4>Código: {coupon.codigo}</h4>
                  <p>Desconto: {coupon.desconto}%</p>
                  <p>
                    Validade: {new Date(coupon.validade).toLocaleDateString()}
                  </p>
                  <p>Status: {coupon.ativo ? "Ativo" : "Inativo"}</p>
                </li>
              ))
            ) : (
              <p>Nenhum cupom disponível.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserPanel;
