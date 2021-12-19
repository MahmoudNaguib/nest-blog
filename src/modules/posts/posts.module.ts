import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
/////////////////////////////////////////////////
import { PostModel } from './models/post.model';
import { PostsController } from './controllers/posts.controller';
import { MyPostsController } from './controllers/my-posts.controller';
import { PostService } from './services/post.service';

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'public/uploads',
    }),
    TypeOrmModule.forFeature([PostModel]),
  ],
  controllers: [PostsController, MyPostsController],
  providers: [PostService],
  exports: [PostService],
})
export class PostsModule {}
