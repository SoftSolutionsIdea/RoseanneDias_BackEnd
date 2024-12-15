import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(email: string, cpf: string) {
    const user = await this.prisma.employee.findUnique({
      where: { email },
      include: { role: true },
    })
    // Se o usuário não for encontrado, lançar UnauthorizedException
    if (!user) {
      throw new UnauthorizedException('O usuário não foi encontrado!')
    }
    if (user.cpf === cpf) {
      const payload = {
        email: user.email,
        id: user.id,
        role: user.role.role,
      }
      const token = this.jwtService.sign(payload)
      return { access_token: token }
    }
    const isValidCpf = await bcrypt.compare(cpf, user.cpf)
    if (!isValidCpf) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role.role,
    }
    const token = this.jwtService.sign(payload)

    return { access_token: token }
  }
}
