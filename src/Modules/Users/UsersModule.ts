import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
////////////////////////////////////////////////
import { UserModel } from './Models/UserModel';
import { AuthController } from './Controllers/AuthController';
import { ProfileController } from './Controllers/ProfileController';

import { AuthService } from './Services/AuthService';
import { ProfileService } from './Services/ProfileService';

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'public/uploads',
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, ProfileService],
  exports: [AuthService],
})
export class UsersModule {}
