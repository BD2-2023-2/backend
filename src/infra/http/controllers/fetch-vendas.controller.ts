import { BadRequestException, Controller, Get, Headers } from '@nestjs/common';
import { FetchVendasUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-vendas.use-case';
import { VendaPresenter } from '../presenters/venda.presenter';

@Controller('vendas')
export class FetchVendasController {
  constructor(private readonly fetchVendasUseCase: FetchVendasUseCase) {}

  @Get()
  async handle(
    @Headers('user') user: string,
    @Headers('password') password: string,
  ) {
    try {
      const { vendas } = await this.fetchVendasUseCase.execute({
        login: { user, password },
      });

      return { data: vendas.map(VendaPresenter.toHttp) };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
