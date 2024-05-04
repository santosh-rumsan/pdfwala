import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { PdfMakeService } from './pdf.service';
import { CreatePdfDto } from './dto/create.pdfmake.dto';
import * as fs from 'fs';
import * as path from 'path';

@Controller('pdfmake')
export class PdfMakeController {
  constructor(private readonly pdfService: PdfMakeService) {}

  @Get()
  getPdf(@Res() response: Response) {
    //const pdfDoc = this.pdfService.getPdf();
    //pdfDoc.pipe(response);
    //pdfDoc.end();
  }
  @Post('/generate')
  async generatePdf(
    @Body() createPdfDto: CreatePdfDto,
    @Res() response: Response,
  ) {
    const pdfDoc = this.pdfService.generatePdf(createPdfDto);

    pdfDoc.pipe(response);
    const outputFolder = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'pdfmake',
      'output',
    );
    const outputFileName = 'document.pdf';
    const outputFile = path.join(outputFolder, outputFileName);
    const fileStream = fs.createWriteStream(outputFile);
    pdfDoc.pipe(fileStream);
    pdfDoc.end();
    return { message: 'PDF generated and saved successfully' };
  }
}
