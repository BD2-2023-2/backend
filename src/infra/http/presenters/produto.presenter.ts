import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';

export class ProdutoPresenter {
  static toHttp(entity: Produto) {
    return {
      id: Number(entity.id.value),
      descricao: entity.descricao,
      valorUnitario: entity.valor,
      quantidadeEstoque: entity.quantidade,
      fotoUrl: entity.fotoUrl,
    };
  }
}
