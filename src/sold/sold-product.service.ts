import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path based on your project structure

@Injectable()
export class SoldProductService {
  constructor(private prisma: PrismaService) {}

  // Method to sell multiple products and record the sale
  async sellProducts(salesData: { productId: number; quantity: number }[]) {
    const soldProducts = [];

    for (const { productId, quantity } of salesData) {
      // Find the product, including its category for storing category name
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
        include: {
          category: true, // Include the category data for saving the category name
        },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      if (product.quantity < quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}`,
        );
      }

      // Calculate total sale amount
      const totalAmount = product.price * quantity;

      // Update product quantity after sale
      await this.prisma.product.update({
        where: { id: productId },
        data: {
          quantity: { decrement: quantity },
        },
      });

      // Record the sale, including category and image URL
      const soldProduct = await this.prisma.soldProduct.create({
        data: {
          productId,
          productName: product.name,
          categoryName: product.category.name, // Save the category name
          imageUrl: product.imageUrl, // Save the product image URL
          quantity,
          price: product.price,
          totalAmount,
          soldAt: new Date(),
        },
      });

      soldProducts.push(soldProduct);
    }

    return soldProducts;
  }

  // Method to get all sold products from the database
  async getSoldProducts() {
    return this.prisma.soldProduct.findMany({
      orderBy: {
        soldAt: 'desc', // Sort by the sale date, latest first
      },
    });
  }
}
