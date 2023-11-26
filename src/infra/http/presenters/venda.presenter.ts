import { Venda } from 'src/domain/cafeteria/enterprise/entities/venda';

export class VendaPresenter {
  static toHttp(venda: Venda) {
    return {
      id: Number(venda.id.value),
      valorTotal: venda.valorTotal,
      venHorario: venda.venHorario,
      idFuncionario: Number(venda.idFuncionario.value),
    };
  }
}
