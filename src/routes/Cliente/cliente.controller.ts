import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ClientService } from './cliente.service'
import { CreateClientDto } from './dto/createClient.dto'
import { UpdateClientDto } from './dto/updateCliente.dto'
import { RolesGuard } from '../auth/roles.service'
import { Roles } from '../auth/roles.decorator'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(RolesGuard)
  @Post('register')
  @Roles('Admin')
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.createClient(createClientDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return {
      message: 'Cliente atualizado com sucesso',
      cliente: await this.clientService.updateCliente(id, updateClientDto),
    }
  }

  @Patch(':id/toggle')
  async toggleClienteStatus(@Param('id') id: string) {
    return await this.clientService.toggleClienteStatus(id)
  }

  @Get('ativos')
  async getClientesAtivos() {
    return await this.clientService.getClientesAtivos()
  }

  @Get()
  async findAll() {
    return await this.clientService.findAllClient()
  }
  
  @Get(':id')
  async findUnique(@Param('id') id: string) { 
    return await this.clientService.findClient(id)
  }

  @Get('Search')
  async Search(@Query('q') query: string) {
    if (!query) return []
    return this.clientService.SearchClients(query)
  }

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- PARA TESTES -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return {
      message: 'Cliente deletado com sucesso',
      cliente: await this.clientService.deleteClient(id),
    }
  }

  @Get('address')
  async findAllAddresses() {
    return await this.clientService.findAllAddresses()
  }

  @Delete('address/:id')
  async deleteAddress(@Param('id') id: string) {
    return await this.clientService.deleteAddress(id)
  }
}
