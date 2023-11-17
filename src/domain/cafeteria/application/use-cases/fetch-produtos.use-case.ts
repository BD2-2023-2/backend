import { Injectable } from '@nestjs/common';
import { ProdutosRepository } from '../repositories/produtos.repository';
import { Produto } from '../../enterprise/entities/produto';

export type FetchProdutosUseCaseResponse = {
  produtos: Produto[];
};

@Injectable()
export class FetchProdutosUseCase {
  constructor(private readonly produtosRepository: ProdutosRepository) {}

  async execute(): Promise<FetchProdutosUseCaseResponse> {
    const produtos = await this.produtosRepository.fetch();

    return { produtos };
  }
}
