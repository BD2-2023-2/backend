import { Injectable } from '@nestjs/common';
import { Produto } from '../../enterprise/entities/produto';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { PrismaClient } from '@prisma/client';
import { PrismaProdutoMapper } from 'src/infra/database/prisma/mappers/prisma-produto.mapper';

export type CreateProdutoUseCaseRequest = {
  login: {
    user: string;
    password: string;
  };
  descricao: string;
  fotoUrl: string;
  idFornecedor: number;
  valor: number;
  quantidade: number;
};

@Injectable()
export class CreateProdutoUseCase {
  private prisma: PrismaClient;

  async execute(request: CreateProdutoUseCaseRequest): Promise<void> {
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

    await this.prisma.produtos.create({ data });
  }
}
