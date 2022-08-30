import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CommentsTable1635717573450 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
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
            name: 'post_id',
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

    await queryRunner.createIndices('comments', [
      new TableIndex({
        columnNames: ['user_id'],
      }),
      new TableIndex({
        columnNames: ['post_id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comments');
  }
}
