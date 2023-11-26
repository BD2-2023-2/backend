import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseLogin } from 'src/core/types/database-login';

export type DeleteProdutoUseCaseRequest = {
  login: DatabaseLogin;
  idProduto: number;
};

@Injectable()
export class DeleteProdutoUseCase {
  private prisma: PrismaClient;

  async execute({
    login,
    idProduto,
  }: DeleteProdutoUseCaseRequest): Promise<void> {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: `${process.env.SOURCE}${login.user}:${login.password}${process.env.HOST}`,
        },
      },
    });

    await this.prisma.produtos.delete({ where: { id: idProduto } });
  }
}
