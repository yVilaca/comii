export class PedidoProduto {
  constructor(pedidoId, produtoId, quantidade, observacao) {
    this.pedidoId = pedidoId;
    this.produtoId = produtoId;
    this.quantidade = quantidade;
    this.observacao = observacao;
  }

  static fromJSON(json) {
    return new PedidoProduto(
      json.pedido_id,
      json.produto_id,
      json.quantidade,
      json.observacao
    );
  }

  toJSON() {
    return {
      pedido_id: this.pedidoId,
      produto_id: this.produtoId,
      quantidade: this.quantidade,
      observacao: this.observacao,
    };
  }
}
