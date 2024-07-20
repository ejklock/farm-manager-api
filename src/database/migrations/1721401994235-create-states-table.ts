import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStatesTable1721401994235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'states',
        columns: [
          {
            name: 'id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ibge_code',
            type: 'varchar',
            length: '11',
            isUnique: true,
            isNullable: false,
          },

          {
            name: 'name',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
          {
            name: 'uf',
            type: 'varchar',
            isUnique: true,
            length: '2',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('states');
  }
}
