import * as PdfPrinter from 'pdfmake';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class PdfMakeService {
  // getPdf() {
  //   const fonts = {
  //     Helvetica: {
  //       normal: 'Helvetica',
  //       bold: 'Helvetica-Bold',
  //       italics: 'Helvetica-Oblique',
  //       bolditalics: 'Helvetica-BoldOblique',
  //     },
  //   };
  //   const printer = new PdfPrinter(fonts);
  //   const docDefinition = {
  //     content: [
  //       { text: 'Heading', fontSize: 25 },
  //       {
  //         layout: 'lightHorizontalLines', // optional
  //         table: {
  //           headerRows: 1,
  //           widths: ['*', 'auto', 100, '*'],

  //           body: [
  //             ['First', 'Second', 'Third', 'The last one'],
  //             ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
  //             ['Val 1', 'Val 2', 'Val 3', 'Val 4'],
  //           ],
  //         },
  //       },
  //       { text: 'google', link: 'http://google.com', pageBreak: 'before' },
  //       { qr: 'text in QR', foreground: 'green', background: 'white' },
  //     ],
  //     defaultStyle: {
  //       font: 'Helvetica',
  //     },
  //   };

  //   const options = {};

  //   return printer.createPdfKitDocument(docDefinition, options);
  // }
  generatePdf(createPdfDto) {
    const nameParts = createPdfDto.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    const fonts = {
      Roboto: {
        normal: path.join(
          __dirname,
          '..',
          '..',
          'src',
          'pdfmake',
          'template',
          'Roboto-Regular.ttf',
        ),
      },
    };
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'pdfmake',
      'template',
      'grande-empty.png',
    );
    const checkMarkPath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'pdfmake',
      'template',
      'black-checkmark.png',
    );
    const secondPage = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'pdfmake',
      'template',
      'Grande-sec.jpg',
    );
    const printer = new PdfPrinter(fonts);
    const docDefinition = {
      pageMargins: [0, 0, 0, 0],
      pageSize: {
        width: 300,
        height: 'auto',
      },
      content: [
        {
          image: imagePath,
          fit: [300, 420],
        },
        {
          text: firstName,
          font: 'Roboto',
          alignment: 'center',
          fontSize: 4.5,
          absolutePosition: { x: -130, y: 93 },
        },
        {
          text: lastName,
          font: 'Roboto',
          alignment: 'center',
          fontSize: 4.5,
          absolutePosition: { x: -130, y: 103 },
        },
        {
          text: createPdfDto.location,
          font: 'Roboto',
          alignment: 'center',
          fontSize: 4.5,
          absolutePosition: { x: -130, y: 119 },
        },
        {
          text: createPdfDto.email,
          font: 'Roboto',
          alignment: 'center',
          fontSize: 4.5,
          absolutePosition: { x: -130, y: 138 },
        },
        {
          text: createPdfDto.dob,
          font: 'Roboto',
          alignment: 'center',
          fontSize: 4.5,
          absolutePosition: { x: 120, y: 93 },
        },

        createPdfDto.gender === 'F'
          ? {
              image: checkMarkPath,
              fit: [5, 5],
              absolutePosition: { x: 218, y: 101 },
            }
          : createPdfDto.gender === 'M'
          ? {
              image: checkMarkPath,
              fit: [5, 5],
              absolutePosition: { x: 195, y: 101 },
            }
          : null,
        {
          text: createPdfDto.phone,
          font: 'Roboto',
          alignment: 'center',
          fontSize: 4.5,
          absolutePosition: { x: 120, y: 114 },
          pageBreak: 'after',
        },
        {
          image: secondPage, // Second page image
          fit: [300, 420],
        },
      ],
    };
    const options = {};

    return printer.createPdfKitDocument(docDefinition, options);
  }
}
