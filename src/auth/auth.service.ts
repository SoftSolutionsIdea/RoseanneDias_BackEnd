import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(name: string, cpf: string) {
    const user = await this.prisma.employee.findFirst({ where: { name } })
    if (!user) {
      throw new HttpException(
        'O usuário não foi encontrado!',
        HttpStatus.NOT_FOUND,
      )
    }
    if (user.cpf === cpf) {
      const payload = { name: user.name, id: user.id }
      const token = this.jwtService.sign(payload)
      return { access_token: token }
    }
    const isValidCpf = await bcrypt.compare(cpf, user.cpf)
    if (!isValidCpf) {
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED)
    }

    const payload = { name: user.name, id: user.id }
    const token = this.jwtService.sign(payload)

    return { access_token: token }
  }
}
