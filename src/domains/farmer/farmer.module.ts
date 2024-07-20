import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerEntity } from './farmer.entity';
import { FarmerService } from './farmer.service';
import { ValidFarmerConstraint } from './validator/valid-farmer.validator';
import { ValidUniqueDocumentConstraint } from './validator/valid-unique-document.validator';

@Module({
  imports: [TypeOrmModule.forFeature([FarmerEntity])],
  providers: [
    FarmerService,
    ValidFarmerConstraint,
    ValidUniqueDocumentConstraint,
  ],
  exports: [FarmerService],
})
export class FarmerModule {}
