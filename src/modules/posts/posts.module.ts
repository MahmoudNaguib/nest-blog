import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './models/post.model';
import { PostsController } from './controllers/posts.controller';
import { MyPostsController } from './controllers/my-posts.controller';
import { PostService } from './services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostModel])],
  controllers: [PostsController, MyPostsController],
  providers: [PostService],
  exports: [],
})
export class PostsModule {}
