import { Module } from '@nestjs/common';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
////////////////////////////////////////////////
import { UserModel } from './models/user.model';
import { AuthController } from './controllers/auth.controller';
import { ProfileController } from './controllers/profile.controller';

import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'uploads',
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, ProfileService],
  exports: [AuthService],
})
export class UsersModule {}
