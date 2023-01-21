import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}
  @Get()
  async get() {
    return this.service.getProduct();
  }
}
