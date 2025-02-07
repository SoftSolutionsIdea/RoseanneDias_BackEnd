import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { UserStatus } from '@prisma/client';
import { CreateContractDto } from './createContracts.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get(':status')
  async getContractsByStatus(@Param('status') status: UserStatus) {
    return await this.contractsService.getContractsByStatus(status);
  }

  @Post('create')
  async createContract(@Body() createContractDto: CreateContractDto) {
    const { clientId, productId, status } = createContractDto;
    return await this.contractsService.createContract(clientId, productId, status || 'Pending');
  }

  @Patch(':contractId/status')
  async updateContractStatus(
    @Param('contractId') contractId: number,
    @Body() body: { newStatus: UserStatus },
  ) {
    return await this.contractsService.updateContractStatus(contractId, body.newStatus);
  }
}
