import { Module } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { EmployeeController } from './employee.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { GuardService } from 'src/guard/guard.service'

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService, GuardService],
})
export class EmployeeModule {}
