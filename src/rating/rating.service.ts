import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';
import { User } from '../user/user.entity/user.entity';
import { Gift } from '../gift/entities/gift.entity';
import { Redeem } from 'src/redeem/entities/redeem.entity';
@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    @InjectRepository(Redeem)
    private readonly redeemRepository: Repository<Redeem>,
  ) {}
  // create(createRatingDto: CreateRatingDto) {
  //   return 'This action adds a new rating ';
  // }

  // findAll() {
  //   return `This action returns all rating`;
  // }
  async create(
    userId: number,
    giftId: number,
    score: number,
    comment?: string,
  ): Promise<Rating> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const gift = await this.giftRepository.findOne({ where: { id: giftId } });
    const redeemedGift = await this.redeemRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!gift) {
      throw new NotFoundException('Gift not found');
    }
    if (!redeemedGift) {
      throw new NotFoundException('Gift not redeemed');
    }
    const rating = this.ratingRepository.create({ score, comment, user, gift });
    return this.ratingRepository.save(rating);
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingRepository.find({ relations: ['user', 'gift'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating ${updateRatingDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
