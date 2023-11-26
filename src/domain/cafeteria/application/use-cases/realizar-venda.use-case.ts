import { Injectable } from '@nestjs/common';
import { ItemVenda } from '../../enterprise/entities/item-venda';
import { Venda } from '../../enterprise/entities/venda';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { PrismaClient } from '@prisma/client';
import { DatabaseLogin } from 'src/core/types/database-login';

export type RealizarVendaUseCaseRequest = {
  login: DatabaseLogin;
  produtos: {
    id: number;
    quantidade: number;
    descricao: string;
    valor: number;
  }[];
  idFuncionario: number;
};

@Injectable()
export class RealizarVendaUseCase {
  private prisma: PrismaClient;

  async execute({
    login,
    produtos,
    idFuncionario,
  }: RealizarVendaUseCaseRequest): Promise<void> {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: `${process.env.SOURCE}${login.user}:${login.password}${process.env.HOST}`,
        },
      },
    });

    const venda = Venda.create({
      idFuncionario: UniqueEntityId.createFromInt(BigInt(idFuncionario)),
      valorTotal: 0,
    });

    const items = produtos.map((produto) => {
      return ItemVenda.create({
        idProduto: UniqueEntityId.createFromInt(BigInt(produto.id)),
        idVenda: venda.id,
        quantidade: produto.quantidade,
        valor: produto.valor,
      });
    });

    await this.prisma.$executeRaw`select inserir_venda(id_funcionario := ${
      venda.idFuncionario.value
    }::bigint, items_venda := array [${items.map(
      (item) => `(${item.idProduto.value}, ${item.valor}, ${item.quantidade})`,
    )}]::item_venda[]);`;

    await this.prisma.$disconnect();
  }
}
