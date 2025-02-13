import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Patch,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common'
import { ClientService } from './cliente.service'
import { CreateClientDto } from './dto/createClient.dto'
import { UpdateClientDto } from './dto/updateCliente.dto'
import { Response } from 'express'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('register')
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.createClient(createClientDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Res() res: Response,
  ) {
    return res.json({
      message: 'Cliente atualizado com sucesso',
      Cliente: await this.clientService.updateCliente(id, updateClientDto),
    })
  }

  @Patch(':id/toggle')
  async toggleClienteStatus(@Param('id') id: string, @Res() res: Response) {
    try {
      const { message, cliente } =
        await this.clientService.toggleClienteStatus(id)
      return res.status(200).send({ message, cliente })
    } catch (error) {
      return res.status(error.status || 500).send({ error: error.message })
    }
  }

  @Get('ativos')
  async getClientesAtivos(@Res() res: Response) {
    try {
      const clientes = await this.clientService.getClientesAtivos()
      return res.status(HttpStatus.OK).send(clientes)
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: error.message })
    }
  }

  @Get()
  async findAll() {
    return await this.clientService.findAllClient()
  }

    @Get('Search') 
      async Search(@Query('q') query: string ) {
        if (!query) return []
        return this.clientService.SearchClients(query)
      }

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- PARA TESTES -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    return res.json({
      message: 'Cliente deletado com sucesso',
      cliente: await this.clientService.deleteClient(id),
    })
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
