import { UserRole } from '@prisma/client'

export interface JwtPayload {
  name: string
  role: UserRole
}
