import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class pdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('product/:id')
  async getProductPdf(@Param('id') productId: string, @Res() res: Response) {
    try {
      const pdfData = await this.pdfService.generateProductPdf(productId);
      res.set({
        'Content-Type': 'application/pdf', 
        'Content-Disposition': `attachment; filename=aluguel-${productId}.pdf`, 
      });

      res.send(pdfData);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  @Get('product')
async getAllProductPdf(@Res() res: Response) {
  try {
    const pdfData = await this.pdfService.generateAllProductPdf();

    if (pdfData.length === 0) {
      throw new Error('O PDF gerado está vazio.');
    }

    const fileName = `relatorio_produtos_${new Date().toISOString().split('T')[0]}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${fileName}`,
    });

    res.send(pdfData); 
  } catch (error) {
    console.error('Erro ao gerar PDF:', error.message);
    res.status(500).send({ error: error.message });
  }
}

}
