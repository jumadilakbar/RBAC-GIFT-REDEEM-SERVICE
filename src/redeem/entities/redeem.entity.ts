import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/user.entity/user.entity';
import { Gift } from '../../gift/entities/gift.entity';
@Entity('redeemed_gifts')
export class Redeem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.redeems, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Gift, { onDelete: 'CASCADE' })
  gift: Gift;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  redeemedAt: Date;
}
