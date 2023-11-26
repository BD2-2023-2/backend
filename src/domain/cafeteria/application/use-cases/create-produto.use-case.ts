import { Injectable } from '@nestjs/common';
import { Produto } from '../../enterprise/entities/produto';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { PrismaClient } from '@prisma/client';
import { PrismaProdutoMapper } from 'src/infra/database/prisma/mappers/prisma-produto.mapper';
import { DatabaseLogin } from 'src/core/types/database-login';

export type CreateProdutoUseCaseRequest = {
  login: DatabaseLogin;
  descricao: string;
  fotoUrl: string;
  idFornecedor: number;
  valor: number;
  quantidade: number;
};

export type CreateProdutoUseCaseResponse = {
  produto: Produto;
};

@Injectable()
export class CreateProdutoUseCase {
  private prisma: PrismaClient;

  async execute(
    request: CreateProdutoUseCaseRequest,
  ): Promise<CreateProdutoUseCaseResponse> {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: `postgresql://${request.login.user}:${request.login.password}@ep-patient-scene-74775108-pooler.us-east-2.aws.neon.tech/ecom?sslmode=require&pgbouncer=true&connect_timeout=10`,
        },
      },
    });

    const produto = Produto.create({
      ...request,
      idFornecedor: UniqueEntityId.createFromInt(BigInt(request.idFornecedor)),
    });

    const data = PrismaProdutoMapper.toPrisma(produto);

    const prismaProduto = await this.prisma.produtos.create({ data });

    await this.prisma.$disconnect();

    return { produto: PrismaProdutoMapper.toDomain(prismaProduto) };
  }
}
