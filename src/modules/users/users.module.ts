import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserModel } from './models/user.model';
import { AuthController } from './controllers/auth.controller';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [AuthController, ProfileController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
