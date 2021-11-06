import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ProfileController } from './modules/users/controllers/profile.controller';
import { MyPostsController } from './modules/posts/controllers/my-posts.controller';

import { HomeModule } from './modules/home/home.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { SectionsModule } from './modules/sections/sections.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(<string>process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE == 'true',
      entities: [],
      autoLoadEntities: true,
      logger: 'advanced-console',
      logging: ['warn', 'error'],
    }),
    HomeModule,
    UsersModule,
    PostsModule,
    SectionsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ProfileController, MyPostsController);
  }
}
