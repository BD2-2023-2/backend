import { Injectable } from '@nestjs/common';
import { ProdutosRepository } from '../repositories/produtos.repository';
import { Produto } from '../../enterprise/entities/produto';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export type CreateProdutoUseCaseRequest = {
  descricao: string;
  fotoUrl: string;
  idFornecedor: number;
  valor: number;
  quantidade: number;
};

@Injectable()
export class CreateProdutoUseCase {
  constructor(private readonly produtosRepository: ProdutosRepository) {}

  async execute(data: CreateProdutoUseCaseRequest): Promise<void> {
    const produto = Produto.create({
      ...data,
      idFornecedor: UniqueEntityId.createFromInt(BigInt(data.idFornecedor)),
    });

    await this.produtosRepository.create(produto);
  }
}
