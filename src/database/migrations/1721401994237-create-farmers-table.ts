import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFarmersTable1721401994237 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'farmers',
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
            name: 'city_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'state_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
          {
            name: 'document',
            type: 'varchar',
            length: '14',
            comment: 'CNPJ or CPF',
            isNullable: false,
            isUnique: true,
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

    await queryRunner.createForeignKey(
      'farmers',
      new TableForeignKey({
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'farmers',
      new TableForeignKey({
        columnNames: ['state_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'states',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('farmers');
  }
}
