import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto'; // New DTO for updating

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a category
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: {
          name: createCategoryDto.name,
          description: createCategoryDto.description, // Optional
          type: createCategoryDto.type, // Required
        },
      });
      return category;
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  // Get all categories
  async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  // Get one category by ID
  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
      });
      if (!category) {
        throw new Error(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      throw new Error(
        `Error fetching category with ID ${id}: ${error.message}`,
      );
    }
  }

  // Update a category by ID
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: {
          name: updateCategoryDto.name,
          description: updateCategoryDto.description, // Optional
          type: updateCategoryDto.type, // Required
        },
      });
      return category;
    } catch (error) {
      throw new Error(
        `Error updating category with ID ${id}: ${error.message}`,
      );
    }
  }

  // Delete a category by ID
  async remove(id: number) {
    try {
      const category = await this.prisma.category.delete({
        where: { id },
      });
      return category;
    } catch (error) {
      throw new Error(
        `Error deleting category with ID ${id}: ${error.message}`,
      );
    }
  }
}
