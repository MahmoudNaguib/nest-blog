import { Factory, Seeder } from 'typeorm-seeding';
import { PostModel } from '../models/post.model';

export class PostsSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    console.log('posts seeedssssssssss');
    await factory(PostModel)().createMany(4);
  }
}
