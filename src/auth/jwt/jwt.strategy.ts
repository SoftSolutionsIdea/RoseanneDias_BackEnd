import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtPayload } from '../interface/auth.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.employee.findFirst({
      where: { id: payload.id }, // Assumindo que o ID é único
      include: { role: true },
    })

    if (!user) {
      console.log('Usuário não encontrado')
      throw new Error('Usuário não encontrado')
    }

    return { id: user.id, name: user.email, role: user.role.role } // Inclui o role
  }
}
