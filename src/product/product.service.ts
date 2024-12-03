import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new product
  async create(createProductDto: CreateProductDto) {
    const { name, expiryDate, ...rest } = createProductDto;

    // Check if the product already exists by name
    const existingProduct = await this.prisma.product.findUnique({
      where: { name },
    });

    if (existingProduct) {
      throw new ConflictException(
        `Product with name "${name}" already exists.`,
      );
    }

    try {
      const product = await this.prisma.product.create({
        data: {
          ...rest,
          name,
          expiryDate: expiryDate ? new Date(expiryDate) : null,
        },
      });
      return product;
    } catch (error) {
      throw new BadRequestException('Failed to create product', error.message);
    }
  }

  // Retrieve all products
  async getAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  // Retrieve a product by its ID
  async getById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  // Update an existing product
  async update(id: number, updateProductDto: UpdateProductDto) {
    const { expiryDate, ...rest } = updateProductDto;

    // Check if the product exists
    const productExists = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!productExists) {
      throw new NotFoundException(`Product with ID ${id} does not exist.`);
    }

    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          ...rest,
          expiryDate: expiryDate ? new Date(expiryDate) : undefined,
        },
      });
      return updatedProduct;
    } catch (error) {
      throw new BadRequestException('Failed to update product', error.message);
    }
  }

  // Delete a product by its ID
  async delete(id: number) {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
      return { message: 'Product successfully deleted.' };
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
  }
}
