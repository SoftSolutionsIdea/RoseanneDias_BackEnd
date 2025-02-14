import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProductsDto } from './dto/createProducts.dto'
import { createOrUpdate } from 'src/common/helpers/createOrUpdate'
import { updateProductsDto } from './dto/updateProducts.dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProducts(data: CreateProductsDto) {
    const rental = await createOrUpdate(
      this.prisma.rental,
      { rental: data.rental.rental },
      { rental: data.rental.rental },
    )
    const category = await createOrUpdate(
      this.prisma.category,
      { category: data.category.category },
      { category: data.category.category },
    )
    const color = await createOrUpdate(
      this.prisma.color,
      { color: data.color.color },
      { color: data.color.color },
    )
    const image = await createOrUpdate(
      this.prisma.image,
      { image: data.image.image },
      { image: data.image.image },
    )
    const spentValue = await createOrUpdate(
      this.prisma.spentValue,
      { spentValue: data.spentValue.spentValue },
      { spentValue: data.spentValue.spentValue },
    )
    const status = await createOrUpdate(
      this.prisma.status,
      { status: data.status.status },
      { status: data.status.status },
    )

    return this.prisma.products.create({
      data: {
        name: data.name,
        code: data.code,
        size: data.size,
        description: data.description,
        amount: data.amount,
        rentalId: rental.id,
        categoryId: category.id,
        colorId: color.id,
        imageId: image.id,
        spentValueId: spentValue.id,
        statusId: status.id,
      },
      include: {
        rental: true,
        category: true,
        color: true,
        image: true,
        spentValue: true,
        status: true,
      },
    })
  }

  async updateProducts(id: string, data: updateProductsDto) {
    const rental = await createOrUpdate(
      this.prisma.rental,
      { rental: data.rental.rental },
      { rental: data.rental.rental },
    )
    const category = await createOrUpdate(
      this.prisma.category,
      { category: data.category.category },
      { category: data.category.category },
    )
    const color = await createOrUpdate(
      this.prisma.color,
      { color: data.color.color },
      { color: data.color.color },
    )
    const image = await createOrUpdate(
      this.prisma.image,
      { image: data.image.image },
      { image: data.image.image },
    )
    const spentValue = await createOrUpdate(
      this.prisma.spentValue,
      { spentValue: data.spentValue.spentValue },
      { spentValue: data.spentValue.spentValue },
    )
    const status = await createOrUpdate(
      this.prisma.status,
      { status: data.status.status },
      { status: data.status.status },
    )

    return this.prisma.products.update({
      where: { id },
      data: {
        name: data.name,
        code: data.code,
        size: data.size,
        amount: data.amount,
        description: data.description,
        rentalId: rental.id,
        categoryId: category.id,
        colorId: color.id,
        imageId: image.id,
        spentValueId: spentValue.id,
        statusId: status.id,
      },
      include: {
        rental: true,
        category: true,
        color: true,
        image: true,
        spentValue: true,
        status: true,
      },
    })
  }

  async toggleProudctStatus(
    id: string,
  ): Promise<{ message: string; product: any }> {
    const product = await this.prisma.products.findUnique({
      where: { id },
    })

    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }

    const novoStatus = !product.isActive

    const produtoAtualizado = await this.prisma.products.update({
      where: { id },
      data: { isActive: novoStatus },
    })

    const message = novoStatus
      ? 'Produto ativado com sucesso'
      : 'Produto desativado com sucesso'

    return { message, product: produtoAtualizado }
  }

  async getProductAtivos(): Promise<any[]> {
    return await this.prisma.products.findMany({
      where: { isActive: true },
    })
  }



  async findAllProducts() {
    return this.prisma.products.findMany({
      include: {
        rental: true,
        category: true,
        color: true,
        image: true,
        spentValue: true,
        status: true,
      },
    })
  }
  
  async SearchProducts(query: string) {
    return this.prisma.products.findMany({
      where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { size: { contains: query, mode: 'insensitive' } },
        { category: {category: { contains: query, mode: 'insensitive' } }},
        { status: {status: { contains: query, mode: 'insensitive'}}}
      ],
    },
      include: {
        category: true,
        status: true
      },
    });
  }

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- PARA TESTES -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  async deleteProduct(id: string) {
    return this.prisma.products.delete({
      where: { id },
    })
  }
}
