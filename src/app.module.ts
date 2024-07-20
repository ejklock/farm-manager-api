import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import appConfig from './config/app.config';
import dbPgConfig from './config/db-pg.config';
import { PostGreSqlDBConfigService } from './config/services/PostGreSqlDBConfigService';
import storageConfig from './config/storage.config';
import { HttpModule } from './http/http.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api/v1',
        module: HttpModule,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/storage/'),
      serveRoot: '/storage/',
      serveStaticOptions: {
        index: false,
        maxAge: 31536000,
        extensions: ['jpg', 'jpeg', 'png', 'svg'],
      },
    }),
    ConfigModule.forRoot({
      load: [dbPgConfig, appConfig, storageConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostGreSqlDBConfigService,
      inject: [PostGreSqlDBConfigService],
    }),

    HttpModule,
    StorageModule,
  ],

  providers: [],
})
export class AppModule {}
