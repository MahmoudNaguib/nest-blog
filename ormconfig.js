module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/src/Modules/**/Models/*.ts'],
  migrations: [__dirname + '/src/Modules/**/Migrations/*.ts'],
  factories: [__dirname + '/src/Modules/**/Factories/*.ts'],
  seeds: [
    __dirname + '/src/Seeders/DatabaseSeeder.ts',
  ],
};
