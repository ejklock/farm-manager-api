import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BaseService from '../common/base.service';
import { DomainRuleViolationException } from '../common/common.exceptions';
import { FarmerEntity } from './farmer.entity';

@Injectable()
export class FarmerService extends BaseService<FarmerEntity> {
  constructor(
    @InjectRepository(FarmerEntity)
    private readonly farmerRepository: Repository<FarmerEntity>,
  ) {
    super(farmerRepository);
  }

  public async validateFarmerExists(id: number): Promise<FarmerEntity> {
    const farmer = await this.findOneOrFail(id);
    if (!farmer) {
      throw new DomainRuleViolationException('Farmer not found');
    }
    return farmer;
  }

  public async findByCpfOrCnpj(document: string): Promise<FarmerEntity> {
    return this.farmerRepository
      .createQueryBuilder('farmer')
      .where('farmer.document = :document', { document })
      .getOne();
  }
}
