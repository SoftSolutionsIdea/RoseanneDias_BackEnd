import { forwardRef, Module, OnModuleInit } from '@nestjs/common'
import { EmployeeModule } from './routes/employee/employee.module'
import { EmployeeService } from './routes/employee/employee.service'
import { PrismaService } from './prisma/prisma.service'
import { EmployeeController } from './routes/employee/employee.controller'
import { ProductsModule } from './routes/Products/products.module'
import { ClienteModule } from './routes/Cliente/cliente.module'
import { ProductsController } from './routes/Products/products.controller'
import { ClientController } from './routes/Cliente/cliente.controller'
import { ProductsService } from './routes/Products/products.service'
import { ClientService } from './routes/Cliente/cliente.service'
import { AuthModule } from './routes/auth/auth.module'
import { PdfService } from './routes/pdf/pdf.service'
import { pdfController } from './routes/pdf/pdf.controller'
import { exec } from 'child_process'
import { ContractsModule } from './routes/contracts/contracts.module'
import { ContractsController } from './routes/contracts/contracts.controller'
import { ContractsService } from './routes/contracts/contracts.service'


@Module({
  imports: [
    forwardRef(() => EmployeeModule),
    forwardRef(()=>ProductsModule),
    forwardRef(() => ClienteModule),
    AuthModule,
    forwardRef(() => ContractsModule),
  ],
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
  async onModuleInit() {
    exec('npm run copy-templates', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao copiar templates: ${error.message}`);
        return;
      }
      if (stderr) console.error(`Stderr: ${stderr}`);
      console.log(`stdout: ${stdout}`);
    });

    console.log('Aguardando para iniciar os módulos...');
    const modules = [
      'EmployeeModule',
      'ProductsModule',
      'ClienteModule',
      'AuthModule',
      'ContractsModule',
    ];

    for (const module of modules) {
      await new Promise((resolve) => setTimeout(resolve, 500)); 
      console.log(`Iniciando módulo ${module}`);
    }
  }
}
