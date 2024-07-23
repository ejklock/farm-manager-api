import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DBConfigFactory } from './services/db-typeorm-config.factory';

const envPathToLoad = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenvConfig({ path: envPathToLoad });

export const dbConfig = {
  type: process.env.DATABASE_DRIVER || 'postgres',
};

const db = DBConfigFactory.create(dbConfig.type);

export default registerAs(`db-${dbConfig.type}`, () => db);

export const connectionSource = new DataSource(db as DataSourceOptions);
