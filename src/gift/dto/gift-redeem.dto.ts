import { IsNotEmpty } from 'class-validator';

export class CreateRedeemGiftDto {
  @IsNotEmpty()
  quantity: number;
}
