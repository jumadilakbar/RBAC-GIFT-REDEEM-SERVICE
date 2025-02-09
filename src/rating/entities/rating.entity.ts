import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Gift } from '../../gift/entities/gift.entity';
import { User } from '../../user/user.entity/user.entity';
import { BaseEntity } from '../../config/entity/base.entity';

@Entity('ratings')
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'decimal', scale: 2 })
  score: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Index()
  @ManyToOne(() => Gift, (gift) => gift.ratings, { onDelete: 'CASCADE' })
  gift: Gift;

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  user: User;
}
