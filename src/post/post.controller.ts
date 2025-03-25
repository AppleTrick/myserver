import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/posts') // 만약에 데코레이터엔 @Controller('post') 라고 정의하고 @Get('/posts') 을 정의한다면 엔드포인트가 post/posts 가 되기 때문에 데코레이터 부분은 지워준다.
  getPosts() {
    return this.postService.getPosts();
  }
}
