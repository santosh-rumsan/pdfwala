import { Module } from '@nestjs/common';

import { PdfMakeController } from './pdf.controller';
import { PdfMakeService } from './pdf.service';

@Module({
  providers: [PdfMakeService],
  controllers: [PdfMakeController],
})
export class PdfMakeModule {}
