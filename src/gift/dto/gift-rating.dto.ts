import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRatingGiftDto {
  @IsNotEmpty()
  score: number;

  @IsOptional()
  comment?: string;
}
