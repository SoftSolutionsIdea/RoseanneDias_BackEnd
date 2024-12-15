import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { GlobalErrors } from './globalErrors' // Importando o arquivo único de erros

@Catch()
export class ErrorsFilter implements ExceptionFilter {
  catch(
    exception: Error | PrismaClientKnownRequestError | HttpException,
    host: ArgumentsHost,
  ) {
    const context = host.switchToHttp()
    const response = context.getResponse()

    // Status e mensagem padrão
    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Estamos nos mobilizando para solucionar este erro'

    if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED
      message =
        exception.message || 'Credenciais inválidas ou usuário não encontrado'
    }

    // Verificando se é um erro do Prisma
    if (exception instanceof PrismaClientKnownRequestError) {
      status = HttpStatus.CONFLICT
      if (exception.code === 'P2002') {
        const field = exception.meta?.target?.[0]
        message =
          GlobalErrors.PrismaErrors.P2002.fields[field] ||
          GlobalErrors.PrismaErrors.P2002.default
      } else if (exception.code === 'P2025') {
        message = GlobalErrors.PrismaErrors.P2025.message
      } else {
        message = GlobalErrors.PrismaErrors.DEFAULT
      }
    }

    // Verificando se é uma exceção HTTP (HttpException)
    if (exception instanceof HttpException) {
      status = exception.getStatus() // Pegando o código de status HTTP

      // Obtendo a resposta da exceção
      const responseMessage = exception.getResponse()

      // Verificando se a resposta é uma string ou um objeto
      if (typeof responseMessage === 'string') {
        message = responseMessage // Se for uma string, usamos diretamente
      } else if (
        typeof responseMessage === 'object' &&
        'message' in responseMessage
      ) {
        // Se for um objeto e contiver a propriedade "message", usamos essa mensagem
        message = (responseMessage as { message: string }).message
      }

      // Tratamento específico para os erros HTTP usando GlobalErrors
      if (status === HttpStatus.BAD_REQUEST) {
        message = GlobalErrors.HttpErrors.BAD_REQUEST.message
      }
      if (status === HttpStatus.UNAUTHORIZED) {
        message = GlobalErrors.HttpErrors.UNAUTHORIZED.message
      }
      if (status === HttpStatus.FORBIDDEN) {
        message = GlobalErrors.HttpErrors.FORBIDDEN.message
      }
      if (status === HttpStatus.NOT_FOUND) {
        message = GlobalErrors.HttpErrors.NOT_FOUND.message
      }
      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        message = GlobalErrors.HttpErrors.INTERNAL_ERRO_SERVER.message
      }
      if (status === HttpStatus.NOT_IMPLEMENTED) {
        message = GlobalErrors.HttpErrors.NOT_IMPLEMENTED.message
      }
      if (status === HttpStatus.BAD_GATEWAY) {
        message = GlobalErrors.HttpErrors.BAD_GATEWAY.message
      }
      if (status === HttpStatus.SERVICE_UNAVAILABLE) {
        message = GlobalErrors.HttpErrors.SERVICE_UNAVAILABLE.message
      }
      if (status === HttpStatus.GATEWAY_TIMEOUT) {
        message = GlobalErrors.HttpErrors.GATEWAY_TIMEOUT.message
      }
    }

    // Envia a resposta com o status e mensagem adequados
    response.status(status).json({
      statusCode: status,
      message,
    })
  }
}
