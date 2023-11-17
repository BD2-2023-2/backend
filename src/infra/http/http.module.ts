import { Module } from '@nestjs/common';
import { CreateFornecedorController } from './controllers/create-fornecedor.controller';
import { CreateFornecedorUseCase } from 'src/domain/cafeteria/application/use-cases/create-fornecedor.use-case';
import { FetchFornecedoresController } from './controllers/fetch-fornecedores.controller';
import { FetchFornecedoresUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-fornecedores.use-case';
import { RealizarVendaUseCase } from 'src/domain/cafeteria/application/use-cases/realizar-venda.use-case';
import { VenderProdutosController } from './controllers/realizar-venda.controller';
import { FetchProdutosController } from './controllers/fetch-produtos.controller';
import { FetchProdutosUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-produtos.use-case';
import { FindProdutoByIdController } from './controllers/find-produto-by-id.controller';
import { FindProdutoByIdUseCase } from 'src/domain/cafeteria/application/use-cases/find-produto-by-id.use-case';

@Module({
  imports: [],
  controllers: [
    CreateFornecedorController,
    FetchFornecedoresController,
    VenderProdutosController,
    FetchProdutosController,
    FindProdutoByIdController,
  ],
  providers: [
    CreateFornecedorUseCase,
    FetchFornecedoresUseCase,
    RealizarVendaUseCase,
    FetchProdutosUseCase,
    FindProdutoByIdUseCase,
  ],
})
export class HttpModule {}
