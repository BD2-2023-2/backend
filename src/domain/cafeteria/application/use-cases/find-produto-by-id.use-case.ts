// import { Injectable } from '@nestjs/common';
// import { Produto } from '../../enterprise/entities/produto';
// import { ProdutosRepository } from '../repositories/produtos.repository';
// import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error';

// export type FindProdutoByIdUseCaseRequest = {
//   id: number;
// };

// export type FindProdutoByIdUseCaseResponse = {
//   produto: Produto;
// };

// @Injectable()
// export class FindProdutoByIdUseCase {
//   // constructor(private readonly produtosRepository: ProdutosRepository) {}

//   async execute({
//     id,
//   }: FindProdutoByIdUseCaseRequest): Promise<FindProdutoByIdUseCaseResponse> {
//     const produto = await this.produtosRepository.findByid(id);
//     if (!produto)
//       throw new ResourceNotFoundError(`Produto ${id} não encontrado!`);

//     return { produto };
//   }
// }
