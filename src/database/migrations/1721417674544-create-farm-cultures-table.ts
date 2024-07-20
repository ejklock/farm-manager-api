import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFarmCulturesTable1721417674544
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'farm_cultures',
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
            name: 'farm_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            isNullable: false,
            enum: ['SOY', 'CORN', 'COTTON', 'COFFEE', 'SUGAR_CANE'],
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
    await queryRunner.dropTable('farm_cultures');
  }
}
