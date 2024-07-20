import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, QueryRunner, Repository } from 'typeorm';
import BaseService from '../common/base.service';
import { DomainRuleViolationException } from '../common/common.exceptions';
import { FarmerService } from '../farmer/farmer.service';
import { CityService } from '../localization/city.service';
import { FarmEntity } from './farm.entity';

@Injectable()
export class FarmService extends BaseService<FarmEntity> {
  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmRepository: Repository<FarmEntity>,
    private readonly farmerService: FarmerService,
    private readonly cityService: CityService,
  ) {
    super(farmRepository);
  }

  private async validateArableAndVegetableArea(
    totalHectaresArea: number,
    arableHectaresArea: number,
    vegetationHectaresArea: number,
  ) {
    if (totalHectaresArea <= 0) {
      throw new DomainRuleViolationException(
        'The total area cannot be negative or zero',
      );
    }

    if (arableHectaresArea <= 0 || vegetationHectaresArea <= 0) {
      throw new DomainRuleViolationException(
        'The arable and vegetation area cannot be negative or zero',
      );
    }

    if (arableHectaresArea > totalHectaresArea) {
      throw new DomainRuleViolationException(
        'The arable area cannot exceed the total area',
      );
    }

    if (vegetationHectaresArea > totalHectaresArea) {
      throw new DomainRuleViolationException(
        'The vegetation area cannot exceed the total area',
      );
    }

    const totalArableAndVegetableArea =
      arableHectaresArea + vegetationHectaresArea;
    if (totalArableAndVegetableArea > totalHectaresArea) {
      throw new DomainRuleViolationException(
        'The sum of arable and vegetable area should not exceed the total area',
      );
    }
  }

  public async validateAndGetCity(cityId: number) {
    const city = await this.cityService.findOneOrFail(cityId);

    return city;
  }

  public async storeWithValidation(
    item: DeepPartial<FarmEntity>,
  ): Promise<FarmEntity> {
    this.logger.log('Store with validation');

    const state = await this.validateAndGetCity(item.cityId);
    item.stateId = state.id;

    await this.farmerService.validateFarmerExists(item.farmerId);
    await this.validateArableAndVegetableArea(
      item.totalHectaresArea,
      item.arableHectaresArea,
      item.vegetationHectaresArea,
    );

    return await this.executeInTransaction(async (queryRunner: QueryRunner) => {
      return await queryRunner.manager.save(FarmEntity, item);
    });
  }

  public async updateWithValidation(
    id: number,
    item: Partial<FarmEntity>,
  ): Promise<FarmEntity> {
    this.logger.log('Update with validation');
    await this.farmerService.validateFarmerExists(item.farmerId);
    await this.validateArableAndVegetableArea(
      item.totalHectaresArea,
      item.arableHectaresArea,
      item.vegetationHectaresArea,
    );

    return await this.executeInTransaction(async (queryRunner: QueryRunner) => {
      await queryRunner.manager.update(FarmEntity, id, item);
      return await queryRunner.manager.findOne(FarmEntity, {
        where: { id },
      });
    });
  }
}
