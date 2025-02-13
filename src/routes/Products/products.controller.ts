import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductsDto } from './dto/createProducts.dto'
import { updateProductsDto } from './dto/updateProducts.dto'
import { Response } from 'express'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('register')
  async create(
    @Body() createProductsDto: CreateProductsDto,
    @Res() res: Response,
  ) {
    return res.json({
      message: 'Produto cadastrado com sucesso!',
      Produto: await this.productsService.createProducts(createProductsDto),
    })
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductsDto: updateProductsDto,
    @Res() res: Response,
  ) {
    return res.json({
      message: 'Produto atualizado com sucesso!',
      Produto: await this.productsService.updateProducts(id, updateProductsDto),
    })
  }

  @Get()
  async getAllProducts() {
    return this.productsService.findAllProducts()
  }

  @Get('Search') 
    async Search(@Query('q') query: string ) {
      if (!query) return []
      return this.productsService.SearchProducts(query)
    }


  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- PARA TESTES -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Res() res: Response) {
    return res.json({
      message: 'Produto deletado com sucesso!',
      Produto: await this.productsService.deleteProduct(id),
    })
  }
}
