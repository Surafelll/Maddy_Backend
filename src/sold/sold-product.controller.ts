import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SoldProductService } from './sold-product.service';

@Controller('sold-products')
export class SoldProductController {
  constructor(private readonly soldProductService: SoldProductService) {}

  // POST method to record sales
  @Post('sell')
  async recordSale(
    @Body() saleData: { sales: { productId: number; quantity: number }[] },
  ) {
    return this.soldProductService.sellProducts(saleData.sales);
  }

  // GET method to fetch all sold products with optional filters
  @Get()
  async getSoldProducts(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('category') category: string,
    @Query('search') search: string,
    @Query('minQuantity') minQuantity: number,
  ) {
    const filters = {
      startDate,
      endDate,
      category,
      search,
      minQuantity: minQuantity ? parseInt(minQuantity.toString()) : undefined,
    };

    return this.soldProductService.getSoldProducts(filters);
  }
}
