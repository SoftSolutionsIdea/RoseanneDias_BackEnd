import { Module, OnModuleInit } from '@nestjs/common'
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
import { PdfService } from './pdf/pdf.service'
import { pdfController } from './pdf/pdf.controller'
import { execSync } from 'child_process'
import { ContractsModule } from './contracts/contracts.module';
import { ContractsController } from './contracts/contracts.controller'
import { ContractsService } from './contracts/contracts.service'

@Module({
  imports: [
    EmployeeModule,
    ProductsModule,
    ClienteModule,
    AuthModule,
    ContractsModule],
  controllers: [
    EmployeeController,
    ProductsController,
    ClientController,
    pdfController,
    ContractsController,
  ],
  providers: [
    EmployeeService,
    PrismaService,
    ProductsService,
    ClientService,
    PdfService,
    ContractsService,
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    execSync('npm run copy-templates')
  }
}
