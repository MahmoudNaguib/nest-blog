import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserModel as Model } from '../Models/UserModel';

export class UsersSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    console.log('\n Seeding Users');
    if (process.env.APP_ENV !== 'production') {
      //////////////////////////////////////////// Delete all records and reset id then execute seeder
      await connection
        .getRepository(Model)
        .createQueryBuilder()
        .delete()
        .execute();
      await connection.manager.query(`ALTER TABLE users AUTO_INCREMENT = 1;`);
      ////////////////////////////////////////////
      await factory(Model)().create({
        name: 'user1',
        email: 'user1@demo.com',
        password: 'demo@12345',
      });
      await factory(Model)().createMany(4);
    }
  }
}
