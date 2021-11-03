import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { UserModel } from '../models/user.model';

define(UserModel, (faker: typeof Faker) => {
  const row = new UserModel();
  row.name = faker.name.findName();
  row.email = faker.internet.email();
  row.password = 'demo@12345';
  return row;
});
