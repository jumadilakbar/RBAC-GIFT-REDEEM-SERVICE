import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { JwtAuthGuard } from '../auth/jwt.strategy/jwt-auth.guard';

import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('rating')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @Roles('admin')
  async create(
    @Body('user_id') userId: number,
    @Body('gift_id') giftId: number,
    @Body('score') score: number,
    @Body('comment') comment?: string,
  ) {
    return this.ratingService.create(userId, giftId, score, comment);
  }

  @Get()
  async findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
