// 데이터베이스 테이블을 만들어주는 역할

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MarkerColor } from './marker-color.enum';
import { ColumnNumericTransformer } from 'src/@common/transformers/numeric.transformer';
import { User } from 'src/auth/user.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  latitude: number;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  longitude: number;

  @Column()
  color: MarkerColor;

  @Column()
  address: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  //  Post 와 User 테이블간의 관계 설정
  @ManyToOne(() => User, (user) => user.post, { eager: false })
  user: User;
}
