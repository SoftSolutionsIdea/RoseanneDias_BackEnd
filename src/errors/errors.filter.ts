import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { HttpErrors, PrismaErrors } from './globalErrors';

@Catch()
export class ErrorsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    console.log('Erro capturado pelo filtro', exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Estamos nos mobilizando para solucionar este erro';
    let received = 'Campo com caracteres inválidos';
    let errors = [];

    if (exception instanceof PrismaClientKnownRequestError) {
      status = HttpStatus.CONFLICT;
      if (exception.code === 'P2002') {
        const field = exception.meta?.target?.[0];
        message = PrismaErrors.P2002.fields[field] || PrismaErrors.P2002.default;
      } else if (exception.code === 'P2025') {
        message = PrismaErrors.P2025.message;
      } else {
        message = PrismaErrors.DEFAULT;
      }
    } else if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      const errorResponse = exception.getResponse() as any;

      // Verifica se a resposta de erro está no formato esperado (array de erros)
      if (errorResponse && Array.isArray(errorResponse.message)) {
        // Aqui estamos mapeando os erros para garantir que cada erro tenha a estrutura correta
        errors = errorResponse.message.map((errorMessage: any) => {
          return { message: errorMessage };
        });

        // Ajustando a propriedade `message` para ser uma mensagem padrão
        message = 'Dados inválidos ou faltando. Verifique os campos enviados.';
        received = 'Erro de validação';
      } else {
        received = 'Requisição inválida';
      }
    } else if (exception instanceof Error) {
      switch (exception.message) {
        case 'BAD_REQUEST':
          status = HttpErrors.BAD_REQUEST.code;
          message = HttpErrors.BAD_REQUEST.message;
          break;
        case 'NOT_FOUND':
          status = HttpErrors.NOT_FOUND.code;
          message = HttpErrors.NOT_FOUND.message;
          break;
        case 'NOT_IMPLEMENTED':
          status = HttpErrors.NOT_IMPLEMENTED.code;
          message = HttpErrors.NOT_IMPLEMENTED.message;
          break;
        case 'BAD_GATEWAY':
          status = HttpErrors.BAD_GATEWAY.code;
          message = HttpErrors.BAD_GATEWAY.message;
          break;
        case 'SERVICE_UNAVAILABLE':
          status = HttpErrors.SERVICE_UNAVAILABLE.code;
          message = HttpErrors.SERVICE_UNAVAILABLE.message;
          break;
        case 'GATEWAY_TIMEOUT':
          status = HttpErrors.GATEWAY_TIMEOUT.code;
          message = HttpErrors.GATEWAY_TIMEOUT.message;
          break;
        case 'UNAUTHORIZED':
          status = HttpErrors.UNAUTHORIZED.code;
          message = HttpErrors.UNAUTHORIZED.message;
          break;
        case 'FORBIDDEN':
          status = HttpErrors.FORBIDDEN.code;
          message = HttpErrors.FORBIDDEN.message;
          break;
        default:
          break;
      }
    }

    // Resposta personalizada
    response.status(status).json({
      statusCode: status,
      message,
      errorrecebido: received, // Inclui a mensagem de erro específica
      error: exception.name || 'Erro interno do servidor',
      errors, // Inclui os erros de validação detalhados
      ...(process.env.NODE_ENV === 'development' && { stack: exception.stack }),
    });
  }
}
