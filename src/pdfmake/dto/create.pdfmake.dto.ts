import { IsString } from 'class-validator';

export class CreatePdfDto {
  @IsString()
  name: string;
  @IsString()
  location: string;
  @IsString()
  dob: string;
  @IsString()
  email: string;
  @IsString()
  phone: string;
}
