import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFarmsTable1721402016900 implements MigrationInterface {
  name?: string;
  transaction?: boolean;
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'farms',
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
            name: 'farmer_id',
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
            name: 'total_hectares_area',
            type: 'decimal',
            precision: 10,
            unsigned: true,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'arable_hectares_area',
            type: 'decimal',
            precision: 10,
            unsigned: true,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'vegetation_hectares_area',
            type: 'decimal',
            unsigned: true,
            precision: 10,
            scale: 2,
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
    await queryRunner.createForeignKey(
      'farms',
      new TableForeignKey({
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'farms',
      new TableForeignKey({
        columnNames: ['state_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'states',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('farms');
  }
}
