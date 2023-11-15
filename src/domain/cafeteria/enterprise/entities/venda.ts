import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export type VendaProps = {
  venHorario: Date;
  valorTotal: number;
  idFuncionario: UniqueEntityId;
};

export class Venda extends Entity<VendaProps> {
  get venHorario() {
    return this.props.venHorario;
  }
  get valorTotal() {
    return this.props.valorTotal;
  }
  get idFuncionario() {
    return this.props.idFuncionario;
  }

  static create(props: VendaProps, id?: UniqueEntityId): Venda {
    return new Venda(props, id);
  }
}
