import { getRandomString } from '../Helpers/Helpers';
const sharp = require('sharp');
const fs = require('fs');
export class ResizeImage {
  static resize(imgPath, dimensions = { large: '400x200', small: '200x100' }) {
    try {
      const fileName = getRandomString(25) + '.png';
      for (const [key, value] of Object.entries(dimensions)) {
        const dimensions = value.split('x');
        const path = 'public/uploads/' + key;
        const tempWidth = dimensions[0] != undefined ? dimensions[0] : 100;
        const width: number = +tempWidth;
        const tempHeight = dimensions[1] != undefined ? dimensions[1] : width;
        const height: number = +tempHeight;
        /////////
        fs.mkdir(path, { recursive: true }, (err) => {
          if (err) throw err;
        });
        sharp(imgPath)
          .resize({
            width: width,
            height: height,
            fit: sharp.fit.cover,
          })
          .png({ palette: true, compressionLevel: 8 })
          .toFile(path + '/' + fileName);
      }
      return fileName;
    } catch (e) {
      return 'Image cannot be resized';
    }
  }
}
