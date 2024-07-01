import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Order {
  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'int' })
  user: User;

  @Column({ type: 'int' })
  products: Product[];
}
