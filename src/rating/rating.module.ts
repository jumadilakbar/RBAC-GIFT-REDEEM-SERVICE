import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { User } from '../user/user.entity/user.entity';
import { Gift } from '../gift/entities/gift.entity';
import { Redeem } from 'src/redeem/entities/redeem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, User, Gift, Redeem])],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
