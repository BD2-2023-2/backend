import { funcionarios as PrismaFuncionario } from '@prisma/client';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Funcionario } from 'src/domain/cafeteria/enterprise/entities/funcionario';

export class PrismaFuncionarioMapper {
  static toDomain(raw: PrismaFuncionario): Funcionario {
    return Funcionario.create(
      {
        cpf: raw.cpf,
        funcao: raw.funcao,
        senha: raw.senha,
        nome: raw.nome,
      },
      UniqueEntityId.createFromInt(raw.id),
    );
  }
}
