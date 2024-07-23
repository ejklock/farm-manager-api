import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dbConfig from '../db.config';
import { DBConfigFactory } from './db-typeorm-config.factory';

export class DbTypeOrmConfigService {
  constructor(
    @Inject(dbConfig.KEY)
    private config: ConfigType<typeof dbConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return DBConfigFactory.create(this.config.type);
  }
}
