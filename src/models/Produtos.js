export class Produto {
  constructor(id, nome, descricao, preco, img, categoria, custo) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.img = img;
    this.categoria = categoria;
    this.custo = custo;
  }

  static fromJSON(json) {
    return new Produto(
      json.id,
      json.nome,
      json.descricao,
      json.preco,
      json.img,
      json.categoria,
      json.custo
    );
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      img: this.img,
      categoria: this.categoria,
      custo: this.custo,
    };
  }
}
