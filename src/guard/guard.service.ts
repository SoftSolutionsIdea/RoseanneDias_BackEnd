import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class GuardService implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    )
    if (!requiredRoles) {
      return true // Se não houver roles exigidas, libera o acesso
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    console.log('Usuário autenticado no Guard:', user)
    console.log('Roles exigidas:', requiredRoles)

    if (!user) {
      throw new ForbiddenException('Usuário não autenticado')
    }

    if (!user || !user.role) {
      return false // Apenas retorna false, sem lançar exceção
    }

    // Verifica se o usuário tem uma das roles requeridas
    return requiredRoles.includes(user.role)
  }
}
