import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';
import { faker } from '@faker-js/faker';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export function makeProduto(): Produto {
  return Produto.create({
    descricao: faker.word.noun(),
    idFornecedor: UniqueEntityId.create(),
    quantidade: 1,
    valor: faker.number.float(),
  });
}
