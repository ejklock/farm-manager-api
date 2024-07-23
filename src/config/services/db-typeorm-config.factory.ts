import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DBConfigFactory {
  static create(type: string): TypeOrmModuleOptions {
    switch (type) {
      case 'postgres':
        return this.createPostgres();
      case 'mysql':
        return this.createMysql();
      default:
        throw new Error('Invalid database type');
    }
  }

  private static buildTypeOrmOptions(
    type: 'postgres' | 'mysql',
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    migrations: string[],
    entities: string[],
    synchronize: boolean,
  ): TypeOrmModuleOptions {
    return {
      type,
      host,
      port,
      username,
      password,
      database,
      migrations,
      entities,
      synchronize,
    };
  }

  private static createPostgres(): TypeOrmModuleOptions {
    return this.buildTypeOrmOptions(
      'postgres',
      process.env.DATABASE_HOST,
      parseInt(process.env.DATABASE_PORT, 10) || 3306,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      process.env.DATABASE_NAME,
      [__dirname + '/../../database/migrations/*{.ts,.js}'],
      [__dirname + '/../../**/*.entity{.ts,.js}'],
      !!process.env.DATABASE_SYNCHRONIZE || false,
    );
  }

  private static createMysql(): TypeOrmModuleOptions {
    return this.buildTypeOrmOptions(
      'mysql',
      process.env.DATABASE_HOST,
      parseInt(process.env.DATABASE_PORT, 10) || 3306,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      process.env.DATABASE_NAME,
      [__dirname + '/../../database/migrations/*{.ts,.js}'],
      [__dirname + '/../../**/*.entity{.ts,.js}'],
      !!process.env.DATABASE_SYNCHRONIZE || false,
    );
  }
}
