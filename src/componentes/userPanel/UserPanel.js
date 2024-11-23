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
  const [cep, setCep] = useState(user.user_metadata.cep || "");
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
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: userData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } else {
        // Atualiza o estado com os dados mais recentes
        setFullName(userData.full_name || "");
        setUsername(userData.username || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || ""); // Aqui você deve garantir que o telefone seja atualizado
        setCep(userData.cep || "");
        setPreferences(userData.preferences || "");
      }
    };

    fetchUserData();
  }, [user.id]); // Dependência para buscar dados quando o ID do usuário mudar

  useEffect(() => {
    // Adiciona a classe modal-open ao body quando o painel é aberto
    document.body.classList.add("modal-open");

    // Remove a classe modal-open do body quando o painel é fechado
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []); // Executa apenas uma vez quando o componente é montado

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
        cep: cep,
        preferences: preferences,
      })
      .eq("id", user.id);

    if (error) {
      console.error("Erro ao atualizar perfil:", error);
    } else {
      alert("Perfil atualizado com sucesso!");
      // Recarregar os dados do usuário após a atualização
      const { data: updatedUser, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError) {
        console.error("Erro ao buscar dados atualizados:", fetchError);
      } else {
        // Atualiza o estado com os dados mais recentes
        setPhone(updatedUser.phone || "");
        // Atualize outros estados conforme necessário
      }
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
      <div>
        <h2 className="titulo-profile">
          Perfil do Usuário <span onClick={onClose}>X</span>
        </h2>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="tabsUser">
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
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="CEP"
          />
          <textarea
            placeholder="Preferências Alimentares"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
          <button onClick={handleUpdateProfile}>Atualizar Perfil</button>

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
