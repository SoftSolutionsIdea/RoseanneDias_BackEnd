import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeService } from './employee/employee.service';
import { PrismaService } from './prisma/prisma.service';
import { EmployeeController } from './employee/employee.controller';
import { ProductsModule } from './products/products.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProductsController } from './products/products.controller';
import { ClientController } from './cliente/cliente.controller';
import { ProductsService } from './products/products.service';
import { ClientService } from './cliente/cliente.service';

@Module({
  imports: [EmployeeModule, ProductsModule, ClienteModule],
  controllers: [EmployeeController, ProductsController, ClientController],
  providers: [EmployeeService, PrismaService, ProductsService, ClientService],
})
export class AppModule {}
