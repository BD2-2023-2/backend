import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { FornecedoresRepository } from 'src/domain/cafeteria/application/repositories/vendedores.repository';
import { PrismaFornecedoresRepository } from './prisma/repositories/fornecedores.repository';
import { ItensVendaRepository } from 'src/domain/cafeteria/application/repositories/itens-venda.repository';
import { PrismaItensVendaRepository } from './prisma/repositories/itens-venda.repository';
import { VendasRepository } from 'src/domain/cafeteria/application/repositories/vendas.repository';
import { PrismaVendasRepository } from './prisma/repositories/vendas.repository';
import { ProdutosRepository } from 'src/domain/cafeteria/application/repositories/produtos.repository';
import { PrismaProdutosRepository } from './prisma/repositories/produtos.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: FornecedoresRepository, useClass: PrismaFornecedoresRepository },
    { provide: ItensVendaRepository, useClass: PrismaItensVendaRepository },
    { provide: VendasRepository, useClass: PrismaVendasRepository },
    { provide: ProdutosRepository, useClass: PrismaProdutosRepository },
  ],
  exports: [
    PrismaService,
    FornecedoresRepository,
    ItensVendaRepository,
    VendasRepository,
    ProdutosRepository,
  ],
})
export class DatabaseModule {}
