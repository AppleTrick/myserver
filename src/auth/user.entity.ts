import { MarkerColor } from 'src/post/marker-color.enum';
import { Post } from 'src/post/post.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loginType: 'email' | 'kakao' | 'apple';

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  imageUri?: string;

  @Column({ nullable: true })
  kakaoImageUri?: string;

  @Column({ nullable: true, default: '' })
  [MarkerColor.RED]: string;

  @Column({ nullable: true, default: '' })
  [MarkerColor.YELLOW]: string;

  @Column({ nullable: true, default: '' })
  [MarkerColor.BLUE]: string;

  @Column({ nullable: true, default: '' })
  [MarkerColor.GREEN]: string;

  @Column({ nullable: true, default: '' })
  [MarkerColor.PURPLE]: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ nullable: true })
  hashedRefreshToken?: string;

  //  User 와 Post 테이블간의 관계 설정
  @OneToMany(() => Post, (post) => post.user, { eager: false })
  post: Post[];
}
