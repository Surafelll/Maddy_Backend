import { Controller, Post, Body, Get } from '@nestjs/common';
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

  // GET method to fetch all sold products
  @Get()
  async getSoldProducts() {
    return this.soldProductService.getSoldProducts();
  }
}
