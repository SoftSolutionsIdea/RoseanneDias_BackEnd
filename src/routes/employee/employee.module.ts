import { Module } from '@nestjs/common'
import { EmployeeService } from './employee.service'

import { PrismaService } from 'src/prisma/prisma.service'
import { EmployeeController } from './employee.controller'

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
})
export class EmployeeModule {}
