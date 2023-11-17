import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export type ProdutoProps = {
  descricao: string;
  valor: number;
  quantidade: number;
  idFornecedor: UniqueEntityId;
  fotoUrl: string;
};

export class Produto extends Entity<ProdutoProps> {
  get descricao() {
    return this.props.descricao;
  }
  get valor() {
    return this.props.valor;
  }
  get quantidade() {
    return this.props.quantidade;
  }
  get idFornecedor() {
    return this.props.idFornecedor;
  }
  get fotoUrl(): string {
    return this.props.fotoUrl;
  }

  set quantidade(quantidade: number) {
    this.props.quantidade = quantidade;
  }

  registrarSaidaEstoque(quantidade: number): void {
    this.props.quantidade -= quantidade;
  }

  static create(props: ProdutoProps, id?: UniqueEntityId) {
    return new Produto(props, id);
  }
}
