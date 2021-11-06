import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PostModel as Model } from '../models/post.model';
import { UserModel } from '../../users/models/user.model';
import { SectionModel } from '../../sections/models/section.model';

export class PostsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    console.log('\n Seeding posts');
    if (process.env.APP_ENV !== 'production') {
      //////////////////////////////////////////// Delete all records and reset id then execute seeder
      await connection
        .getRepository(Model)
        .createQueryBuilder()
        .delete()
        .execute();
      await connection.manager.query(`ALTER TABLE posts AUTO_INCREMENT = 1;`);
      ////////////////////////////////////////////
      const users = await connection.getRepository(UserModel).find();
      const sections = await connection.getRepository(SectionModel).find();
      for (let i = 0; i < sections.length; i++) {
        for (let j = 0; j < users.length; j++) {
          await factory(Model)().createMany(1, {
            section: sections[i],
            user: users[j],
          });
        }
      }
    }
  }
}
