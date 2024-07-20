import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmCultureController } from './../../http/controllers/farm-culture/farm-culture.controller';
import { FarmCultureEntity } from './farm-culture.entity';
import { FarmCultureService } from './farm-culture.service';

@Module({
  imports: [TypeOrmModule.forFeature([FarmCultureEntity])],
  controllers: [FarmCultureController],
  providers: [FarmCultureService],
  exports: [FarmCultureService],
})
export class FarmCultureModule {}
