import { Factory, runSeeder, Seeder } from 'typeorm-seeding';
import { UsersSeeder } from '../modules/users/seeders/users.seeder';
import { PostsSeeder } from '../modules/posts/seeders/posts.seeder';

export class DummySeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    console.log('\n Basic seeder');
    await runSeeder(UsersSeeder);
    await runSeeder(PostsSeeder);
  }
}
