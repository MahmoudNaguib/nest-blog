import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PostModel } from '../models/post.model';
import { UserModel } from '../../users/models/user.model';

export class PostsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    console.log('\n Seeding posts');
    if (process.env.APP_ENV !== 'production') {
      //////////////////////////////////////////// Delete all records and reset id then execute seeder
      await connection
        .getRepository(PostModel)
        .createQueryBuilder()
        .delete()
        .execute();
      await connection.manager.query(`ALTER TABLE posts AUTO_INCREMENT = 1;`);
      ////////////////////////////////////////////
      const users = await connection.getRepository(UserModel).find();
      for (let i = 0; i < users.length; i++) {
        await factory(PostModel)().createMany(2, { user: users[i] });
      }
    }
  }
}
