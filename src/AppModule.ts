import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './Middlewares/AuthMiddleware';
import { ProfileController } from './Modules/Users/Controllers/ProfileController';
import { MyPostsController } from './Modules/Posts/Controllers/MyPostsController';
import { HomeModule } from './Modules/Home/HomeModule';
import { PostsModule } from './Modules/Posts/PostsModule';
import { UsersModule } from './Modules/Users/UsersModule';
import { SectionsModule } from './Modules/Sections/SectionsModule';
import { CommentsModule } from './Modules/Comments/CommentsModule';
import { CommentsController } from './Modules/Comments/Controllers/CommentsController';
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
    CommentsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'api/comments', method: RequestMethod.GET }) // exclude routes for listing comments
      .forRoutes(ProfileController, MyPostsController, CommentsController);
  }
}
