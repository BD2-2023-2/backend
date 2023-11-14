import { Module } from '@nestjs/common';
import { CreateFornecedorController } from './controllers/create-fornecedor.controller';
import { CreateFornecedorUseCase } from 'src/domain/cafeteria/application/use-cases/create-fornecedor.use-case';
import { FetchFornecedoresController } from './controllers/fetch-fornecedores.controller';
import { FetchFornecedoresUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-fornecedores.use-case';

@Module({
  imports: [],
  controllers: [CreateFornecedorController, FetchFornecedoresController],
  providers: [CreateFornecedorUseCase, FetchFornecedoresUseCase],
})
export class HttpModule {}
