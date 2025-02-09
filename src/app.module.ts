import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GiftModule } from './gift/gift.module';
import { RatingModule } from './rating/rating.module';
import { RedeemModule } from './redeem/redeem.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.TYPEORM_SYNC === 'true',
    }),
    AuthModule,
    UserModule,
    GiftModule,
    RatingModule,
    RedeemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
