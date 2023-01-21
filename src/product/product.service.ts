import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private repo: ProductRepository) {}
  async getProduct() {
    return this.repo.find();
  }
}
