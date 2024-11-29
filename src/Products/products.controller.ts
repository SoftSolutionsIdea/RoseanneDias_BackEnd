import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/createProducts.dto';
import { updateProductsDto } from './dto/updateProducts.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('register')
  async create(@Body() createProductsDto: CreateProductsDto) {
    return await this.productsService.createProducts(createProductsDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductsDto: updateProductsDto,
  ) {
    return await this.productsService.updateProducts(id, updateProductsDto);
  }

  @Get()
  async getAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
