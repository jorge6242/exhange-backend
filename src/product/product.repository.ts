import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CustomRepository } from 'src/config/typeorm-ex.decorator';

@CustomRepository(Product)
export class ProductRepository extends Repository<Product> {}
