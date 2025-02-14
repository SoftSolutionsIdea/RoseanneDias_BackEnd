import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
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

  @Patch(':id/toggle')
  async toggleProductStatus(@Param('id') id: string, @Res() res: Response) {
    try {
      const { message, product } =
        await this.productsService.toggleProudctStatus(id)
      return res.status(200).send({ message, product })
    } catch (error) {
      return res.status(error.status || 500).send({ error: error.message })
    }
  }

  @Get('ativos')
  async getProdutosAtivos(@Res() res: Response) {
    try {
      const produtos = await this.productsService.getProductAtivos()
      return res.status(HttpStatus.OK).send(produtos)
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: error.message })
    }
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
