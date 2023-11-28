import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export type FuncionarioProps = {
  nome: string;
  cpf: string;
  senha: string;
  funcao: string;
};
export class Funcionario extends Entity<FuncionarioProps> {
  get nome(): string {
    return this.props.nome;
  }
  get cpf(): string {
    return this.props.cpf;
  }
  get senha(): string {
    return this.props.senha;
  }
  get funcao(): string {
    return this.props.funcao;
  }
  static create(props: FuncionarioProps, id?: UniqueEntityId) {
    return new Funcionario(props, id);
  }
}
