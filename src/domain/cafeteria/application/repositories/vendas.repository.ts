import { Venda } from '../../enterprise/entities/venda';

export abstract class VendasRepository {
  abstract create(entity: Venda): Promise<void>;
  abstract fetch(): Promise<Venda[]>;
}
