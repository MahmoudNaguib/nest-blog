import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
/////////////////////////////////////////////////
import { PostModel } from './Models/PostModel';
import { PostsController } from './Controllers/PostsController';
import { MyPostsController } from './Controllers/MyPostsController';
import { PostService } from './Services/PostService';

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
