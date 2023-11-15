import { Produto } from '../../enterprise/entities/produto';

export abstract class ProdutosRepository {
  abstract findByid(id: number): Promise<Produto>;
}
