import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from './entities/gift.entity';
// import { Console } from 'console';

@Injectable()
export class GiftService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
  ) {}
  async create(createGiftDto: CreateGiftDto): Promise<Gift> {
    // async create(giftData: Partial<Gift>): Promise<Gift> {
    console.log('Data to Save:', createGiftDto);
    // const gift = this.giftRepository.create(createGiftDto);
    return await this.giftRepository.save(createGiftDto);
  }
  async findAll(
    dateSort: 'asc' | 'desc' = 'asc',
    minRating?: number,
    sortBy?: 'averageRating' | 'minRating' | 'date',
    order: 'ASC' | 'DESC' = 'ASC',
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: any[]; total: number }> {
    const query = this.giftRepository
      .createQueryBuilder('gift')
      .leftJoin('gift.ratings', 'rating')
      .select([
        'gift.id AS gift_id',
        'gift.name AS gift_name',
        'gift.stock AS gift_stock',
        'gift.point AS gift_point',
        'gift.desc AS gift_desc',
        'gift.label AS gift_label',
        'gift.status AS gift_status',
        'gift.filePath AS gift_filepath',
        'gift.createdAt AS gift_createdat',
        'COALESCE(AVG(rating.score), 0) AS averagerating', // Calculate average rating
        'COALESCE(MIN(rating.score), 0) AS minRating', // Calculate minimum rating
      ])
      .groupBy('gift.id')
      .orderBy('gift.createdAt', dateSort.toUpperCase() as 'ASC' | 'DESC');
    // Apply minimum rating filter
    if (minRating) {
      query.having('COALESCE(MIN(rating.score), 0) >= :minRating', {
        minRating,
      });
    }

    // Apply sorting
    if (sortBy) {
      const sortField =
        sortBy === 'averageRating' ? 'averageRating' : 'minRating';
      query.orderBy(sortField, order.toUpperCase() as 'DESC' | 'ASC');
    }
    // else {
    //   query.orderBy('gift.id', 'ASC'); // Default sorting by gift ID
    // }
    // Pagination
    const total = await query.getCount();
    query.skip((page - 1) * limit).take(limit);
    // Execute query
    const rawData = await query.getRawMany();
    const default_file = 'uploads/default.png';
    const data = rawData.map((row) => ({
      id: row.gift_id,
      name: row.gift_name,
      stock: row.gift_stock,
      point: row.gift_point,
      desc: row.gift_desc,
      label: row.gift_label,
      status: row.gift_status,
      filePath: row.gift_filepath ? row.gift_filepath : default_file,
      createdAt: row.gift_createdat,
      averageRating:
        this.calculateStars(Number(row.averagerating)).toFixed(1) || 0,
    }));
    return { data, total };
  }

  calculateStars(rating) {
    // Membulatkan rating ke satuan pecahan terdekat 0.5
    return Math.round(rating * 2) / 2;
  }

  async findOne(id: number) {
    const gift = await this.giftRepository
      .createQueryBuilder('gift')
      .leftJoinAndSelect('gift.ratings', 'rating') // Ambil semua rating terkait
      .addSelect('COALESCE(AVG(rating.score), 0)', 'averagerating') // Hitung rata-rata
      .where('gift.id = :id', { id })
      .groupBy('gift.id')
      .addGroupBy('rating.id')
      .getOne();

    if (!gift) {
      throw new NotFoundException(`Gift with ID ${id} not found`);
    }

    // Tambahkan rata-rata rating jika perlu
    const averageRatingQuery = await this.giftRepository
      .createQueryBuilder('gift')
      .leftJoin('gift.ratings', 'rating')
      .select('COALESCE(AVG(rating.score), 0)', 'averagerating')
      .where('gift.id = :id', { id })
      .getRawOne();

    return {
      ...gift,
      averagerating: this.calculateStars(
        Number(averageRatingQuery.averagerating).toFixed(1) || 0,
      ),
    };
  }
  async update(
    id: number,
    updateGiftDto: UpdateGiftDto,
    file?: Express.Multer.File,
  ) {
    const gift = await this.giftRepository.findOne({ where: { id } });
    if (!gift) {
      throw new NotFoundException(`Gift with ID ${id} not found`);
    }
    console.log('Data to Save:', updateGiftDto, file.filename);

    if (file) {
      updateGiftDto.filePath = file.path;
    }

    Object.assign(gift, updateGiftDto);
    return this.giftRepository.save(gift);
  }

  async partialUpdate(id: number, partialUpdateDto: Partial<UpdateGiftDto>) {
    const gift = await this.giftRepository.findOne({ where: { id } });
    if (!gift) {
      throw new NotFoundException(`Gift with ID ${id} not found`);
    }

    Object.assign(gift, partialUpdateDto);
    return this.giftRepository.save(gift);
  }
  async remove(id: number): Promise<void> {
    await this.giftRepository.delete(id);
  }
}
