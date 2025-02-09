import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedeemService } from './redeem.service';
import { RedeemController } from './redeem.controller';
import { User } from '../user/user.entity/user.entity';
import { Gift } from '../gift/entities/gift.entity';
import { Redeem } from './entities/redeem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Gift, Redeem])],
  controllers: [RedeemController],
  providers: [RedeemService],
  exports: [RedeemService],
})
export class RedeemModule {}
