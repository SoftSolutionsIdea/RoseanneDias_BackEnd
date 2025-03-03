import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { createOrUpdate } from '../../common/helpers/createOrUpdate';
import { updateEmployeeDto } from './dto/updateEmployee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async createEmployee(data: CreateEmployeeDto) {
    try {
      const wage = await createOrUpdate(
        this.prisma.wage,
        { amount: data.wage.amount },
        { amount: data.wage.amount },
      );
      const time = await createOrUpdate(
        this.prisma.time,
        { time: data.time.time },
        { time: data.time.time },
      );
      const role = await createOrUpdate(
        this.prisma.role,
        { role: data.role.role },
        { role: data.role.role },
      );
      const cep = await createOrUpdate(
        this.prisma.cep,
        { cep: data.address.cep.cep },
        { cep: data.address.cep.cep },
      );
      const street = await createOrUpdate(
        this.prisma.street,
        { street: data.address.street.street },
        { street: data.address.street.street },
      );
      const city = await createOrUpdate(
        this.prisma.city,
        { city: data.address.city.city },
        { city: data.address.city.city },
      );
      const state = await createOrUpdate(
        this.prisma.state,
        { state: data.address.state.state },
        { state: data.address.state.state },
      );
      const bairro = await createOrUpdate(
        this.prisma.bairro,
        { bairro: data.address.bairro.bairro },
        { bairro: data.address.bairro.bairro },
      );

      let address = await this.prisma.address.findFirst({
        where: {
          num: data.address.num,
          complement: data.address.complement,
          streetId: street.id,
          cepId: cep.id,
          cityId: city.id,
          stateId: state.id,
          bairroId: bairro.id,
        },
      });

      if (!address) {
        address = await this.prisma.address.create({
          data: {
            num: data.address.num,
            complement: data.address.complement,
            streetId: street.id,
            cepId: cep.id,
            cityId: city.id,
            stateId: state.id,
            bairroId: bairro.id,
          },
        });
      }

      return await this.prisma.employee.create({
        data: {
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          telephone: data.telephone,
          niver: data.niver,
          roleId: role.id,
          addressId: address.id,
          timeId: time.id,
          wageId: wage.id,
        },
        include: {
          role: true,
          time: true,
          wage: true,
          address: {
            include: {
              bairro: true,
              cep: true,
              city: true,
              state: true,
              street: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar o funcionário', error.message);
    }
  }

  async updateEmployee(id: string, data: updateEmployeeDto) {
    try {
      const wage = await createOrUpdate(
        this.prisma.wage,
        { amount: data.wage.amount },
        { amount: data.wage.amount },
      );
      const time = await createOrUpdate(
        this.prisma.time,
        { time: data.time.time },
        { time: data.time.time },
      );
      const role = await createOrUpdate(
        this.prisma.role,
        { role: data.role.role },
        { role: data.role.role },
      );
      const cep = await createOrUpdate(
        this.prisma.cep,
        { cep: data.address.cep.cep },
        { cep: data.address.cep.cep },
      );
      const street = await createOrUpdate(
        this.prisma.street,
        { street: data.address.street.street },
        { street: data.address.street.street },
      );
      const city = await createOrUpdate(
        this.prisma.city,
        { city: data.address.city.city },
        { city: data.address.city.city },
      );
      const state = await createOrUpdate(
        this.prisma.state,
        { state: data.address.state.state },
        { state: data.address.state.state },
      );
      const bairro = await createOrUpdate(
        this.prisma.bairro,
        { bairro: data.address.bairro.bairro },
        { bairro: data.address.bairro.bairro },
      );

      let address;
      if (data.address.id) {
        address = await this.prisma.address.update({
          where: { id: data.address.id },
          data: {
            num: data.address.num,
            complement: data.address.complement,
            streetId: street.id,
            cepId: cep.id,
            cityId: city.id,
            stateId: state.id,
            bairroId: bairro.id,
          },
        });
      } else {
        address = await this.prisma.address.findFirst({
          where: {
            num: data.address.num,
            complement: data.address.complement,
            streetId: street.id,
            cepId: cep.id,
            cityId: city.id,
            stateId: state.id,
            bairroId: bairro.id,
          },
        });

        if (!address) {
          address = await this.prisma.address.create({
            data: {
              num: data.address.num,
              complement: data.address.complement,
              streetId: street.id,
              cepId: cep.id,
              cityId: city.id,
              stateId: state.id,
              bairroId: bairro.id,
            },
          });
        }
      }

      return this.prisma.employee.update({
        where: { id },
        data: {
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          telephone: data.telephone,
          niver: data.niver,
          roleId: role.id,
          addressId: address.id,
          timeId: time.id,
          wageId: wage.id,
        },
        include: {
          role: true,
          time: true,
          wage: true,
          address: {
            include: {
              bairro: true,
              cep: true,
              city: true,
              state: true,
              street: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar o funcionário', error.message);
    }
  }

  async toggleEmployeeStatus(
    id: string,
  ): Promise<{ message: string; employee: any }> {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id },
      });

      if (!employee) {
        throw new NotFoundException('Funcionário não encontrado');
      }

      const novoStatus = !employee.isActive;
      const employeeAtualizado = await this.prisma.employee.update({
        where: { id },
        data: { isActive: novoStatus },
      });

      const message = novoStatus
        ? 'Funcionário ativado com sucesso'
        : 'Funcionário desativado com sucesso';

      return { message, employee: employeeAtualizado };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao alterar o status do funcionário', error.message);
    }
  }

  async getEmployeeAtivos(): Promise<any[]> {
    try {
      return await this.prisma.employee.findMany({
        where: { isActive: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar funcionários ativos', error.message);
    }
  }

  async findAllEmployees() {
    try {
      return this.prisma.employee.findMany({
        include: {
          role: true,
          address: {
            include: {
              bairro: true,
              cep: true,
              city: true,
              state: true,
              street: true,
            },
          },
          time: true,
          wage: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar todos os funcionários', error.message);
    }
  }

  async findEmployee(id: string) {
    try {
      return this.prisma.employee.findUnique({
        where: { id },
        include: {
          role: true,
          address: {
            include: {
              bairro: true,
              cep: true,
              city: true,
              state: true,
              street: true,
            },
          },
          time: true,
          wage: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar todos os funcionários', error.message);
    }
  }

  async SearchEmployee(query: string) {
    try {
      const result = await this.prisma.employee.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { telephone: { contains: query, mode: 'insensitive' } },
            { cpf: { contains: query, mode: 'insensitive' } },
            { time: { time: { contains: query, mode: 'insensitive' } } },
          ],
        },
        include: {
          address: true,
          role: true,
          time: true,
          wage: true,
        },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao realizar a busca de funcionários', error.message);
    }
  }

  async deleteEmployee(id: string) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id },
        include: { address: true },
      });

      if (!employee) {
        throw new NotFoundException('Funcionário não encontrado');
      }

      await this.prisma.employee.delete({
        where: { id },
        include: {
          role: true,
          wage: true,
          time: true,
        },
      });

      if (employee.address) {
        await this.prisma.address.delete({
          where: { id: employee.address.id },
          include: {
            bairro: true,
            cep: true,
            city: true,
            state: true,
            street: true,
          },
        });
      }

      return employee;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao excluir funcionário', error.message);
    }
  }

  async findAllAddresses() {
    try {
      return this.prisma.address.findMany({
        include: {
          cep: true,
          street: true,
          city: true,
          state: true,
          bairro: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar endereços', error.message);
    }
  }

  async deleteAddress(id: string) {
    try {
      const numericId = parseInt(id, 10);
      const address = await this.prisma.address.findUnique({
        where: { id: numericId },
        include: { Employee: true },
      });

      if (!address) {
        throw new NotFoundException('Endereço não encontrado');
      }

      if (address.Employee && address.Employee.length > 0) {
        throw new InternalServerErrorException(
          'Endereço não foi deletado porque está associado a um funcionário',
        );
      }

      await this.prisma.address.delete({
        where: { id: numericId },
      });

      return address;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao excluir endereço', error.message);
    }
  }
}
