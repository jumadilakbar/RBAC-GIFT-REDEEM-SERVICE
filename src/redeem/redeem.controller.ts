import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RedeemService } from './redeem.service';
// import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt.strategy/jwt-auth.guard';

// import { CreateRedeemDto } from './dto/create-redeem.dto';
import { UpdateRedeemDto } from './dto/update-redeem.dto';

@Controller('redeem')
export class RedeemController {
  constructor(private readonly redeemService: RedeemService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':giftId')
  async redeem(
    @Request() req,
    // @Param('userId') userId: number,
    @Param('giftId') giftId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.redeemService.redeemGift(req.user?.userId, giftId, quantity);
  }
  @Get()
  findAll() {
    return this.redeemService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async findRedeemsByUser(@Param('userId') userId: number) {
    return this.redeemService.findRedeemsByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redeemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRedeemDto: UpdateRedeemDto) {
    return this.redeemService.update(+id, updateRedeemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.redeemService.remove(+id);
  }
}
