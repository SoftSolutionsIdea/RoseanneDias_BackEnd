import { Injectable } from '@nestjs/common';
import { Contract, UserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async getContractsByStatus(status: UserStatus): Promise<Contract[]> {
    const contractStatus = await this.prisma.contractStatus.findUnique({
      where: { status },
    });

    if (!contractStatus) {
      throw new Error(`Status ${status} não encontrado.`);
    }

    return this.prisma.contract.findMany({
      where: { statusId: contractStatus.id },
      include: {
        client: true,
        products: true,
        contractStatus: true,
      },
    });
  }

  async createContract(clientId: string, productId: string, status: UserStatus = 'Pending'): Promise<Contract> {
    const contractStatus = await this.prisma.contractStatus.findUnique({
      where: { status },
    });

    if (!contractStatus) {
      throw new Error(`Status ${status} não encontrado.`);
    }

    return this.prisma.contract.create({
      data: {
        clientId,
        productId,
        statusId: contractStatus.id,
      },
      include: {
        client: true,
        products: true,
        contractStatus: true,
      },
    });
  }

  async updateContractStatus(contractId: number, newStatus: UserStatus): Promise<Contract> {
    const contractStatus = await this.prisma.contractStatus.findUnique({
      where: { status: newStatus },
    });

    if (!contractStatus) {
      throw new Error(`Status ${newStatus} não encontrado.`);
    }

    return this.prisma.contract.update({
      where: { id: contractId },
      data: { statusId: contractStatus.id, endDate: new Date() },
    });
  }
}
