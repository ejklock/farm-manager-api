import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ValidFarmer } from 'src/domains/farmer/validator/valid-farmer.validator';
import { ValidCity } from 'src/domains/localization/validators/valid-city.validator';

export class CreateFarmDto {
  @IsNumber()
  @ValidFarmer()
  @ApiProperty({
    example: 1,
    description: 'The id of the farmer',
    required: true,
    type: Number,
  })
  farmerId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The id of the city',
    required: true,
    type: Number,
  })
  @ValidCity()
  cityId: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'My farm',
    description: 'The name of the farm',
    required: true,
    type: String,
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    example: 100.4,
    description: 'The total hectares area of the farm',
    required: true,
    type: Number,
  })
  totalHectaresArea: number;

  @IsNumber()
  @ApiProperty({
    example: 50.3,
    description: 'The arable hectares area of the farm',
    required: true,
    type: Number,
  })
  arableHectaresArea: number;

  @IsNumber()
  @ApiProperty({
    example: 20.3,
    description: 'The vegetation hectares area of the farm',
    required: true,
    type: Number,
  })
  vegetationHectaresArea: number;
}
