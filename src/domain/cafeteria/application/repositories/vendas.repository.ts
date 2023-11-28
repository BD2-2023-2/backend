import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Venda } from '../../enterprise/entities/venda';
import { ItemVenda } from '../../enterprise/entities/item-venda';

export type findByIdDomainResponse = {
  venda: Venda;
  items: ItemVenda[];
};

export abstract class VendasRepository {
  abstract create(entity: Venda): Promise<UniqueEntityId>;
  abstract fetch(): Promise<Venda[]>;
  abstract findById(id: bigint): Promise<findByIdDomainResponse>;
}
