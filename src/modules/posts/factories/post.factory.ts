import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { PostModel as Model } from '../models/post.model';
import { ResizeImage } from '../../../helpers/ResizeImage';
import { getRandomInteger } from '../../../helpers/helpers';
define(Model, (faker: typeof Faker) => {
  const imageSizes = {
    large: '600x360',
    small: '200x150',
  };
  const imagePath =
    'public/assets/images/posts/' + getRandomInteger(1, 15) + '.png';
  const image = ResizeImage.resize(imagePath, imageSizes);
  const row = new Model();
  row.title = faker.lorem.sentence(getRandomInteger(5, 20));
  row.content = faker.lorem.paragraphs(getRandomInteger(5, 10));
  row.user = null;
  row.section = null;
  row.image = image;
  return row;
});
