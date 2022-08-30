import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { SectionModel as Model } from '../Models/SectionModel';
import { getRandomInteger } from '../../../Helpers/Helpers';

define(Model, (faker: typeof Faker) => {
  const row = new Model();
  row.title = 'Section ' + getRandomInteger(1, 100000);
  return row;
});
