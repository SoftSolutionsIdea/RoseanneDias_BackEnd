import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { CreateEmployeeDto } from './dto/createEmployee.dto'
import { updateEmployeeDto } from './dto/updateEmployee.dto'
import { GuardService } from 'src/guard/guard.service'
import { Roles } from 'src/guard/guardDecoretor.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('employee')
@UseGuards(AuthGuard('jwt'), GuardService)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('register')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeService.createEmployee(createEmployeeDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: updateEmployeeDto,
  ) {
    return await this.employeeService.updateEmployee(id, updateEmployeeDto)
  }

  @Get()
  @Roles('Admin')
  async findAll() {
    return await this.employeeService.findAllEmployees()
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.employeeService.deleteEmployee(id)
  }

  @Get('address')
  async findAllAddresses() {
    return await this.employeeService.findAllAddresses()
  }

  @Delete('address/:id')
  async deleteAddress(@Param('id') id: string) {
    return await this.employeeService.deleteAddress(id)
  }
}
