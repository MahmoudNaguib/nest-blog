import { Factory, Seeder } from 'typeorm-seeding';
import { UserModel } from '../models/user.model';
export class UsersSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(UserModel)().createMany(5);
  }
}
