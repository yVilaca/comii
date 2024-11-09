export class Pedido {
  constructor(data = {}) {
    this.id = data.id || null;
    this.total = data.total || 0;
    this.desconto = data.desconto || 0;
    this.gorjeta = data.gorjeta || 0;
    this.numero_mesa = data.numero_mesa || null;
    this.status_pagamento = data.status_pagamento || "pendente";
    this.status_preparo = data.status_preparo || "pendente";
    this.cliente_id = data.cliente_id || null;
    this.cliente_nome = data.cliente_nome || "";
    this.cliente_email = data.cliente_email || "";
    this.preferenceid = data.preferenceid;
    this.tempo_preparo = data.tempo_preparo || 0;
    this.data_pedido = data.data_pedido
      ? new Date(data.data_pedido)
      : new Date();
    this.produtos = data.produtos || [];
  }

  adicionarProduto(pedidoProduto) {
    this.produtos.push(pedidoProduto);
  }

  static fromJSON(json) {
    const pedido = new Pedido(json);
    pedido.produtos = json.produtos
      ? json.produtos.map((p) => PedidoProduto.fromJSON(p))
      : [];
    return pedido;
  }

  toJSON() {
    return {
      id: this.id,
      total: this.total,
      desconto: this.desconto,
      gorjeta: this.gorjeta,
      numero_mesa: this.numero_mesa,
      status_pagamento: this.status_pagamento,
      status_preparo: this.status_preparo,
      cliente_id: this.cliente_id,
      cliente_nome: this.cliente_nome,
      cliente_email: this.cliente_email,
      preferenceid: this.preferenceid,
      tempo_preparo: this.tempo_preparo,
      data_pedido: this.data_pedido.toISOString(),
      produtos: this.produtos.map((p) => p.toJSON()),
    };
  }
}
