import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
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
        this.prisma.cep,
        { cep: data.address.cep.cep },
        { cep: data.address.cep.cep },
      )
      const street = await createOrUpdate(
        this.prisma.street,
        { street: data.address.street.street },
        { street: data.address.street.street },
      )
      const city = await createOrUpdate(
        this.prisma.city,
        { city: data.address.city.city },
        { city: data.address.city.city },
      )
      const state = await createOrUpdate(
        this.prisma.state,
        { state: data.address.state.state },
        { state: data.address.state.state },
      )
      const bairro = await createOrUpdate(
        this.prisma.bairro,
        { bairro: data.address.bairro.bairro },
        { bairro: data.address.bairro.bairro },
      )

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
      })

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
          addressId: address.id,
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
      })
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao criar cliente: ${error.message}`,
      )
    }
  }

  async updateCliente(id: string, data: UpdateClientDto) {
    try {
      const existingClient = await this.prisma.client.findUnique({
        where: { id },
      })

      if (!existingClient) {
        throw new Error('Cliente não encontrado.')
      }
      const cep = await createOrUpdate(
        this.prisma.cep,
        { cep: data.address.cep.cep },
        { cep: data.address.cep.cep },
      )
      const street = await createOrUpdate(
        this.prisma.street,
        { street: data.address.street.street },
        { street: data.address.street.street },
      )
      const city = await createOrUpdate(
        this.prisma.city,
        { city: data.address.city.city },
        { city: data.address.city.city },
      )
      const state = await createOrUpdate(
        this.prisma.state,
        { state: data.address.state.state },
        { state: data.address.state.state },
      )
      const bairro = await createOrUpdate(
        this.prisma.bairro,
        { bairro: data.address.bairro.bairro },
        { bairro: data.address.bairro.bairro },
      )

      let address
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
        })
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
        })

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
          })
        }
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
            coOmbroCintura: data.measurements?.coOmbroCintura ?? existingMeasurement.coOmbroCintura,
            coOmbroCos: data.measurements?.coOmbroCos ?? existingMeasurement.coOmbroCos,
            coCorpoTQC: data.measurements?.coCorpoTQC ?? existingMeasurement.coCorpoTQC,
            cintura: data.measurements?.cintura ?? existingMeasurement.cintura,
            cos: data.measurements?.cos ?? existingMeasurement.cos,
            quadril: data.measurements?.quadril ?? existingMeasurement.quadril,
            SaiaCurta: data.measurements?.SaiaCurta ?? existingMeasurement.SaiaCurta,
            SaiaLonga: data.measurements?.SaiaLonga ?? existingMeasurement.SaiaLonga,
            Short: data.measurements?.Short ?? existingMeasurement.Short,
            Calca: data.measurements?.Calca ?? existingMeasurement.Calca,
            Vestido: data.measurements?.Vestido ?? existingMeasurement.Vestido,
            Manga: data.measurements?.Manga ?? existingMeasurement.Manga,
            punho: data.measurements?.punho ?? existingMeasurement.punho,
            Frente: data.measurements?.Frente ?? existingMeasurement.Frente,
            OmbroAOmbro: data.measurements?.OmbroAOmbro ?? existingMeasurement.OmbroAOmbro,
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
          addressId: address.id,
        },
        include: {
          measurements: true,
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
      })
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao atualizar cliente: ${error.message}`,
      )
    }
  }

  async toggleClienteStatus(
    id: string,
  ): Promise<{ message: string; cliente: any }> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao alterar status do cliente: ${error.message}`,
      )
    }
  }

  async getClientesAtivos(): Promise<any[]> {
    try {
      return await this.prisma.client.findMany({
        where: { isActive: true },
      })
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao buscar clientes ativos: ${error.message}`,
      )
    }
  }

  async findAllClient() {
    try {
      return await this.prisma.client.findMany({
        include: {
          measurements: true,
          address: {
            include: {
              cep: true,
              street: true,
              city: true,
              state: true,
              bairro: true,
            },
          },
        },
      })
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao buscar clientes: ${error.message}`,
      )
    }
  }

  async findClient(id: string) {
    try {
      return await this.prisma.client.findUnique({
        where: { id},
        include: {
          measurements: true,
          address: {
            include: {
              cep: true,
              street: true,
              city: true,
              state: true,
              bairro: true,
            },
          },
        },
      })
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao buscar clientes: ${error.message}`,
      )
    }
  }




  async SearchClients(query: string) {
    try {
      return await this.prisma.client.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { cpf_cnpj: { contains: query, mode: 'insensitive' } },
            { rg: { contains: query, mode: 'insensitive' } },
            { telephone_1: { contains: query, mode: 'insensitive' } },
            { telephone_2: { contains: query, mode: 'insensitive' } },
          ],
        },
      })
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao buscar clientes com a query '${query}': ${error.message}`,
      )
    }
  }

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- PARA TESTES -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  async deleteClient(id: string) {
    try {
      const client = await this.prisma.client.findUnique({
        where: { id },
        include: {
          address: true,
          measurements: true,
        },
      })

      if (!client) {
        throw new NotFoundException('Cliente não encontrado.')
      }

      await this.prisma.client.delete({
        where: { id },
      })

      if (client.address) {
        await this.prisma.address.delete({
          where: { id: client.address.id },
        })
      }

      return { message: 'Cliente deletado com sucesso' }
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao deletar cliente: ${error.message}`,
      )
    }
  }

  async deleteAddress(id: string) {
    try {
      const numericId = parseInt(id, 10)

      if (isNaN(numericId)) {
        throw new BadRequestException('ID inválido')
      }

      const addressCli = await this.prisma.address.findUnique({
        where: { id: numericId },
        include: { Client: true },
      })

      if (!addressCli) {
        throw new NotFoundException('Endereço não encontrado')
      }

      if (addressCli.Client && addressCli.Client.length > 0) {
        throw new ConflictException(
          'Endereço não pode ser deletado pois está associado a um cliente',
        )
      }

      await this.prisma.address.delete({
        where: { id: numericId },
      })

      return { message: 'Endereço deletado com sucesso', address: addressCli }
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar endereço: ' + error.message,
      )
    }
  }

  async findAllAddresses() {
    try {
      return await this.prisma.address.findMany({
        include: {
          cep: true,
          street: true,
          city: true,
          state: true,
          bairro: true,
        },
      })
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar endereços: ' + error.message,
      )
    }
  }
}
