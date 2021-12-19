import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UsersTable1635717505920 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            length: '20',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '200',
            default: null,
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '200',
            default: null,
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '200',
            default: null,
            isNullable: true,
          },
          {
            name: 'token',
            type: 'varchar',
            length: '200',
            default: null,
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            length: '50',
            default: null,
            isNullable: true,
          },
          {
            name: 'created_at',
            length: '6',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP(6)',
            isNullable: true,
          },
          {
            name: 'updated_at',
            length: '6',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP(6)',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createIndices('users', [
      new TableIndex({
        name: 'users_email_index',
        columnNames: ['email'],
      }),
      new TableIndex({
        name: 'users_password_index',
        columnNames: ['password'],
      }),
      new TableIndex({
        name: 'users_token_index',
        columnNames: ['token'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
