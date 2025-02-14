import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // Sem restrições de role, acesso liberado
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    console.log('Authorization Header:', request.headers.authorization);

    if (!authorization) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const token = authorization.split(' ')[1];
      console.log('Extracted Token:', token);

      // Validando o token com o método `verify`
      const decodedToken = this.jwtService.verify(token);
      console.log('Decoded Token:', decodedToken);

      if (!decodedToken || !decodedToken.role) {
        throw new UnauthorizedException('Token inválido');
      }

      if (!requiredRoles.includes(decodedToken.role)) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar esta rota',
        );
      }

      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
