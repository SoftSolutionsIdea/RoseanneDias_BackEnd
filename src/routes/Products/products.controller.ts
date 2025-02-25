import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/createProducts.dto';
import { updateProductsDto } from './dto/updateProducts.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('register')
  async create(@Body() createProductsDto: CreateProductsDto) {
    const produto = await this.productsService.createProducts(createProductsDto);
    return { message: 'Produto cadastrado com sucesso!', produto };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductsDto: updateProductsDto) {
    const produto = await this.productsService.updateProducts(id, updateProductsDto);
    return { message: 'Produto atualizado com sucesso!', produto };
  }

  @Patch(':id/toggle')
  async toggleProductStatus(@Param('id') id: string) {
    const { message, product } = await this.productsService.toggleProudctStatus(id);
    return { message, product };
  }

  @Get('ativos')
  async getProdutosAtivos() {
    return this.productsService.getProductAtivos();
  }

  @Get()
  async getAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get()
  async getProduct(@Param('id') id: string) {
    return this.productsService.findProduct(id);
  }

  @Get('search')
  async search(@Query('q') query: string) {
    if (!query) return [];
    return this.productsService.SearchProducts(query);
  }

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- PARA TESTES -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const produto = await this.productsService.deleteProduct(id);
    return { message: 'Produto deletado com sucesso!', produto };
  }
}
