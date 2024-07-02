import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    // return this.brands;
    return this.brandRepo.find();
  }

  findOne(id: number) {
    // const product = this.brands.find((item) => item.id === id);

    const brand = this.brandRepo.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    // this.counterId = this.counterId + 1;
    // const newBrand = {
    //   id: this.counterId,
    //   ...data,
    // };
    // this.brands.push(newBrand);
    // return newBrand;

    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne(id);

    this.brandRepo.merge(brand, changes);
    return this.brandRepo.save(brand);

    // const index = this.brands.findIndex((item) => item.id === id);
    // this.brands[index] = {
    //   ...brand,
    //   ...changes,
    // };
    // return this.brands[index];
  }

  remove(id: number) {
    // const index = this.brands.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new NotFoundException(`Brand #${id} not found`);
    // }
    // this.brands.splice(index, 1);
    // return true;

    if (this.brandRepo.findOne()) return this.brandRepo.delete(id);
  }
}
