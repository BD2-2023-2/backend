import { Module } from '@nestjs/common';
import { CreateFornecedorController } from './controllers/create-fornecedor.controller';
import { CreateFornecedorUseCase } from 'src/domain/cafeteria/application/use-cases/create-fornecedor.use-case';
import { FetchFornecedoresController } from './controllers/fetch-fornecedores.controller';
import { FetchFornecedoresUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-fornecedores.use-case';
import { VenderProdutoUseCase } from 'src/domain/cafeteria/application/use-cases/vender-produto.use-case';
import { VenderProdutosController } from './controllers/vender-produtos.controller';

@Module({
  imports: [],
  controllers: [
    CreateFornecedorController,
    FetchFornecedoresController,
    VenderProdutosController,
  ],
  providers: [
    CreateFornecedorUseCase,
    FetchFornecedoresUseCase,
    VenderProdutoUseCase,
  ],
})
export class HttpModule {}
