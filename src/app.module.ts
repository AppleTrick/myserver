import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'park',
      password: 'postgres',
      database: 'matzip-server',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // 개발용에서만 true로
    }),
    PostModule,
  ],
})
export class AppModule {}
