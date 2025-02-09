import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gift } from './entities/gift.entity';
import { GiftService } from './gift.service';
import { GiftController } from './gift.controller';
import { User } from '../user/user.entity/user.entity';
import { Redeem } from '../redeem/entities/redeem.entity';
import { RedeemModule } from 'src/redeem/redeem.module';
import { RatingModule } from 'src/rating/rating.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Gift, User, Redeem]),
    RedeemModule,
    RatingModule,
  ],
  controllers: [GiftController],
  providers: [GiftService],
})
export class GiftModule {}
