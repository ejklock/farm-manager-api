import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import dbPgConfig from '../db-pg.config';

@Injectable()
export class PostGreSqlDBConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(dbPgConfig.KEY)
    private config: ConfigType<typeof dbPgConfig>,
  ) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      database: this.config.database,
      host: this.config.host,
      autoLoadEntities: true,
      entities: this.config.entities,
      migrations: this.config.migrations,
      port: this.config.port,
      verboseRetryLog: true,
      logging: this.config.logging,
      username: this.config.username,
      password: this.config.password,
      synchronize: this.config.synchronize,
    };
  }
}
