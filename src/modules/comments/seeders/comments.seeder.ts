import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CommentModel as Model } from '../models/comment.model';
import { UserModel } from '../../users/models/user.model';
import { PostModel } from '../../posts/models/post.model';
export class CommentsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    console.log('\n Seeding comments');
    if (process.env.APP_ENV !== 'production') {
      //////////////////////////////////////////// Delete all records and reset id then execute seeder
      await connection
        .getRepository(Model)
        .createQueryBuilder()
        .delete()
        .execute();
      await connection.manager.query(
        `ALTER TABLE comments AUTO_INCREMENT = 1;`,
      );
      ////////////////////////////////////////////
      const users = await connection.getRepository(UserModel).find();
      const posts = await connection.getRepository(PostModel).find();
      for (let i = 0; i < posts.length; i++) {
        for (let j = 0; j < users.length; j++) {
          await factory(Model)().createMany(1, {
            post: posts[i],
            user: users[j],
          });
        }
      }
    }
  }
}
