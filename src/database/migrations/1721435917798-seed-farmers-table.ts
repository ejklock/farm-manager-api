import { faker } from '@faker-js/faker';
import { FarmCultureEntity } from 'src/domains/farm-culture/farm-culture.entity';
import { CultureTypeEnum } from 'src/domains/farm-culture/farm-culture.types';
import { FarmEntity } from 'src/domains/farm/farm.entity';
import { FarmerEntity } from 'src/domains/farmer/farmer.entity';
import { In, MigrationInterface, QueryRunner } from 'typeorm';

export class SeedFarmersTable1721435917798 implements MigrationInterface {
  private buildFarms(farmers: Partial<FarmerEntity>[]) {
    return farmers.map((farmer) => {
      const totalHectaresArea = faker.number.float({
        min: 100,
        max: 10000,
        precision: 0.01,
      });
      const vegetationHectaresArea = faker.number.float({
        min: 1,
        max: totalHectaresArea / 2,
        precision: 0.01,
      });
      return {
        cityId: farmer.cityId,
        stateId: farmer.stateId,
        farmerId: farmer.id,
        name: faker.company.name(),
        totalHectaresArea,
        vegetationHectaresArea,
        arableHectaresArea: totalHectaresArea - vegetationHectaresArea,
      } as Partial<FarmEntity>;
    });
  }

  private buildFarmCultures(farms: Partial<FarmEntity>[]) {
    return farms.map((farm) => {
      return {
        type: faker.helpers.enumValue(CultureTypeEnum),
        farmId: farm.id,
      } as Partial<FarmCultureEntity>;
    });
  }
  public async up(queryRunner: QueryRunner): Promise<void> {
    let farmersIds: number[] = [];
    let farmsIds: number[] = [];
    let farmCultures: Partial<FarmCultureEntity>[] = [];
    let farmers: Partial<FarmerEntity>[] = [
      {
        cityId: 1,
        stateId: 1,
        name: 'João da Silva',
        document: '37248018074',
      },
      {
        cityId: 1,
        stateId: 1,
        name: 'Maria da Silva',
        document: '71398634077',
      },
      {
        cityId: 60,
        stateId: 2,
        name: 'João da Silva Júnior',
        document: '33333333333',
      },
      {
        cityId: 216,
        stateId: 5,
        name: 'Maria da Silva Filha',
        document: '44444444444',
      },
      {
        cityId: 469,
        stateId: 8,
        name: 'João da Silva Neto',
        document: '55555555555',
      },
    ];

    await queryRunner.manager.transaction(async (transactionalManager) => {
      const result = await transactionalManager
        .createQueryBuilder()
        .insert()
        .into(FarmerEntity)
        .values(farmers)
        .execute();

      farmersIds = result?.identifiers
        ?.filter((identifier) => identifier?.id)
        .map((identifier) => identifier?.id);
    });

    if (farmersIds.length > 0) {
      farmers = await queryRunner.manager.find(FarmerEntity, {
        where: { id: In(farmersIds) },
      });

      if (farmers.length > 0) {
        const farms = this.buildFarms(farmers);
        await queryRunner.manager.transaction(async (transactionalManager) => {
          const result = await transactionalManager
            .createQueryBuilder()
            .insert()
            .into(FarmEntity)
            .values(farms)
            .execute();
          if (result?.identifiers) {
            farmsIds = result?.identifiers
              ?.filter((identifier) => identifier?.id)
              .map((identifier) => identifier?.id);
          }
        });
      }
    }

    if (farmsIds.length > 0) {
      const farms = await queryRunner.manager.find(FarmEntity, {
        where: { id: In(farmsIds) },
      });

      if (farms.length > 0) {
        farmCultures = this.buildFarmCultures(farms);
        console.log(farmCultures);
        await queryRunner.manager.transaction(async (transactionalManager) => {
          await transactionalManager
            .createQueryBuilder()
            .insert()
            .into(FarmCultureEntity)
            .values(farmCultures)
            .execute();
        });
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM farmers');
    await queryRunner.query('DELETE FROM farms');
    await queryRunner.query('DELETE FROM farm_cultures');
  }
}
