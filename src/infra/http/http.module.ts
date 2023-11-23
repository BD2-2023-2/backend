import { Module } from '@nestjs/common';
import { FetchProdutosUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-produtos.use-case';
import { FetchProdutosController } from './controllers/fetch-produtos.controller';
import { CreateProdutoUseCase } from 'src/domain/cafeteria/application/use-cases/create-produto.use-case';
import { CreateProdutoController } from './controllers/create-produto.controller';
import { AutenticarFuncionarioController } from './controllers/autenticar-funcionario.controller';
import { AutenticarFuncionarioUseCase } from 'src/domain/cafeteria/application/use-cases/autenticar-funcionario.use-case';

@Module({
  imports: [],
  controllers: [
    // CreateFornecedorController,
    // FetchFornecedoresController,
    // VenderProdutosController,
    FetchProdutosController,
    // FindProdutoByIdController,
    CreateProdutoController,
    AutenticarFuncionarioController,
  ],
  providers: [
    // CreateFornecedorUseCase,
    // FetchFornecedoresUseCase,
    // RealizarVendaUseCase,
    FetchProdutosUseCase,
    // FindProdutoByIdUseCase,
    CreateProdutoUseCase,
    AutenticarFuncionarioUseCase,
  ],
})
export class HttpModule {}
