import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseLogin } from 'src/core/types/database-login';
import { Venda } from '../../enterprise/entities/venda';
import { PrismaVendaMapper } from 'src/infra/database/prisma/mappers/prisma-venda.mapper';
import { Funcionario } from '../../enterprise/entities/funcionario';
import { PrismaFuncionarioMapper } from 'src/infra/database/prisma/mappers/prisma-funcionario.mapper';

export type FetchVendasUseCaseRequest = {
  login: DatabaseLogin;
};

export type FetchVendasUseCaseResponse = {
  data: {
    venda: Venda;
    funcionario: Funcionario;
  }[];
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
    const funcionarios = await this.prisma.funcionarios.findMany();

    const data = vendas.map((venda) => {
      return {
        venda: PrismaVendaMapper.toDomain(venda),
        funcionario: PrismaFuncionarioMapper.toDomain(
          funcionarios.find(
            (funcionario) => funcionario.id === venda.id_funcionario,
          ),
        ),
      };
    });

    return { data };
  }
}
