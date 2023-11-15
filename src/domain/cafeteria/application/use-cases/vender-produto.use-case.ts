import { Injectable } from '@nestjs/common';
import { ProdutosRepository } from '../repositories/produtos.repository';
import { VendasRepository } from '../repositories/vendas.repository';
import { ItensVendaRepository } from '../repositories/itens-venda.repository';

export type VenderProdutoUseCaseRequest = {
  produtos: {
    id: number;
    quantidade: number;
  }[];
  idFuncionario: number;
};

@Injectable()
export class VenderProdutoUseCase {
  constructor(
    private readonly produtosRepository: ProdutosRepository,
    private readonly itensVendaRepository: ItensVendaRepository,
    private readonly vendasRepository: VendasRepository,
  ) {}

  async execute({
    produtos,
    idFuncionario,
  }: VenderProdutoUseCaseRequest): Promise<void> {
    console.log(produtos, idFuncionario);
  }
}
