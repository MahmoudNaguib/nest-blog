import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { UserModel as Model } from '../models/user.model';
import { ResizeImage } from '../../../helpers/ResizeImage';
import { getRandomInteger } from '../../../helpers/helpers';
define(Model, (faker: typeof Faker) => {
  const imageSizes = {
    large: '300x300',
    small: '150x150',
  };
  const imagePath =
    'public/assets/images/users/' + getRandomInteger(1, 10) + '.png';
  const image = ResizeImage.resize(imagePath, imageSizes);
  const row = new Model();
  const email = faker.internet.email().toLowerCase();
  row.name = faker.name.findName();
  row.password = 'demo@12345';
  row.email = email;
  row.image = image;
  return row;
});
