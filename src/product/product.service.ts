import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new product
  async create(createProductDto: CreateProductDto) {
    try {
      // Check if the product already exists in stock by name
      const existingProduct = await this.prisma.product.findUnique({
        where: { name: createProductDto.name },
      });

      if (existingProduct) {
        throw new ConflictException('Product is already in stock');
      }

      // Ensure expiryDate is correctly formatted if provided
      const expiryDate = createProductDto.expiryDate
        ? new Date(createProductDto.expiryDate).toISOString()
        : undefined;

      const product = await this.prisma.product.create({
        data: {
          ...createProductDto,
          expiryDate, // Format expiryDate if provided
        },
      });
      return product;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Invalid product data', error.message);
    }
  }

  // Retrieve all products
  async getAll() {
    return this.prisma.product.findMany();
  }

  // Retrieve a product by its ID
  async getById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Update an existing product
  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      // Ensure expiryDate is correctly formatted if provided
      const expiryDate = updateProductDto.expiryDate
        ? new Date(updateProductDto.expiryDate).toISOString()
        : undefined;

      const product = await this.prisma.product.update({
        where: { id },
        data: {
          ...updateProductDto,
          expiryDate, // Format expiryDate if provided
        },
      });
      return product;
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  // Delete a product by its ID
  async delete(id: number) {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
      return { message: 'Product successfully deleted' };
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
