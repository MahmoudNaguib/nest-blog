import * as bcrypt from 'bcrypt';

export async function generateToken(hash: string): Promise<string> {
  const token =
    (await bcrypt.hash(hash, process.env.HASH_SALT)) +
    (await bcrypt.hash(Math.random().toString(), process.env.HASH_SALT)) +
    (await bcrypt.hash(Date.now().toString(), process.env.HASH_SALT));
  return token;
}

export function getDate(field: Date): any {
  return field
    ? field.toJSON().slice(0, 10) + ' ' + field.toLocaleTimeString()
    : new Date().toJSON().slice(0, 10) + ' ' + new Date().toLocaleTimeString();
}
export async function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const hash = await bcrypt.hash(password, process.env.HASH_SALT);
  return hash == hashedPassword;
}

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
