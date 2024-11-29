import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientService } from './cliente.service';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateCliente.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('register')
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.createClient(createClientDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.updateCliente(id, updateClientDto);
  }

  @Get()
  async findAll() {
    return await this.clientService.findAllClient();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.clientService.deleteClient(id);
  }

  @Get('address')
  async findAllAddresses() {
    return await this.clientService.findAllAddresses();
  }

  @Delete('address/:id')
  async deleteAddress(@Param('id') id: string) {
    return await this.clientService.deleteAddress(id);
  }
}
