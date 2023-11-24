import { Injectable } from '@nestjs/common';
import { Produto } from '../../enterprise/entities/produto';
import { PrismaClient } from '@prisma/client';
import { PrismaProdutoMapper } from 'src/infra/database/prisma/mappers/prisma-produto.mapper';
import { DatabaseLogin } from 'src/core/types/database-login';

export type FetchProdutosUseCaseResponse = {
  produtos: Produto[];
};

@Injectable()
export class FetchProdutosUseCase {
  private prisma: PrismaClient;

  async execute(login: DatabaseLogin): Promise<FetchProdutosUseCaseResponse> {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: `${process.env.SOURCE}${login.user}:${login.password}${process.env.HOST}`,
        },
      },
    });

    const produtos = await this.prisma.produtos.findMany();

    this.prisma.$disconnect();

    return { produtos: produtos.map(PrismaProdutoMapper.toDomain) };
  }
}
