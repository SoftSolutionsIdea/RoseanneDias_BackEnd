import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body() loginData: { email: string; cpf: string },
    @Res() res: Response,
  ) {
    try {
      console.log('Tentativa de login:', loginData)
      const { email, cpf } = loginData
      const result = await this.authService.login(email, cpf)
      return res.json({
        message: 'Login realizado com sucesso!',
        name: result.name,
        access_token: result.access_token,
      })
    } catch (error) {
      console.error('', error.message)
      return res.status(401).json({ error: error.message })
    }
  }
}
