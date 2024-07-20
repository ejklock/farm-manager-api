import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FarmCultureModule } from 'src/domains/farm-culture/farm-culture.module';
import { FarmModule } from 'src/domains/farm/farm.module';
import { FarmerModule } from 'src/domains/farmer/farmer.module';
import { LocalizationModule } from 'src/domains/localization/localization.module';
import { ReportModule } from '../domains/report/report.module';
import { CityController } from './controllers/city/city.controller';
import { FarmCultureController } from './controllers/farm-culture/farm-culture.controller';
import { FarmController } from './controllers/farm/farm.controller';
import { FarmerController } from './controllers/farmer/farmer.controller';
import { ReportController } from './controllers/report/report.controller';
import { StateController } from './controllers/state/state.controller';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Module({
  imports: [
    ReportModule,
    FarmModule,
    FarmerModule,
    FarmCultureModule,
    LocalizationModule,
  ],
  controllers: [
    CityController,
    StateController,
    ReportController,
    FarmerController,
    FarmController,
    FarmCultureController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class HttpModule {}
