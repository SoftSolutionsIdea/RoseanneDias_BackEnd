import { Module } from '@nestjs/common'
import { ClientController } from './cliente.controller'
import { ClientService } from './cliente.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { Reflector } from '@nestjs/core'
import { AuthModule } from '../auth/auth.module'
import { RolesGuard } from '../auth/roles.service'

@Module({
  imports: [AuthModule],
  controllers: [ClientController],
  providers: [ClientService, PrismaService, RolesGuard, Reflector],
  exports: [RolesGuard],
})
export class ClienteModule {}
