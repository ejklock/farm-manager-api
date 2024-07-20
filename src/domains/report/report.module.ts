import { Module } from '@nestjs/common';
import { FarmCultureModule } from '../farm-culture/farm-culture.module';
import { FarmModule } from '../farm/farm.module';
import { ReportService } from './report.service';

@Module({
  imports: [FarmModule, FarmCultureModule],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
