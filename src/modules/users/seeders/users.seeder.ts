import { Factory, Seeder } from 'typeorm-seeding';
import { UserModel } from '../models/user.model';
export class UsersSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(UserModel)().create({
      name: 'user1',
      email: 'user1@demo.com',
      password: 'demo@12345',
    });
    await factory(UserModel)().createMany(4);
  }
}
