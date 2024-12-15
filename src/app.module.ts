import { Module } from '@nestjs/common'
import { EmployeeModule } from './employee/employee.module'
import { EmployeeService } from './employee/employee.service'
import { PrismaService } from './prisma/prisma.service'
import { EmployeeController } from './employee/employee.controller'
import { ProductsModule } from './products/products.module'
import { ClienteModule } from './cliente/cliente.module'
import { ProductsController } from './products/products.controller'
import { ClientController } from './cliente/cliente.controller'
import { ProductsService } from './products/products.service'
import { ClientService } from './cliente/cliente.service'
import { AuthModule } from './auth/auth.module'
import { GuardService } from './guard/guard.service'
import { APP_FILTER } from '@nestjs/core'
import { ErrorsFilter } from './errors/errors.filter'

@Module({
  imports: [EmployeeModule, ProductsModule, ClienteModule, AuthModule],
  controllers: [EmployeeController, ProductsController, ClientController],
  providers: [
    EmployeeService,
    PrismaService,
    ProductsService,
    ClientService,
    GuardService,
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
    },
  ],
})
export class AppModule {}
