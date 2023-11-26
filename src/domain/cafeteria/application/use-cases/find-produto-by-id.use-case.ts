import { Injectable } from '@nestjs/common';
import { Produto } from '../../enterprise/entities/produto';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error';
import { PrismaClient } from '@prisma/client';
import { DatabaseLogin } from 'src/core/types/database-login';
import { PrismaProdutoMapper } from 'src/infra/database/prisma/mappers/prisma-produto.mapper';

export type FindProdutoByIdUseCaseRequest = {
  login: DatabaseLogin;
  id: number;
};

export type FindProdutoByIdUseCaseResponse = {
  produto: Produto;
};

@Injectable()
export class FindProdutoByIdUseCase {
  private prisma: PrismaClient;
  async execute({
    id,
    login,
  }: FindProdutoByIdUseCaseRequest): Promise<FindProdutoByIdUseCaseResponse> {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: `${process.env.SOURCE}${login.user}:${login.password}${process.env.HOST}`,
        },
      },
    });
    const produto = await this.prisma.produtos.findFirst({ where: { id } });
    if (!produto)
      throw new ResourceNotFoundError(`Produto ${id} não encontrado!`);

    await this.prisma.$disconnect();

    return { produto: PrismaProdutoMapper.toDomain(produto) };
  }
}
