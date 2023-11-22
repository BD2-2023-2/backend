import { Controller, Get, Headers } from '@nestjs/common';
import { FetchProdutosUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-produtos.use-case';
import { ProdutoPresenter } from '../presenters/produto.presenter';

@Controller('produtos')
export class FetchProdutosController {
  constructor(private readonly fetchProdutosUseCase: FetchProdutosUseCase) {}

  @Get()
  async handle(
    @Headers('user') user: string,
    @Headers('password') password: string,
  ) {
    const { produtos } = await this.fetchProdutosUseCase.execute({
      user,
      password,
    });

    return { data: produtos.map(ProdutoPresenter.toHttp) };
  }
}
