import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { createOrUpdate } from '../common/helpers/createOrUpdate'
import { CreateClientDto } from './dto/createClient.dto'
import { UpdateClientDto } from './dto/updateCliente.dto'

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(data: CreateClientDto) {
    try {
      const cep = await createOrUpdate(
        this.prisma.cepCli,
        { cep: data.addressCli.cep.cep },
        { cep: data.addressCli.cep.cep },
      )
      const street = await createOrUpdate(
        this.prisma.streetCli,
        { street: data.addressCli.street.street },
        { street: data.addressCli.street.street },
      )
      const city = await createOrUpdate(
        this.prisma.cityCli,
        { city: data.addressCli.city.city },
        { city: data.addressCli.city.city },
      )
      const state = await createOrUpdate(
        this.prisma.stateCli,
        { state: data.addressCli.state.state },
        { state: data.addressCli.state.state },
      )
      const bairro = await createOrUpdate(
        this.prisma.bairroCli,
        { bairro: data.addressCli.bairro.bairro },
        { bairro: data.addressCli.bairro.bairro },
      )

      let address = await this.prisma.addressCli.findFirst({
        where: {
          num: data.addressCli.num,
          complement: data.addressCli.complement,
          streetCliId: street.id,
          cepCliId: cep.id,
          cityCliId: city.id,
          stateCliId: state.id,
          bairroCliId: bairro.id,
        },
      })

      if (!address) {
        address = await this.prisma.addressCli.create({
          data: {
            num: data.addressCli.num,
            complement: data.addressCli.complement,
            streetCliId: street.id,
            cepCliId: cep.id,
            cityCliId: city.id,
            stateCliId: state.id,
            bairroCliId: bairro.id,
          },
        })
      }

      return this.prisma.client.create({
        data: {
          name: data.name,
          email: data.email,
          rg: data.rg,
          instagram: data.instagram,
          cpf_cnpj: data.cpf_cnpj,
          telephone_1: data.telephone_1,
          telephone_2: data.telephone_2,
          niver: data.niver,
          addressCliId: address.id,
        },
        include: {
          addressCli: {
            include: {
              bairroCli: true,
              cepCli: true,
              cityCli: true,
              stateCli: true,
              streetCli: true,
            },
          },
        },
      })
    } catch (error) {
      throw new NotFoundException(
        'Error creating client or address: ' + error.message,
      )
    }
  }

  async updateCliente(id: string, data: UpdateClientDto) {
    const cep = await createOrUpdate(
      this.prisma.cepCli,
      { cep: data.addressCli.cep.cep },
      { cep: data.addressCli.cep.cep },
    )
    const street = await createOrUpdate(
      this.prisma.streetCli,
      { street: data.addressCli.street.street },
      { street: data.addressCli.street.street },
    )
    const city = await createOrUpdate(
      this.prisma.cityCli,
      { city: data.addressCli.city.city },
      { city: data.addressCli.city.city },
    )
    const state = await createOrUpdate(
      this.prisma.stateCli,
      { state: data.addressCli.state.state },
      { state: data.addressCli.state.state },
    )
    const bairro = await createOrUpdate(
      this.prisma.bairroCli,
      { bairro: data.addressCli.bairro.bairro },
      { bairro: data.addressCli.bairro.bairro },
    )

    let address
    if (data.addressCli.id) {
      address = await this.prisma.addressCli.update({
        where: { id: data.addressCli.id },
        data: {
          num: data.addressCli.num,
          complement: data.addressCli.complement,
          streetCliId: street.id,
          cepCliId: cep.id,
          cityCliId: city.id,
          stateCliId: state.id,
          bairroCliId: bairro.id,
        },
      })
    } else {
      address = await this.prisma.addressCli.findFirst({
        where: {
          num: data.addressCli.num,
          complement: data.addressCli.complement,
          streetCliId: street.id,
          cepCliId: cep.id,
          cityCliId: city.id,
          stateCliId: state.id,
          bairroCliId: bairro.id,
        },
      })

      if (!address) {
        address = await this.prisma.addressCli.create({
          data: {
            num: data.addressCli.num,
            complement: data.addressCli.complement,
            streetCliId: street.id,
            cepCliId: cep.id,
            cityCliId: city.id,
            stateCliId: state.id,
            bairroCliId: bairro.id,
          },
        })
      }
    }

    return this.prisma.client.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        rg: data.rg,
        instagram: data.instagram,
        cpf_cnpj: data.cpf_cnpj,
        telephone_1: data.telephone_1,
        telephone_2: data.telephone_2,
        niver: data.niver,
        addressCliId: address.id,
      },
      include: {
        addressCli: {
          include: {
            bairroCli: true,
            cepCli: true,
            cityCli: true,
            stateCli: true,
            streetCli: true,
          },
        },
      },
    })
  }

  async deleteClient(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: { addressCli: true },
    })

    if (!client) {
      throw new NotFoundException('Funcionário não encontrado')
    }

    await this.prisma.client.delete({
      where: { id },
    })

    if (client.addressCli) {
      await this.prisma.addressCli.delete({
        where: { id: client.addressCli.id },
        include: {
          bairroCli: true,
          cepCli: true,
          cityCli: true,
          stateCli: true,
          streetCli: true,
        },
      })
    }

    return client
  }

  async findAllClient() {
    return this.prisma.client.findMany({
      include: {
        addressCli: {
          include: {
            cepCli: true,
            streetCli: true,
            cityCli: true,
            stateCli: true,
            bairroCli: true,
          },
        },
      },
    })
  }

  async findAllAddresses() {
    return this.prisma.addressCli.findMany({
      include: {
        cepCli: true,
        streetCli: true,
        cityCli: true,
        stateCli: true,
        bairroCli: true,
      },
    })
  }

  async deleteAddress(id: string) {
    const numericId = parseInt(id, 10)

    const addressCli = await this.prisma.addressCli.findUnique({
      where: { id: numericId },
      include: { client: true },
    })

    if (!addressCli) {
      throw new NotFoundException('Endereço não encontrado')
    }

    if (addressCli.client && addressCli.client.length > 0) {
      throw new Error(
        'Endereço não foi deletado porque está associado a um usuário',
      )
    }

    await this.prisma.addressCli.delete({
      where: { id: numericId },
    })

    return addressCli
  }
}
