import { Injectable } from '@nestjs/common';
import { VendasRepository } from 'src/domain/cafeteria/application/repositories/vendas.repository';
import { Venda } from 'src/domain/cafeteria/enterprise/entities/venda';
import { PrismaService } from '../prisma.service';
import { PrismaVendaMapper } from '../mappers/prisma-venda.mapper';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

@Injectable()
export class PrismaVendasRepository implements VendasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Venda): Promise<UniqueEntityId> {
    const data = PrismaVendaMapper.toPrisma(entity);

    const venda = await this.prisma.vendas.create({ data });

    return UniqueEntityId.createFromInt(venda.id);
  }
  fetch(): Promise<Venda[]> {
    throw new Error('Method not implemented.');
  }
}
