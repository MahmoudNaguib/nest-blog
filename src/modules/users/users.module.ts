import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './models/user.model';
import { AuthController } from './controllers/auth.controller';
import { ProfileController } from './controllers/profile.controller';

import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [AuthController, ProfileController],
  providers: [UserService, AuthService, ProfileService],
  exports: [AuthService],
})
export class UsersModule {}
