module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [__dirname + '/src/modules/**/migrations/*.ts'],
  seeds: [__dirname + '/src/modules/**/seeders/*.ts'],
  factories: [__dirname + '/src/modules/**/factories/*.ts'],
  entities: [__dirname + '/src/modules/**/models/*.ts'],
};
