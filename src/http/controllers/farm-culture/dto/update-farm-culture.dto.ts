import { PartialType } from '@nestjs/swagger';
import { CreateFarmCultureDto } from './create-farm-culture.dto';

export class UpdateFarmCultureDto extends PartialType(CreateFarmCultureDto) {}
