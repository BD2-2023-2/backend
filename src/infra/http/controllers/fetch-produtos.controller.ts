import { Controller, Get } from '@nestjs/common';
import { FetchProdutosUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-produtos.use-case';
import { ProdutoPresenter } from '../presenters/produto.presenter';

@Controller('produtos1')
export class FetchProdutosController {
  constructor(private readonly fetchProdutosUseCase: FetchProdutosUseCase) {}

  @Get()
  async handle() {
    const { produtos } = await this.fetchProdutosUseCase.execute();

    return { data: produtos.map(ProdutoPresenter.toHttp) };
  }
}
