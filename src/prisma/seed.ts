import { PrismaClient, UserStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const statuses = Object.values(UserStatus)

  for (const status of statuses) {
    await prisma.contractStatus.upsert({
      where: { status },
      update: {},
      create: { status },
    })
  }

  console.log('Tabela ContractStatus populada.')
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
