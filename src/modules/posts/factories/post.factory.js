import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { PostModel } from '../models/post.model';
import { getRandomInteger } from '../../../helpers/helpers';

define(PostModel, (faker: typeof Faker) => {
  const row = new PostModel();
  row.title = faker.lorem.sentence(getRandomInteger(10, 20));
  row.content = faker.lorem.paragraph(getRandomInteger(10, 20));
  return row;
});
