import * as bcrypt from 'bcrypt';

export function getDate(field: Date): any {
  return field
    ? field.toJSON().slice(0, 10) + ' ' + field.toLocaleTimeString()
    : new Date().toJSON().slice(0, 10) + ' ' + new Date().toLocaleTimeString();
}

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
