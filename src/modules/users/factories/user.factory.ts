import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { UserModel } from '../models/user.model';

define(UserModel, (faker: typeof Faker) => {
  const row = new UserModel();
  const email = faker.internet.email();
  row.name = faker.name.findName();
  row.password = 'demo@12345';
  row.email = email;
  return row;
});
