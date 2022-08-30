import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class SectionsTable1635717573447 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sections',
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
            name: 'title',
            type: 'varchar',
            length: '200',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sections');
  }
}
