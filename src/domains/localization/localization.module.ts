import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';
import { CityService } from './city.service';
import { StateEntity } from './state.entity';
import { StateService } from './state.service';
import { ValidCityConstraint } from './validators/valid-city.validator';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity, CityEntity])],
  controllers: [],
  providers: [StateService, CityService, ValidCityConstraint],
  exports: [StateService, CityService],
})
export class LocalizationModule {}
