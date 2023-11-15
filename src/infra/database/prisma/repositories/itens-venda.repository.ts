import { Injectable } from '@nestjs/common';
import { ItensVendaRepository } from 'src/domain/cafeteria/application/repositories/itens-venda.repository';
import { ItemVenda } from 'src/domain/cafeteria/enterprise/entities/item-venda';

@Injectable()
export class PrismaItensVendaRepository implements ItensVendaRepository {
  create(entity: ItemVenda): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
