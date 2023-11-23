import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
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
    @Body() data: CreateProdutoUseCaseRequest,
  ) {
    try {
      this.createProdutoUseCase = new CreateProdutoUseCase();

      await this.createProdutoUseCase.execute({
        login: { user, password },
        ...data,
      });

      return { message: 'Produto cadastrado com sucesso!' };
    } catch (err) {
      throw new BadRequestException(`${err.code} - ${err.message}`);
    }
  }
}
