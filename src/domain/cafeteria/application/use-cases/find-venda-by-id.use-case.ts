import { Injectable } from '@nestjs/common';
import { DatabaseLogin } from 'src/core/types/database-login';
import { Venda } from '../../enterprise/entities/venda';
import { ItemVenda } from '../../enterprise/entities/item-venda';
import { PrismaClient } from '@prisma/client';
import { PrismaItensVendaMapper } from 'src/infra/database/prisma/mappers/prisma-itens-venda.mapper';
import { PrismaVendaMapper } from 'src/infra/database/prisma/mappers/prisma-venda.mapper';
import { Funcionario } from '../../enterprise/entities/funcionario';
import { PrismaFuncionarioMapper } from 'src/infra/database/prisma/mappers/prisma-funcionario.mapper';

export type FindVendaByIdUseCaseRequest = {
  login: DatabaseLogin;
  idVenda: number;
};

export type FindVendaByIdUseCaseResponse = {
  venda: Venda;
  items: ItemVenda[];
  funcionario: Funcionario;
};

@Injectable()
export class FindVendaByIdUseCase {
  private prisma: PrismaClient;

  async execute({ login, idVenda }: FindVendaByIdUseCaseRequest) {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: `${process.env.SOURCE}${login.user}:${login.password}${process.env.HOST}`,
        },
      },
    });

    const venda = await this.prisma.vendas.findFirst({
      where: { id: BigInt(idVenda) },
    });
    const items = await this.prisma.itens.findMany({
      where: { id_venda: BigInt(idVenda) },
    });
    const funcionario = await this.prisma.funcionarios.findFirst({
      where: { id: BigInt(venda.id_funcionario) },
    });

    return {
      venda: PrismaVendaMapper.toDomain(venda),
      items: items.map(PrismaItensVendaMapper.toDomain),
      funcionario: PrismaFuncionarioMapper.toDomain(funcionario),
    };
  }
}
