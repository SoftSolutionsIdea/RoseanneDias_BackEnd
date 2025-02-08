import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Contract, UserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContractDto } from './Dto/createContracts.dto';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async getContractsByStatus(status: UserStatus): Promise<Contract[]> {
    const contractStatus = await this.prisma.contractStatus.findUnique({
      where: { status },
    });

    if (!contractStatus) {
      throw new NotFoundException(`Status ${status} não encontrado.`);
    }

    return this.prisma.contract.findMany({
      where: { statusId: contractStatus.id },
      include: {
        client: true,
        products: {
          include: {
            products: true,
          },
        },
        payment: true,
        contractStatus: true,
      },
    });
  }

  async createContract(data: CreateContractDto): Promise<Contract> {
    const {
      clientId,
      eventDate,
      seller,
      occasion,
      eventLocation,
      eventName,
      observations,
      discountPercentage,
      status,
      products,
      payments,
    } = data;

    const contractStatus = await this.prisma.contractStatus.findUnique({
      where: { status: status || 'Pending' },
    });

    if (!contractStatus) {
      throw new BadRequestException(`Status ${status || 'Pending'} não encontrado no banco de dados.`);
    }

    return this.prisma.contract.create({
      data: {
        clientId,
        eventDate: new Date(eventDate),
        seller,
        occasion,
        eventLocation,
        eventName,
        observations,
        discountPercentage,
        statusId: contractStatus.id,
        products: {
          create: products.map((product) => ({
            productId: product.productId,
            testDate: new Date(product.testDate),
            time: product.time,
            provaOk: product.provaOk,
            withdrawalDate: new Date(product.withdrawalDate),
            returnDate: new Date(product.returnDate),
            withdrawnDay: new Date(product.withdrawnDay),
            returnedDay: new Date(product.returnedDay),
          })),
        },
        payment: {
          create: payments.map((payment) => ({
            paymentMethod: payment.paymentMethod,
            paymentDate: new Date(payment.paymentDate),
            flag: payment.flag,
            paymentAmount: payment.paymentAmount,
          })),
        },
      },
      include: {
        client: true,
        products: {
          include: {
            products: true,
          },
        },
        payment: true,
        contractStatus: true,
      },
    });
  }


  async updateContractStatus(contractId: number, newStatus: UserStatus): Promise<Contract> {
    const contractStatus = await this.prisma.contractStatus.findUnique({
      where: { status: newStatus },
    });

    if (!contractStatus) {
      throw new NotFoundException(`Status ${newStatus} não encontrado no sistema.`);
    }

    return this.prisma.contract.update({
      where: { id: contractId },
      data: {
        statusId: contractStatus.id,
        endDate: newStatus === 'Completed' ? new Date() : null,
      },
      include: {
        client: true,
        products: true,
        payment: true,
        contractStatus: true,
      },
    });
  }
}
