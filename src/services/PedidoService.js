import { supabase } from "../supabaseClient";
import { Pedido } from "../models/Pedido";
import { PedidoProduto } from "../models/PedidoProduto";

export class PedidoService {
  static async criarPedido(pedido) {
    const { data, error } = await supabase
      .from("pedidos")
      .insert(pedido.toJSON())
      .select()
      .single();

    if (error) throw error;

    const novoPedido = Pedido.fromJSON(data);

    for (const produto of pedido.produtos) {
      await this.adicionarProdutoAoPedido(novoPedido.id, produto);
    }

    return novoPedido;
  }

  static async adicionarProdutoAoPedido(pedidoId, pedidoProduto) {
    const { error } = await supabase.from("pedido_produtos").insert({
      ...pedidoProduto.toJSON(),
      pedido_id: pedidoId,
    });

    if (error) throw error;
  }

  static async buscarPedidoPorId(id) {
    const { data, error } = await supabase
      .from("pedidos")
      .select(
        `
        *,
        produtos:pedido_produtos(
          produto:produtos(*)
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    return Pedido.fromJSON(data);
  }

  static async listarPedidos(clienteId) {
    const { data, error } = await supabase
      .from("pedidos")
      .select(
        `
        *,
        produtos:pedido_produtos(
          produto:produtos(*)
        )
      `
      )
      .eq("cliente_id", clienteId)
      .order("data_pedido", { ascending: false });

    if (error) throw error;

    return data.map((pedido) => Pedido.fromJSON(pedido));
  }

  static async atualizarPedido(pedido) {
    const { error } = await supabase
      .from("pedidos")
      .update(pedido.toJSON())
      .eq("id", pedido.id);

    if (error) throw error;

    return pedido;
  }

  static async deletarPedido(id) {
    const { error } = await supabase.from("pedidos").delete().eq("id", id);

    if (error) throw error;
  }

  static async listarPedidosPorEmail(email) {
    console.log("Buscando pedidos para o email:", email);
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .eq("cliente_email", email);

    if (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw new Error(error.message);
    }
    console.log("Pedidos recuperados:", data);
    return data;
  }
}
