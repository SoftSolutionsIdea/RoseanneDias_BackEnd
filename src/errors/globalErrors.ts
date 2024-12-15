export const GlobalErrors = {
  // Erros do Prisma
  PrismaErrors: {
    P2002: {
      default: 'Unique failed',
      fields: {
        cpf: 'Este CPF já esta sendo utilizado',
        telephone: 'Este telefone já esta sendo utilizado',
        email: 'Este email já esta sendo utilizado',
        code: 'Já existe um produto que utiliza esse código',
        instagram: 'Já existe um cliente com esse instagram',
        telephone_1: 'Este telefone já esta sendo utilizado',
        telephone_2: 'Este telefone já esta sendo utilizado',
        rg: 'Este RG já esta sendo utilizado',
        cpf_cnpj: 'Este CPF/CPNJ já esta sendo utilizado',
      },
    },

    P2025: {
      default: 'Record not found',
      message:
        'A solicitação não pode ser completada, pois o registro não foi encontrado',
    },

    DEFAULT: 'Um erro não conhecido',
  },

  // Erros HTTP
  HttpErrors: {
    BAD_REQUEST: {
      code: 400,
      message:
        'A requisição contém dados errados, está malformada ou seu token expirou!',
    },

    UNAUTHORIZED: {
      code: 401,
      message:
        'Você não esta autenticado ou não tem autorização para acessar essa rota',
    },

    FORBIDDEN: {
      code: 403,
      message: 'Você não tem permissão para executar está ação',
    },

    NOT_FOUND: {
      code: 404,
      message: 'A página solicitada não existe, verifique a URL',
    },

    INTERNAL_ERRO_SERVER: {
      code: 500,
      message:
        'Ocorreu um erro inesperado no servidor. Por favor, tente novamente mais tarde',
    },

    NOT_IMPLEMENTED: {
      code: 501,
      message: 'Este recurso ainda não foi implementado no servidor',
    },

    BAD_GATEWAY: {
      code: 502,
      message:
        'O servidor recebeu uma resposta inválida ao tentar atender sua solicitação',
    },

    SERVICE_UNAVAILABLE: {
      code: 503,
      message:
        'O servidor está temporariamente indisponível. Por favor, tente novamente mais tarde',
    },

    GATEWAY_TIMEOUT: {
      code: 504,
      message:
        'O servidor demorou muito para responder. Por favor, tente novamente mais tarde',
    },
  },
}
