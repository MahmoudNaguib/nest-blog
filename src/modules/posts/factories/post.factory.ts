import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { PostModel } from '../models/post.model';
import { getRandomInteger } from '../../../helpers/helpers';
import { getRepository } from 'typeorm';
import { UserModel } from '../../users/models/user.model';

define(PostModel, (faker: typeof Faker) => {
  const row = new PostModel();
  row.title = faker.lorem.sentence(getRandomInteger(5, 20));
  row.content = faker.lorem.paragraphs(getRandomInteger(5, 10));
  row.user = null;
  return row;
});
