import { Prisma } from '@prisma/client';
import { ItemVenda } from 'src/domain/cafeteria/enterprise/entities/item-venda';

export class PrismaItensVendaMapper {
  static toPrisma(entity: ItemVenda): Prisma.itensUncheckedCreateInput {
    return {
      id_produto: entity.idProduto.value,
      id_venda: entity.idVenda.value,
      quantidade: entity.quantidade,
      valor: entity.valor,
    };
  }
}
