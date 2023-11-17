import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  CreateProdutoUseCase,
  CreateProdutoUseCaseRequest,
} from 'src/domain/cafeteria/application/use-cases/create-produto.use-case';

@Controller('produtos')
export class CreateProdutoController {
  constructor(private readonly createProdutoUseCase: CreateProdutoUseCase) {}

  @Post()
  async handle(@Body() data: CreateProdutoUseCaseRequest) {
    try {
      await this.createProdutoUseCase.execute(data);

      return { message: 'Produto cadastrado com sucesso!' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
