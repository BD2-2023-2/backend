import { Injectable } from '@nestjs/common';
import { ProdutosRepository } from '../repositories/produtos.repository';
import { VendasRepository } from '../repositories/vendas.repository';
import { ItensVendaRepository } from '../repositories/itens-venda.repository';
import { ItemVenda } from '../../enterprise/entities/item-venda';
import { Venda } from '../../enterprise/entities/venda';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { sumArray } from 'src/core/helpers/sum-array';

export type RealizarVendaUseCaseRequest = {
  produtos: {
    id: number;
    quantidade: number;
    descricao: string;
    valor: number;
  }[];
  idFuncionario: number;
};

@Injectable()
export class RealizarVendaUseCase {
  constructor(
    private readonly produtosRepository: ProdutosRepository,
    private readonly itensVendaRepository: ItensVendaRepository,
    private readonly vendasRepository: VendasRepository,
  ) {}

  async execute({
    produtos,
    idFuncionario,
  }: RealizarVendaUseCaseRequest): Promise<void> {
    const venda = Venda.create({
      idFuncionario: UniqueEntityId.createFromInt(BigInt(idFuncionario)),
      valorTotal: 0,
    });

    const items = produtos.map((produto) => {
      return ItemVenda.create({
        idProduto: UniqueEntityId.createFromInt(BigInt(produto.id)),
        idVenda: venda.id,
        quantidade: produto.quantidade,
        valor: produto.valor,
      });
    });

    const valorTotalPorItem = items.map((item) => item.valor * item.quantidade);
    const valorTotalVenda = sumArray(valorTotalPorItem);

    venda.valorTotal = valorTotalVenda;

    const idVenda = await this.vendasRepository.create(venda);

    items.forEach(async (item) => {
      item.idVenda = idVenda;
      await this.itensVendaRepository.create(item);

      const produto = await this.produtosRepository.findByid(
        Number(item.idProduto.value),
      );

      produto.registrarSaidaEstoque(item.quantidade);

      await this.produtosRepository.save(produto);
    });
  }
}
