import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { CommentModel as Model } from '../models/comment.model';
import { getRandomInteger } from '../../../helpers/helpers';

define(Model, (faker: typeof Faker) => {
  const row = new Model();
  row.content = faker.lorem.paragraphs(getRandomInteger(1, 2));
  row.user = null;
  row.post = null;
  return row;
});
