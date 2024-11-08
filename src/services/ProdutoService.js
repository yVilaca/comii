import { supabase } from '../supabaseClient';

export const ProdutoService = {
  async buscarProdutos() {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('id');
      
      if (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  async buscarProdutoPorId(id) {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar produto por ID:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      throw error;
    }
  },

  async buscarProdutosPorCategoria(categoria) {
    try {
      console.log(`Iniciando busca da categoria: ${categoria}`);
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('categoria', categoria)
        .order('id');
      
      if (error) {
        console.error('Erro ao buscar produtos por categoria:', error);
        throw error;
      }
      
      console.log('Produtos encontrados:', data);
      return data;
    } catch (error) {
      console.error('Erro na busca:', error);
      throw error;
    }
  }
};

