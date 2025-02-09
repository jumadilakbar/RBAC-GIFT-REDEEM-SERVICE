import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateRedeemDto } from './dto/create-redeem.dto';
import { UpdateRedeemDto } from './dto/update-redeem.dto';
import { User } from '../user/user.entity/user.entity';
import { Gift } from '../gift/entities/gift.entity';
import { Redeem } from './entities/redeem.entity';

@Injectable()
export class RedeemService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    @InjectRepository(Redeem)
    private readonly redeemedGiftRepository: Repository<Redeem>,
  ) {}
  async redeemGift(
    userId: number,
    giftId: number,
    quantity: number,
  ): Promise<{ message: string; redeemedGift: Redeem }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const gift = await this.giftRepository.findOne({ where: { id: giftId } });
    try {
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!gift) {
        throw new NotFoundException('Gift not found');
      }

      if (gift.stock <= 0) {
        throw new BadRequestException('Gift is out of stock');
      }

      if (user.points < gift.point) {
        throw new BadRequestException('Not enough points to redeem this gift');
      }

      // Deduct points and stock
      user.points -= gift.point * quantity;
      gift.stock -= quantity;

      await this.userRepository.save(user);
      await this.giftRepository.save(gift);
      // Save to RedeemedGifts
      const redeemedGift = this.redeemedGiftRepository.create({
        user,
        gift,
      });
      await this.redeemedGiftRepository.save(redeemedGift);
      return {
        message: `Gift "${gift.name}" successfully redeemed by user "${user.username}"`,
        redeemedGift,
      };
      // return `Gift "${gift.name}" successfully redeemed by user "${user.username}"`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  // create(createRedeemDto: CreateRedeemDto) {
  //   return `This action adds a new redeem ${createRedeemDto}`;
  // }

  findAll() {
    return this.redeemedGiftRepository.find();
  }

  async findRedeemsByUser(userId: number): Promise<Redeem[]> {
    return this.redeemedGiftRepository.find({
      where: { user: { id: userId } },
      relations: ['gift'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} redeem`;
  }

  update(id: number, updateRedeemDto: UpdateRedeemDto) {
    return `This action updates a #${id} redeem ${updateRedeemDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} redeem`;
  }
}
