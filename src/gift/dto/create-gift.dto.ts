import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGiftDto {
  @IsString()
  name: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  point: number;

  @IsString()
  desc: string;

  @IsString()
  label: string;

  @IsString()
  status: boolean;

  @IsOptional()
  @IsString()
  filePath?: string; // Optional to store the file path
}
