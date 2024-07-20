import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerModule } from '../farmer/farmer.module';
import { LocalizationModule } from '../localization/localization.module';
import { FarmEntity } from './farm.entity';
import { FarmService } from './farm.service';
import { ValidFarmConstraint } from './validators/valid-farm.validator';

@Module({
  providers: [FarmService, ValidFarmConstraint],
  imports: [
    TypeOrmModule.forFeature([FarmEntity]),
    FarmerModule,
    LocalizationModule,
  ],
  exports: [FarmService],
})
export class FarmModule {}
