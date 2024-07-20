import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BaseService from '../common/base.service';
import { FarmCultureEntity } from './farm-culture.entity';

@Injectable()
export class FarmCultureService extends BaseService<FarmCultureEntity> {
  constructor(
    @InjectRepository(FarmCultureEntity)
    private readonly farmCultureRepository: Repository<FarmCultureEntity>,
  ) {
    super(farmCultureRepository);
  }
}
