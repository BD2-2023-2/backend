import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { FornecedoresRepository } from 'src/domain/cafeteria/application/repositories/vendedores.repository';
import { PrismaFornecedoresRepository } from './prisma/repositories/fornecedores.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: FornecedoresRepository, useClass: PrismaFornecedoresRepository },
  ],
  exports: [FornecedoresRepository],
})
export class DatabaseModule {}
