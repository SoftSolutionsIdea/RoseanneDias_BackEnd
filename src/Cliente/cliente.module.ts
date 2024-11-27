import { Module } from '@nestjs/common';
import { ClientController } from './cliente.controller';
import { ClientService } from './cliente.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService],
})
export class ClienteModule {}
