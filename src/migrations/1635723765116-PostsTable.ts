import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class PostsTable1635723765116 implements MigrationInterface {
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
      true,
    );
    await queryRunner.createIndices('posts', [
      new TableIndex({
        name: 'posts_user_id_index',
        columnNames: ['user_id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }
}