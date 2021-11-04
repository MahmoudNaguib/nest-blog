import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { PostModel } from '../models/post.model';
import { getRandomInteger } from '../../../helpers/helpers';

define(PostModel, (faker: typeof Faker) => {
  const row = new PostModel();
  row.title = faker.lorem.sentence(getRandomInteger(5, 20));
  row.content = faker.lorem.paragraphs(getRandomInteger(5, 10));
  return row;
});
