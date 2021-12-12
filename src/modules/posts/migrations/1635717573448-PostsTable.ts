import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class PostsTable1635717573448 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posts',
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
            name: 'section_id',
            type: 'bigint',
            length: '20',
            default: null,
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'bigint',
            length: '20',
            default: null,
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '200',
            default: null,
            isNullable: true,
          },
          {
            name: 'content',
            type: 'mediumtext',
            default: null,
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
          },
          {
            name: 'updated_at',
            length: '6',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP(6)',
          },
        ],
      }),
    );

    await queryRunner.createIndices('posts', [
      new TableIndex({
        columnNames: ['user_id'],
      }),
      new TableIndex({
        columnNames: ['section_id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }
}
