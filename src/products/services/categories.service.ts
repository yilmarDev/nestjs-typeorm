import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    // const category = this.categories.find((item) => item.id === id);
    // if (!category) {
    //   throw new NotFoundException(`Category #${id} not found`);
    // }
    // return category;

    const category = await this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    // this.counterId = this.counterId + 1;
    // const newCategory = {
    //   id: this.counterId,
    //   ...data,
    // };
    // this.categories.push(newCategory);
    // return newCategory;

    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    // const category = this.findOne(id);
    // const index = this.categories.findIndex((item) => item.id === id);
    // this.categories[index] = {
    //   ...category,
    //   ...changes,
    // };
    // return this.categories[index];

    const category = await this.categoryRepo.findOne(id);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  remove(id: number) {
    //   const index = this.categories.findIndex((item) => item.id === id);
    //   if (index === -1) {
    //     throw new NotFoundException(`Category #${id} not found`);
    //   }
    //   this.categories.splice(index, 1);
    //   return true;

    if (this.categoryRepo.findOne(id)) return this.categoryRepo.delete(id);
  }
}
