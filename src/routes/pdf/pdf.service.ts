import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer'
import { PrismaService } from 'src/prisma/prisma.service'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class PdfService {
  constructor(private prisma: PrismaService) {}

  async generateProductPdf(productId: string): Promise<Buffer> {
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
      include: {
        category: true,
        color: true,
        image: true,
        rental: true,
        spentValue: true,
        status: true,
      },
    })

    if (!product) {
      throw new Error('produto não encontrado')
    }

    const templatePath = path.join(
      __dirname,
      '../../dist/pdf/templates/Product',
      'product-template.html',
    )
    const cssPath = path.join(
      __dirname,
      '../../dist/pdf/templates/Product',
      'product-styles.css',
    )

    if (!fs.existsSync(templatePath) || !fs.existsSync(cssPath)) {
      throw new Error('Template or CSS not found')
    }

    let templateHtml = fs.readFileSync(templatePath, 'utf-8')
    const stylesCss = fs.readFileSync(cssPath, 'utf-8')

    templateHtml = templateHtml
      .replace('{{name}}', product.name)
      .replace('{{code}}', product.code)
      .replace('{{size}}', product.size)
      .replace('{{description}}', product.description)
      .replace('{{amount}}', product.amount.toString())
      .replace('{{rental}}', product.rental.rental)
      .replace('{{category}}', product.category.category)
      .replace('{{color}}', product.color.color)
      .replace('{{spentValue}}', product.spentValue.spentValue.toString())
      .replace('{{status}}', product.status.status)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(templateHtml, { waitUntil: 'networkidle0' })
    await page.addStyleTag({ content: stylesCss })
    const pdfBuffer = await page.pdf({ format: 'A4' })

    await browser.close()

    return Buffer.from(pdfBuffer)
  }

  async generateAllProductPdf(): Promise<Buffer> {
    const products = await this.prisma.products.findMany()

    if (!products || products.length === 0) {
      throw new Error('Nenhum produto encontrado')
    }

    const fs = require('fs')
    const path = require('path')
    const templatePath = path.join(
      __dirname,
      '../../dist/pdf/templates/Product',
      'allProduct-template.html',
    )
    const cssPath = path.join(
      __dirname,
      '../../dist/pdf/templates/Product',
      'allProduct-styles.css',
    )

    if (!fs.existsSync(templatePath) || !fs.existsSync(cssPath)) {
      throw new Error('Template ou CSS não encontrados')
    }

    let templateHtml = fs.readFileSync(templatePath, 'utf-8')
    const stylesCss = fs.readFileSync(cssPath, 'utf-8')

    let productsHtml = ''
    products.forEach((product) => {
      productsHtml += `
        <div class="product">
          <h2>${product.name}</h2>
          <p><strong>Código:</strong> ${product.code}</p>
          <p><strong>Tamanho:</strong> ${product.size}</p>
          <p><strong>Quantidade disponível:</strong> ${product.amount}</p>
          <p><strong>Descrição:</strong> ${product.description}</p>
        </div>
      `
    })

    templateHtml = templateHtml.replace('{{products}}', productsHtml)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(templateHtml, { waitUntil: 'networkidle0' })
    await page.addStyleTag({ content: stylesCss })
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })

    if (pdfBuffer.length === 0) {
      throw new Error('O PDF gerado está vazio.')
    }

    await browser.close()
    return Buffer.from(pdfBuffer)
  }

  async generateClientPdf(clientId: string): Promise<Buffer> {
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    })

    if (!client) {
      throw new Error('Cliente não encontrado')
    }

    const templatePath = path.join(
      __dirname,
      '../../dist/pdf/templates/Cliente',
      'client-template.html',
    )
    const cssPath = path.join(
      __dirname,
      '../../dist/pdf/templates/Cliente',
      'client-styles.css',
    )

    if (!fs.existsSync(templatePath) || !fs.existsSync(cssPath)) {
      throw new Error('Template or CSS not found')
    }

    let templateHtml = fs.readFileSync(templatePath, 'utf-8')
    const stylesCss = fs.readFileSync(cssPath, 'utf-8')

    templateHtml = templateHtml.replace('{{name}}', client.name)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(templateHtml, { waitUntil: 'networkidle0' })
    await page.addStyleTag({ content: stylesCss })
    const pdfBuffer = await page.pdf({ format: 'A4' })

    await browser.close()

    return Buffer.from(pdfBuffer)
  }

  async generateAllClientPdf(): Promise<Buffer> {
    const client = await this.prisma.client.findMany()

    if (!client || client.length === 0) {
      throw new Error('Nenhum cliente encontrado')
    }

    const fs = require('fs')
    const path = require('path')
    const templatePath = path.join(
      __dirname,
      '../../dist/pdf/templates/Cliente',
      'allClient-template.html',
    )
    const cssPath = path.join(
      __dirname,
      '../../dist/pdf/templates/Cliente',
      'allClient-styles.css',
    )

    if (!fs.existsSync(templatePath) || !fs.existsSync(cssPath)) {
      throw new Error('Template ou CSS não encontrados')
    }

    let templateHtml = fs.readFileSync(templatePath, 'utf-8')
    const stylesCss = fs.readFileSync(cssPath, 'utf-8')

    let clientsHtml = ''
    client.forEach((client) => {
      clientsHtml += `
        <div class="product">
          <h2>${client.name}</h2>
        </div>
      `
    })

    templateHtml = templateHtml.replace('{{client}}', clientsHtml)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(templateHtml, { waitUntil: 'networkidle0' })
    await page.addStyleTag({ content: stylesCss })
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })

    if (pdfBuffer.length === 0) {
      throw new Error('O PDF gerado está vazio.')
    }

    await browser.close()
    return Buffer.from(pdfBuffer)
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  async generateEmployeePdf(employeeId: string): Promise<Buffer> {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    })

    if (!employee) {
      throw new Error('Funcionário não encontrado')
    }

    const templatePath = path.join(
      __dirname,
      '../../dist/pdf/templates/Employee',
      'Employee-template.html',
    )
    const cssPath = path.join(
      __dirname,
      '../../dist/pdf/templates/Employee',
      'Employee-styles.css',
    )

    if (!fs.existsSync(templatePath) || !fs.existsSync(cssPath)) {
      throw new Error('Template or CSS not found')
    }

    let templateHtml = fs.readFileSync(templatePath, 'utf-8')
    const stylesCss = fs.readFileSync(cssPath, 'utf-8')

    templateHtml = templateHtml.replace('{{name}}', employee.name)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(templateHtml, { waitUntil: 'networkidle0' })
    await page.addStyleTag({ content: stylesCss })
    const pdfBuffer = await page.pdf({ format: 'A4' })

    await browser.close()

    return Buffer.from(pdfBuffer)
  }

  async generateAllEmployeePdf(): Promise<Buffer> {
    const employee = await this.prisma.employee.findMany()

    if (!employee || employee.length === 0) {
      throw new Error('Nenhum cliente encontrado')
    }

    const fs = require('fs')
    const path = require('path')
    const templatePath = path.join(
      __dirname,
      '../../dist/pdf/templates/Employee',
      'allEmployee-template.html',
    )
    const cssPath = path.join(
      __dirname,
      '../../dist/pdf/templates/Employee',
      'allEmployee-styles.css',
    )

    if (!fs.existsSync(templatePath) || !fs.existsSync(cssPath)) {
      throw new Error('Template ou CSS não encontrados')
    }

    let templateHtml = fs.readFileSync(templatePath, 'utf-8')
    const stylesCss = fs.readFileSync(cssPath, 'utf-8')

    let employeeHtml = ''
    employee.forEach((employee) => {
      employeeHtml += `
        <div class="product">
          <h2>${employee.name}</h2>
        </div>
      `
    })

    templateHtml = templateHtml.replace('{{employee}}', employeeHtml)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(templateHtml, { waitUntil: 'networkidle0' })
    await page.addStyleTag({ content: stylesCss })
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })

    if (pdfBuffer.length === 0) {
      throw new Error('O PDF gerado está vazio.')
    }

    await browser.close()
    return Buffer.from(pdfBuffer)
  }
}
