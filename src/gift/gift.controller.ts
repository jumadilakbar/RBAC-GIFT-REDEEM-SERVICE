import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GiftService } from './gift.service';

import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { JwtAuthGuard } from '../auth/jwt.strategy/jwt-auth.guard';
import { RedeemService } from '../redeem/redeem.service';
import { RatingService } from '../rating/rating.service';
import { CreateRedeemGiftDto } from './dto/gift-redeem.dto';
import { CreateRatingGiftDto } from './dto/gift-rating.dto';
// import { Gift } from './entities/gift.entity';

@Controller('gift')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GiftController {
  constructor(
    private readonly giftService: GiftService,
    private readonly redeemService: RedeemService,
    private readonly ratingService: RatingService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('filePath', {
      storage: diskStorage({
        destination: './uploads/gifts', // Directory to save uploaded files
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
      },
    }),
  )
  @Roles('admin')
  async create(
    @Body() createGiftDto: CreateGiftDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('file', createGiftDto);
    const filePath = file?.path || null;
    return this.giftService.create({ ...createGiftDto, filePath });
  }

  // @UseGuards(JwtAuthGuard)
  @Roles('admin', 'user')
  @Post(':id/redeem')
  async redeem(
    @Param('id') giftId: number,
    @Request() req,
    @Body() createRedeemGift: CreateRedeemGiftDto,
    // @Body('quantity') quantity: number,
  ) {
    // return { request: req.user?.userId, gift: id };
    console.log('redeem giftId', giftId);
    return this.redeemService.redeemGift(
      req.user?.userId,
      giftId,
      createRedeemGift.quantity,
    );
  }
  @Roles('admin', 'user')
  @Post(':id/rating')
  async rating(
    @Param('id') giftId: number,
    @Request() req,
    @Body() createRatingGift: CreateRatingGiftDto,
    // @Body('quantity') quantity: number,
  ) {
    return this.ratingService.create(
      req.user?.userId,
      giftId,
      createRatingGift.score,
      createRatingGift.comment,
    );
  }

  @Roles('admin', 'user')
  @Get()
  async findAll(
    @Query('dateSort') dateSort: 'asc' | 'desc' = 'asc',
    @Query('minRating') minRating?: number,
    @Query('sortBy') sortBy?: 'averageRating' | 'minRating',
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const { data, total } = await this.giftService.findAll(
      dateSort,
      minRating,
      sortBy,
      order,
      page,
      limit,
    );
    return { total, data, page, limit };
  }

  @Roles('admin', 'user')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.giftService.findOne(id);
  }

  // PUT: Update seluruh data gift
  @Roles('admin')
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('filePath', {
      storage: diskStorage({
        destination: './uploads/gifts', // Directory to save uploaded files
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
      },
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() updateGiftDto: UpdateGiftDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.giftService.update(id, updateGiftDto, file);
  }
  // PATCH: Update sebagian data gift
  @Roles('admin')
  @Patch(':id')
  async partialUpdate(
    @Param('id') id: number,
    @Body() partialUpdateDto: Partial<UpdateGiftDto>,
  ) {
    return this.giftService.partialUpdate(id, partialUpdateDto);
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.giftService.remove(id);
  }
}
