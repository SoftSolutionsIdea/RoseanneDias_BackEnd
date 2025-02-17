import { IsNotEmpty, IsString } from 'class-validator'
enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "Cargo" não pode ser vazio' })
  role: UserRole
}
