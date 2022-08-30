import { Factory, runSeeder, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UsersSeeder } from '../Modules/Users/Seeders/UsersSeeder';
import { SectionsSeeder } from '../Modules/Sections/Seeders/SectionsSeeder';
import { PostsSeeder } from '../Modules/Posts/Seeders/PostsSeeder';
import { CommentsSeeder } from '../Modules/Comments/Seeders/CommentsSeeder';

export class DatabaseSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await runSeeder(UsersSeeder);
    await runSeeder(SectionsSeeder);
    await runSeeder(PostsSeeder);
    await runSeeder(CommentsSeeder);
  }
}
