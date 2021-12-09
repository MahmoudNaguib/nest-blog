import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './models/post.model';
import { PostsController } from './controllers/posts.controller';
import { MyPostsController } from './controllers/my-posts.controller';
import { PostService } from './services/post.service';
import {
  FileSystemStoredFile,
  MemoryStoredFile,
  NestjsFormDataModule,
} from 'nestjs-form-data';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostModel]),
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'uploads',
    }),
  ],
  controllers: [PostsController, MyPostsController],
  providers: [PostService],
  exports: [PostService],
})
export class PostsModule {}
