import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { createOrUpdate } from '../../common/helpers/createOrUpdate'
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
          measurements: data.measurements
            ? {
                create: {
                  ombro: data.measurements.ombro ?? undefined,
                  busto: data.measurements.busto ?? undefined,
                  coOmbroCintura: data.measurements.coOmbroCintura ?? undefined,
                  coOmbroCos: data.measurements.coOmbroCos ?? undefined,
                  coCorpoTQC: data.measurements.coCorpoTQC ?? undefined,
                  cintura: data.measurements.cintura ?? undefined,
                  cos: data.measurements.cos ?? undefined,
                  quadril: data.measurements.quadril ?? undefined,
                  SaiaCurta: data.measurements.SaiaCurta ?? undefined,
                  SaiaLonga: data.measurements.SaiaLonga ?? undefined,
                  Short: data.measurements.Short ?? undefined,
                  Calca: data.measurements.Calca ?? undefined,
                  Vestido: data.measurements.Vestido ?? undefined,
                  Manga: data.measurements.Manga ?? undefined,
                  punho: data.measurements.punho ?? undefined,
                  Frente: data.measurements.Frente ?? undefined,
                  OmbroAOmbro: data.measurements.OmbroAOmbro ?? undefined,
                },
              }
            : undefined,
        },
        include: {
          measurements: true,
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

    const existingClient = await this.prisma.client.findUnique({
      where: { id },
    })

    if (!existingClient) {
      throw new Error('Cliente não encontrado.')
    }

    const existingMeasurement = await this.prisma.measurements.findUnique({
      where: { clientId: id },
    })
    if (existingMeasurement) {
      await this.prisma.measurements.update({
        where: { clientId: id },
        data: {
          ombro: data.measurements?.ombro ?? existingMeasurement.ombro,
          busto: data.measurements?.busto ?? existingMeasurement.busto,
          coOmbroCintura:
            data.measurements?.coOmbroCintura ??
            existingMeasurement.coOmbroCintura,
          coOmbroCos:
            data.measurements?.coOmbroCos ?? existingMeasurement.coOmbroCos,
          coCorpoTQC:
            data.measurements?.coCorpoTQC ?? existingMeasurement.coCorpoTQC,
          cintura: data.measurements?.cintura ?? existingMeasurement.cintura,
          cos: data.measurements?.cos ?? existingMeasurement.cos,
          quadril: data.measurements?.quadril ?? existingMeasurement.quadril,
          SaiaCurta:
            data.measurements?.SaiaCurta ?? existingMeasurement.SaiaCurta,
          SaiaLonga:
            data.measurements?.SaiaLonga ?? existingMeasurement.SaiaLonga,
          Short: data.measurements?.Short ?? existingMeasurement.Short,
          Calca: data.measurements?.Calca ?? existingMeasurement.Calca,
          Vestido: data.measurements?.Vestido ?? existingMeasurement.Vestido,
          Manga: data.measurements?.Manga ?? existingMeasurement.Manga,
          punho: data.measurements?.punho ?? existingMeasurement.punho,
          Frente: data.measurements?.Frente ?? existingMeasurement.Frente,
          OmbroAOmbro:
            data.measurements?.OmbroAOmbro ?? existingMeasurement.OmbroAOmbro,
        },
      })
    } else if (data.measurements) {
      await this.prisma.measurements.create({
        data: {
          clientId: id,
          ombro: data.measurements.ombro ?? undefined,
          busto: data.measurements.busto ?? undefined,
          coOmbroCintura: data.measurements.coOmbroCintura ?? undefined,
          coOmbroCos: data.measurements.coOmbroCos ?? undefined,
          coCorpoTQC: data.measurements.coCorpoTQC ?? undefined,
          cintura: data.measurements.cintura ?? undefined,
          cos: data.measurements.cos ?? undefined,
          quadril: data.measurements.quadril ?? undefined,
          SaiaCurta: data.measurements.SaiaCurta ?? undefined,
          SaiaLonga: data.measurements.SaiaLonga ?? undefined,
          Short: data.measurements.Short ?? undefined,
          Calca: data.measurements.Calca ?? undefined,
          Vestido: data.measurements.Vestido ?? undefined,
          Manga: data.measurements.Manga ?? undefined,
          punho: data.measurements.punho ?? undefined,
          Frente: data.measurements.Frente ?? undefined,
          OmbroAOmbro: data.measurements.OmbroAOmbro ?? undefined,
        },
      })
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
        measurements: true,
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

  async toggleClienteStatus(
    id: string,
  ): Promise<{ message: string; cliente: any }> {
    const cliente = await this.prisma.client.findUnique({
      where: { id },
    })

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado')
    }

    const novoStatus = !cliente.isActive

    const clienteAtualizado = await this.prisma.client.update({
      where: { id },
      data: { isActive: novoStatus },
    })

    const message = novoStatus
      ? 'Cliente ativado com sucesso'
      : 'Cliente desativado com sucesso'

    return { message, cliente: clienteAtualizado }
  }

  async getClientesAtivos(): Promise<any[]> {
    return await this.prisma.client.findMany({
      where: { isActive: true },
    })
  }

  async findAllClient() {
    return this.prisma.client.findMany({
      include: {
        measurements: true,
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

  async SearchClients(query: string) {
    return this.prisma.client.findMany({
      where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { cpf_cnpj: { contains: query, mode: 'insensitive' } },
        { rg: { contains: query, mode: 'insensitive' } },
        { telephone_1: { contains: query, mode: 'insensitive'}},
        { telephone_2: { contains: query, mode: 'insensitive'}},
      ],}
    });
  }

  



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- PARA TESTES -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  async deleteClient(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        addressCli: true,
        measurements: true,
      },
    })

    if (!client) {
      throw new NotFoundException('Cliente não encontrado')
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
}
