import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { updateEmployeeDto } from './dto/updateEmployee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('register')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeService.createEmployee(createEmployeeDto);
    return { message: 'Funcionário cadastrado com sucesso!', employee};
  }

  @Get('Search')
  async Search(@Query('q') query: string) {
    if (!query) return await this.employeeService.findAllEmployees();
    const employee = await this.employeeService.SearchEmployee(query);
    return {employee};
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: updateEmployeeDto) {
    const employee = await this.employeeService.updateEmployee(id, updateEmployeeDto);
    return { message: 'Funcionário atualizado com sucesso!', employee};
  }

  @Patch(':id/toggle')
  async toggleEmployeeStatus(@Param('id') id: string) {
    const { message, employee } = await this.employeeService.toggleEmployeeStatus(id);
    return { message, employee };
  }

  @Get('ativos')
  async getEmployeeAtivos() {
    return await this.employeeService.getEmployeeAtivos();
  }

  @Get()
  async findAll() {
    return await this.employeeService.findAllEmployees();
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return await this.employeeService.findEmployee(id);
  }


  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- PARA TESTES -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const funcionário = await this.employeeService.deleteEmployee(id);
    return { funcionário };
  }

  @Get('address')
  async findAllAddresses() {
    return await this.employeeService.findAllAddresses();
  }

  @Delete('address/:id')
  async deleteAddress(@Param('id') id: string) {
    const Endereço = await this.employeeService.deleteAddress(id);
    return { message: 'Endereço deletado com sucesso!', Endereço };
  }
}
