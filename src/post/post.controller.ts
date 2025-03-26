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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/markers')
  getAllMarkers() {
    return this.postService.getAllMarkers();
  }

  @Get('/posts') // 만약에 데코레이터엔 @Controller('post') 라고 정의하고 @Get('/posts') 을 정의한다면 엔드포인트가 post/posts 가 되기 때문에 데코레이터 부분은 지워준다.
  getPosts(@Query('page') page: number) {
    return this.postService.getPosts(page);
  }

  @Get('/posts/:id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  // DTO 란 Data Transper Object로 데이터가 전송되는 방법을 정의하는 객체
  @Post('/posts')
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Delete('/posts/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }

  @Patch('/posts/:id')
  @UsePipes(ValidationPipe)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>
  ) {
    return this.postService.updatePost(id, updatePostDto);
  }
}
