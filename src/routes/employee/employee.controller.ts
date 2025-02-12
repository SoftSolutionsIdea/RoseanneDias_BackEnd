import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Res,
} from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { CreateEmployeeDto } from './dto/createEmployee.dto'
import { updateEmployeeDto } from './dto/updateEmployee.dto'
import { Response } from 'express'

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('register')
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Res() res: Response,
  ) {
    return res.json({
      message: 'Funcionário cadastrado com sucesso!',
      funcionário: await this.employeeService.createEmployee(createEmployeeDto),
    })
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: updateEmployeeDto,
    @Res() res: Response,
  ) {
    return res.json({
      message: 'Funcionário atualizado com sucesso!',
      funcionário: await this.employeeService.updateEmployee(
        id,
        updateEmployeeDto,
      ),
    })
  }

  @Get()
  async findAll() {
    return await this.employeeService.findAllEmployees()
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    return res.json({
      message: 'Funcionário deletado com sucesso!',
      funcionário: await this.employeeService.deleteEmployee(id),
    })
  }

  @Get('address')
  async findAllAddresses() {
    return await this.employeeService.findAllAddresses()
  }

  @Delete('address/:id')
  async deleteAddress(@Param('id') id: string, @Res() res: Response) {
    return res.json({
      message: 'Endereço deletado com sucesso!',
      Endereço: await this.employeeService.deleteAddress(id),
    })
  }
}
