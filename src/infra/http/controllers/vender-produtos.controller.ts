import { Body, Controller, Post } from '@nestjs/common';
import {
  VenderProdutoUseCase,
  VenderProdutoUseCaseRequest,
} from 'src/domain/cafeteria/application/use-cases/vender-produto.use-case';

@Controller('vendas')
export class VenderProdutosController {
  constructor(private readonly venderProdutosUseCase: VenderProdutoUseCase) {}

  @Post()
  async handle(@Body() data: VenderProdutoUseCaseRequest) {
    await this.venderProdutosUseCase.execute(data);
  }
}
