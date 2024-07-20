import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { CultureTypeEnum } from 'src/domains/farm-culture/farm-culture.types';
import { ValidFarm } from 'src/domains/farm/validators/valid-farm.validator';

export class CreateFarmCultureDto {
  @IsNumber()
  @ValidFarm()
  @ApiProperty({
    example: 1,
    description: 'The id of the farm',
    required: true,
    type: Number,
  })
  farmId: number;

  @IsEnum(CultureTypeEnum)
  @ApiProperty({
    example: 'COTTON',
    description: 'The type of culture: SOY, CORN, COTTON, COFFEE, SUGAR_CANE',
    required: true,
    type: String,
  })
  type: CultureTypeEnum;
}
