import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { UserModel as Model } from '../models/user.model';

define(Model, (faker: typeof Faker) => {
  const row = new Model();
  const email = faker.internet.email();
  row.name = faker.name.findName();
  row.password = 'demo@12345';
  row.email = email;
  return row;
});
