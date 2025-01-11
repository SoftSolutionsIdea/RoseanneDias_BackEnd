import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
  constructor(private prisma: PrismaService) {}

  async generateRentalPdf(productId: string): Promise<Buffer> {
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
      include: {
        category: true,
        color: true,
        image: true,
        rental: true,
        spentValue: true,
        status: true
      },
    });

    if (!product) {
      throw new Error('Aluguel não encontrado');
    }

    const templatePath = path.join(__dirname, '../../dist/pdf/templates', 'rental-template.html');
    const cssPath = path.join(__dirname, '../../dist/pdf/templates', 'styles.css');

    if (!fs.existsSync(templatePath) || !fs.existsSync(cssPath)) {
      throw new Error('Template or CSS not found');
    }

    let templateHtml = fs.readFileSync(templatePath, 'utf-8');
    const stylesCss = fs.readFileSync(cssPath, 'utf-8');

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
      .replace('{{status}}', product.status.status);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(templateHtml, { waitUntil: 'networkidle0' });
    await page.addStyleTag({ content: stylesCss });
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    return Buffer.from(pdfBuffer);
  }
}
