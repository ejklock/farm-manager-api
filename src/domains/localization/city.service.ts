import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BaseService from '../common/base.service';
import { CityEntity } from './city.entity';

@Injectable()
export class CityService extends BaseService<CityEntity> {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {
    super(cityRepository);
  }
}
