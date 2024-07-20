import { Injectable } from '@nestjs/common';
import { FarmCultureEntity } from '../farm-culture/farm-culture.entity';
import { FarmEntity } from '../farm/farm.entity';
import { FarmService } from '../farm/farm.service';

@Injectable()
export class ReportService {
  public constructor(
    private readonly farmsService: FarmService,
    private readonly farmCulturesService: FarmService,
  ) {}

  public async getReport() {
    const totalOfFarms = await this.farmsService
      .getEntityManager()
      .getRepository(FarmEntity)
      .count();

    const totalOfFarmsHectares = await this.farmsService
      .getEntityManager()
      .getRepository(FarmEntity)
      .createQueryBuilder('farm')
      .addSelect('SUM(farm.totalHectaresArea)', 'farms_totalOfFarmsHectares')
      .groupBy('farm.id')
      .getOne();

    const totalFarmsByState = await this.farmsService
      .getEntityManager()
      .getRepository(FarmEntity)
      .createQueryBuilder('farm')
      .leftJoin('farm.state', 's')
      .select('COUNT(farm.id)', 'farms')
      .addSelect('s.name', 'state')
      .groupBy('s.name')
      .getRawMany();

    const totalFarmsByCity = await this.farmsService
      .getEntityManager()
      .getRepository(FarmEntity)
      .createQueryBuilder('farm')
      .leftJoin('farm.city', 'c')
      .select('COUNT(farm.id)', 'farms')
      .addSelect('c.name', 'city')
      .groupBy('city')
      .getRawMany();

    const culturesByType = await this.farmCulturesService
      .getEntityManager()
      .getRepository(FarmCultureEntity)
      .createQueryBuilder('fc')
      .select('COUNT(fc.id)', 'culturesCount')
      .addSelect('fc.type', 'cultureType')
      .groupBy('fc.type')
      .getRawMany();

    return {
      totalOfFarms,
      totalOfFarmsHectares: totalOfFarmsHectares.totalHectaresArea,
      totalFarmsByState,
      totalFarmsByCity,
      culturesByType,
    };
  }
}
