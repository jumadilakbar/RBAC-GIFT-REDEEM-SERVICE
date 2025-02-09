import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rating } from '../../rating/entities/rating.entity';
import { BaseEntity } from '../../config/entity/base.entity';

@Entity('gifts')
export class Gift extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'int' })
  point: number;

  @Column({ type: 'text', nullable: true })
  desc: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  label: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => Rating, (rating) => rating.gift)
  ratings: Rating[];

  @Column({ type: 'text', nullable: true })
  filePath: string;
}
