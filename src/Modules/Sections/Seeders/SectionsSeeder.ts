import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { SectionModel as Model } from '../Models/SectionModel';
export class SectionsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    console.log('\n Seeding sections');
    if (process.env.APP_ENV !== 'production') {
      //////////////////////////////////////////// Delete all records and reset id then execute seeder
      await connection
        .getRepository(Model)
        .createQueryBuilder()
        .delete()
        .execute();
      await connection.manager.query(
        `ALTER TABLE sections AUTO_INCREMENT = 1;`,
      );
      ////////////////////////////////////////////
      await factory(Model)().createMany(5);
    }
  }
}
