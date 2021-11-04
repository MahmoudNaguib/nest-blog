import * as bcrypt from 'bcrypt';

export function getDate(field: Date): any {
  return field
    ? field.toJSON().slice(0, 10) + ' ' + field.toLocaleTimeString()
    : new Date().toJSON().slice(0, 10) + ' ' + new Date().toLocaleTimeString();
}

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
