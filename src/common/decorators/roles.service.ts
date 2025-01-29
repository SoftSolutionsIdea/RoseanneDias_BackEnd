import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ROLES_KEY } from './roles.decorator' // Criamos o decorator roles
import { UserRole } from '@prisma/client' // Enum Role da tabela Prisma

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    )
    if (!requiredRoles) {
      return true // Sem restrições de role
    }

    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization

    if (!authorization) {
      throw new ForbiddenException('Token não fornecido')
    }

    const token = authorization.split(' ')[1]
    const decodedToken = this.jwtService.decode(token) as { role: UserRole }

    if (!requiredRoles.includes(decodedToken.role)) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta rota',
      )
    }

    return true
  }
}
