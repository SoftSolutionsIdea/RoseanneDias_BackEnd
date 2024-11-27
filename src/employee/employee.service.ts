import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { createOrUpdate } from '../common/helpers/createOrUpdate';
import { updateEmployeeDto } from './dto/updateEmployee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async createEmployee(data: CreateEmployeeDto) {
    const wage = await createOrUpdate(this.prisma.wage, { amount: data.wage.amount }, { amount: data.wage.amount });
    const time = await createOrUpdate(this.prisma.time, { time: data.time.time }, { time: data.time.time });
    const role = await createOrUpdate(this.prisma.role, { role: data.role.role }, { role: data.role.role });
    const cep = await createOrUpdate(this.prisma.cep, { cep: data.address.cep.cep }, { cep: data.address.cep.cep });
    const street = await createOrUpdate(this.prisma.street, { street: data.address.street.street }, { street: data.address.street.street });
    const city = await createOrUpdate(this.prisma.city, { city: data.address.city.city }, { city: data.address.city.city });
    const state = await createOrUpdate(this.prisma.state, { state: data.address.state.state }, { state: data.address.state.state });
    const bairro = await createOrUpdate(this.prisma.bairro, { bairro: data.address.bairro.bairro }, { bairro: data.address.bairro.bairro });
  
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

    return this.prisma.employee.create({
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
  }

  async updateEmployee(id: string, data: updateEmployeeDto) {

    const wage = await createOrUpdate(this.prisma.wage, { amount: data.wage.amount }, { amount: data.wage.amount });
    const time = await createOrUpdate(this.prisma.time, { time: data.time.time }, { time: data.time.time });
    const role = await createOrUpdate(this.prisma.role, { role: data.role.role }, { role: data.role.role });
    const cep = await createOrUpdate(this.prisma.cep, { cep: data.address.cep.cep }, { cep: data.address.cep.cep });
    const street = await createOrUpdate(this.prisma.street, { street: data.address.street.street }, { street: data.address.street.street });
    const city = await createOrUpdate(this.prisma.city, { city: data.address.city.city }, { city: data.address.city.city });
    const state = await createOrUpdate(this.prisma.state, { state: data.address.state.state }, { state: data.address.state.state });
    const bairro = await createOrUpdate(this.prisma.bairro, { bairro: data.address.bairro.bairro }, { bairro: data.address.bairro.bairro });

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
        roleId: role.id ,
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
          }
        }
      }
    });
  }

  async deleteEmployee(id: string) {
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
        time: true
      }
    });

    if (employee.address) {
      await this.prisma.address.delete({
        where: { id: employee.address.id },
        include: {
          bairro: true,
          cep: true,
          city: true,
          state: true,
          street: true          
        }
      });
    }

    return employee;
  }

  async findAllEmployees() {
    return this.prisma.employee.findMany({
      include: {
        role: true,
        address: {
          include: {
            cep: true,
            street: true,
            city: true,
            state: true,
            bairro: true,
          },
        },
        time: true,
        wage: true,
      },
    });
  }

  async findAllAddresses() {
    return this.prisma.address.findMany({
      include: {
        cep: true,
        street: true,
        city: true,
        state: true,
        bairro: true,
      },
    });
  }

  
  async deleteAddress(id: string) {
    const numericId = parseInt(id, 10); 
  
    const address = await this.prisma.address.findUnique({
      where: { id: numericId }, 
      include: { Employee: true },
    });
  
    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }
  
    if (address.Employee && address.Employee.length > 0) {
      throw new Error('Endereço não foi deletado porque está associado a um funcionário');
    }
  
    await this.prisma.address.delete({
      where: { id: numericId }, 
    });
  
    return address;
  }
}