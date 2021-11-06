import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { SectionModel as Model } from '../models/section.model';
import { getRandomInteger } from '../../../helpers/helpers';

define(Model, (faker: typeof Faker) => {
  const row = new Model();
  row.title = 'Section ' + getRandomInteger(1, 100000);
  return row;
});
