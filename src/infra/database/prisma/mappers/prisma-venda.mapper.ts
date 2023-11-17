import { Prisma } from '@prisma/client';
import { Venda } from 'src/domain/cafeteria/enterprise/entities/venda';

export class PrismaVendaMapper {
  static toPrisma(entity: Venda): Prisma.vendasUncheckedCreateInput {
    return {
      id_funcionario: entity.idFuncionario.value,
      valor_total: entity.valorTotal,
      ven_horario: entity.venHorario,
    };
  }
}
