import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto'; // DTO for updating

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a category
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      // Check for an existing category with the same name
      const existingCategory = await this.prisma.category.findUnique({
        where: { name: createCategoryDto.name }, // Assuming 'name' is unique
      });

      if (existingCategory) {
        throw new ConflictException('Category with this name already exists');
      }

      // Create the category if it doesn't exist
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
        throw new NotFoundException(`Category with ID ${id} not found`);
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
      // Check if the category exists
      const category = await this.prisma.category.findUnique({
        where: { id },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      // Update the category
      return await this.prisma.category.update({
        where: { id },
        data: {
          name: updateCategoryDto.name,
          description: updateCategoryDto.description, // Optional
          type: updateCategoryDto.type, // Required
        },
      });
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
      return { message: 'Category successfully deleted' };
    } catch (error) {
      throw new NotFoundException(
        `Error deleting category with ID ${id}: ${error.message}`,
      );
    }
  }
}
