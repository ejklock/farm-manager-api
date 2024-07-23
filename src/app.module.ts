import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import { DbTypeOrmConfigService } from './config/services/db-typeorm-config.service';
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
      load: [dbConfig, appConfig, storageConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbTypeOrmConfigService,
      inject: [dbConfig.KEY],
    }),

    HttpModule,
    StorageModule,
  ],

  providers: [],
})
export class AppModule {}
