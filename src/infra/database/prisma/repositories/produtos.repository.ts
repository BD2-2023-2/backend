import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProdutosRepository } from 'src/domain/cafeteria/application/repositories/produtos.repository';
import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { PrismaProdutoMapper } from '../mappers/prisma-produto.mapper';

@Injectable()
export class PrismaProdutosRepository implements ProdutosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Produto): Promise<void> {
    const data = PrismaProdutoMapper.toPrisma(entity);

    await this.prisma.produtos.create({ data });
  }

  async fetch(): Promise<Produto[]> {
    const produtos = await this.prisma.produtos.findMany();

    return produtos.map(PrismaProdutoMapper.toDomain);
  }

  async findByid(id: number): Promise<Produto> {
    const produto = await this.prisma.produtos.findFirst({ where: { id } });
    if (!produto) return null;

    return PrismaProdutoMapper.toDomain(produto);
  }

  async save(entity: Produto): Promise<void> {
    const data = PrismaProdutoMapper.toPrismaUpdate(entity);

    await this.prisma.produtos.update({ where: { id: entity.id.value }, data });
  }
}
