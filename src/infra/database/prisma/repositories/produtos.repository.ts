import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProdutosRepository } from 'src/domain/cafeteria/application/repositories/produtos.repository';
import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

@Injectable()
export class PrismaProdutosRepository implements ProdutosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByid(id: number): Promise<Produto> {
    const produto = await this.prisma.produtos.findFirst({ where: { id } });

    return Produto.create(
      {
        descricao: produto.descricao,
        idFornecedor: UniqueEntityId.createFromInt(produto.id_fornecedor),
        quantidade: produto.quantidade,
        valor: Number(produto.valor),
      },
      UniqueEntityId.createFromInt(produto.id),
    );
  }
}
