import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class pdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get(':id')
  async getRentalPdf(@Param('id') rentalId: string, @Res() res: Response) {
    try {
      // Gera o PDF a partir do aluguel
      const pdfData = await this.pdfService.generateRentalPdf(rentalId);

      // Configura o cabeçalho para que o navegador faça o download do arquivo PDF
      res.set({
        'Content-Type': 'application/pdf', // Define o tipo do conteúdo
        'Content-Disposition': `attachment; filename=aluguel-${rentalId}.pdf`, // Define o nome do arquivo para download
      });

      // Envia os dados binários do PDF como resposta
      res.send(pdfData);
    } catch (error) {
      // Em caso de erro, envia a mensagem de erro
      res.status(500).send({ error: error.message });
    }
  }
}
