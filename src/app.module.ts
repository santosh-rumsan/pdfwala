import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfMakeModule } from './pdfmake/pdf.module';
import { PdfModule } from './pdf/pdf.module';
import { TemplatesModule } from './templates/templates.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PdfMakeModule,
    PdfModule,
    TemplatesModule,
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
