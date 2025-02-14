import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Res,
  Query,
  Patch,
  HttpStatus,
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

    @Patch(':id/toggle')
    async toggleEmployeeStatus(@Param('id') id: string, @Res() res: Response) {
      try {
        const { message, employee } =
          await this.employeeService.toggleEmployeeStatus(id)
        return res.status(200).send({ message, employee })
      } catch (error) {
        return res.status(error.status || 500).send({ error: error.message })
      }
    }
  
    @Get('ativos')
    async getEmployeeAtivos(@Res() res: Response) {
      try {
        const employee = await this.employeeService.getEmployeeAtivos()
        return res.status(HttpStatus.OK).send(employee)
      } catch (error) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: error.message })
      }
    }
  
  @Get()
  async findAll() {
    return await this.employeeService.findAllEmployees()
  }

  @Get('Search') 
  async Search(@Query('q') query: string ) {
    if (!query) return []
    return this.employeeService.SearchEmployee(query)
  }

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- PARA TESTES -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

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
