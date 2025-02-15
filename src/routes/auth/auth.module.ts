import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { RolesGuard } from './roles.service'
import { Reflector } from '@nestjs/core'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [RolesGuard, Reflector, AuthService, PrismaService],
  controllers: [AuthController],
  exports: [RolesGuard, AuthService, JwtModule],
})
export class AuthModule {}
