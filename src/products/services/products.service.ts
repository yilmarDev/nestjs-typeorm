import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    /** Manual way */
    // const newProduct = new Product();
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;

    /** Dynamic way */
    const newProduct = this.productRepo.create(data);

    /** Saving the new product */
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);

    // const index = this.products.findIndex((item) => item.id === id);
    // this.products[index] = {
    //   ...product,
    //   ...changes,
    // };
    // return this.products[index];
  }

  remove(id: number) {
    if (this.productRepo.findOne) return this.productRepo.delete(id);

    // const index = this.products.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new NotFoundException(`Product #${id} not found`);
    // }
    // this.products.splice(index, 1);
    // return true;
  }
}
