import { Injectable } from '@nestjs/common';
import { VendasRepository } from 'src/domain/cafeteria/application/repositories/vendas.repository';
import { Venda } from 'src/domain/cafeteria/enterprise/entities/venda';

@Injectable()
export class PrismaVendasRepository implements VendasRepository {
  create(entity: Venda): Promise<void> {
    throw new Error('Method not implemented.');
  }
  fetch(): Promise<Venda[]> {
    throw new Error('Method not implemented.');
  }
}
