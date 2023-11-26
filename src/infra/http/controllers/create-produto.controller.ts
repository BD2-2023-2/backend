import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateProdutoUseCase,
  CreateProdutoUseCaseRequest,
} from 'src/domain/cafeteria/application/use-cases/create-produto.use-case';

@Controller('produtos')
export class CreateProdutoController {
  private createProdutoUseCase: CreateProdutoUseCase;
  constructor() {}

  @Post()
  async handle(
    @Headers('user') user: string,
    @Headers('password') password: string,
    @Body(new ValidationPipe({ transform: true }))
    data: CreateProdutoUseCaseRequest,
  ) {
    try {
      this.createProdutoUseCase = new CreateProdutoUseCase();

      const { produto } = await this.createProdutoUseCase.execute({
        login: { user, password },
        ...data,
      });

      return {
        data: { id: Number(produto.id.value) },
        message: 'Produto cadastrado com sucesso!',
      };
    } catch (err) {
      throw new BadRequestException(`${err.code} - ${err.message}`);
    }
  }
}
