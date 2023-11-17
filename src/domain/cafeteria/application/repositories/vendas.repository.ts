import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Venda } from '../../enterprise/entities/venda';

export abstract class VendasRepository {
  abstract create(entity: Venda): Promise<UniqueEntityId>;
  abstract fetch(): Promise<Venda[]>;
}
