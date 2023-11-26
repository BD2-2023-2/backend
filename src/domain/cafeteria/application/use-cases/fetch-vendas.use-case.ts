import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseLogin } from 'src/core/types/database-login';
import { Venda } from '../../enterprise/entities/venda';
import { PrismaVendaMapper } from 'src/infra/database/prisma/mappers/prisma-venda.mapper';

export type FetchVendasUseCaseRequest = {
  login: DatabaseLogin;
};

export type FetchVendasUseCaseResponse = {
  vendas: Venda[];
};

@Injectable()
export class FetchVendasUseCase {
  private prisma: PrismaClient;

  async execute({
    login,
  }: FetchVendasUseCaseRequest): Promise<FetchVendasUseCaseResponse> {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: `postgresql://${login.user}:${login.password}@ep-patient-scene-74775108-pooler.us-east-2.aws.neon.tech/ecom?sslmode=require&pgbouncer=true&connect_timeout=10`,
        },
      },
    });

    const vendas = await this.prisma.vendas.findMany();

    return { vendas: vendas.map(PrismaVendaMapper.toDomain) };
  }
}
