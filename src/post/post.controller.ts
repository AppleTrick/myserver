import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/@common/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller()
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/markers/my')
  getAllMarkers(@GetUser() user: User) {
    return this.postService.getAllMarkers(user);
  }

  @Get('/posts/my') // 만약에 데코레이터엔 @Controller('post') 라고 정의하고 @Get('/posts') 을 정의한다면 엔드포인트가 post/posts 가 되기 때문에 데코레이터 부분은 지워준다.
  getPosts(@Query('page') page: number, @GetUser() user: User) {
    return this.postService.getPosts(page, user);
  }

  @Get('/posts/:id')
  getPostById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.postService.getPostById(id, user);
  }

  // DTO 란 Data Transper Object로 데이터가 전송되는 방법을 정의하는 객체
  @Post('/posts')
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.createPost(createPostDto, user);
  }

  @Delete('/posts/:id')
  deletePost(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.postService.deletePost(id, user);
  }

  @Patch('/posts/:id')
  @UsePipes(ValidationPipe)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>,
    @GetUser() user: User
  ) {
    return this.postService.updatePost(id, updatePostDto, user);
  }
}
