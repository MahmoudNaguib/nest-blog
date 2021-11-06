import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { PostModel as Model } from '../models/post.model';
import { getRandomInteger } from '../../../helpers/helpers';

define(Model, (faker: typeof Faker) => {
  const row = new Model();
  row.title = faker.lorem.sentence(getRandomInteger(5, 20));
  row.content = faker.lorem.paragraphs(getRandomInteger(5, 10));
  row.user = null;
  row.section = null;
  return row;
});
