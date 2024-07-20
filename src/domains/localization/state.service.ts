import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BaseService from '../common/base.service';
import { StateEntity } from './state.entity';

@Injectable()
export class StateService extends BaseService<StateEntity> {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {
    super(stateRepository);
  }
}
