import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/entity/base.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Redeem } from 'src/redeem/entities/redeem.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column()
  role: string; // e.g., 'user', 'admin'\

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Redeem, (redeem) => redeem.user)
  redeems: Redeem[];
}
