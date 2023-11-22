import { Module } from '@nestjs/common';
import { FetchProdutosUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-produtos.use-case';
import { FetchProdutosController } from './controllers/fetch-produtos.controller';
import { CreateProdutoUseCase } from 'src/domain/cafeteria/application/use-cases/create-produto.use-case';
import { CreateProdutoController } from './controllers/create-produto.controller';

@Module({
  imports: [],
  controllers: [
    // CreateFornecedorController,
    // FetchFornecedoresController,
    // VenderProdutosController,
    FetchProdutosController,
    // FindProdutoByIdController,
    CreateProdutoController,
  ],
  providers: [
    // CreateFornecedorUseCase,
    // FetchFornecedoresUseCase,
    // RealizarVendaUseCase,
    FetchProdutosUseCase,
    // FindProdutoByIdUseCase,
    CreateProdutoUseCase,
  ],
})
export class HttpModule {}
