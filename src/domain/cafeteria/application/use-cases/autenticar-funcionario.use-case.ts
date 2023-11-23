import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

export type AutenticarFuncionarioUseCaseRequest = {
  user: string;
  password: string;
};

export type AutenticarFuncionarioUseCaseResponse = {
  token: string;
};

@Injectable()
export class AutenticarFuncionarioUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    data: AutenticarFuncionarioUseCaseRequest,
  ): Promise<AutenticarFuncionarioUseCaseResponse> {
    const funcionario = await this.prisma.funcionarios.findFirst({
      where: { nome: data.user },
    });
    if (!funcionario || funcionario.senha !== data.password)
      throw new Error('Usuário ou senha inválido!');

    return { token: randomUUID() };
  }
}
