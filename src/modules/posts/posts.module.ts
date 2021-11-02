import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/posts.controller';
import { PostService } from './services/post.service';
import { PostModel } from './models/post.model';
import { MyPostsController } from './controllers/my-posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostModel])],
  controllers: [PostsController, MyPostsController],
  providers: [PostService],
  exports: [PostService],
})
export class PostsModule {}
