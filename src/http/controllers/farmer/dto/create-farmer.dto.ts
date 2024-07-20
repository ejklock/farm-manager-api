import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ValidCpfOrCnpj } from 'src/domains/farmer/validator/valid-document.validator';
import { UniqueDocument } from 'src/domains/farmer/validator/valid-unique-document.validator';
import { ValidCity } from 'src/domains/localization/validators/valid-city.validator';

export class CreateFarmerDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the farmer',
    required: true,
    type: String,
  })
  name: string;

  @IsNotEmpty()
  @ValidCpfOrCnpj()
  @UniqueDocument()
  @ApiProperty({
    example: '58152474053',
    description:
      'The document of the farmer. Can be a valid CPF or CNPJ (11 or 14 digits) - Only numbers',
    required: true,
    type: String,
  })
  document: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'The id of the city',
    required: true,
    type: Number,
  })
  @ApiProperty({
    example: 1,
    description: 'The id of the city',
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @ValidCity()
  cityId: number;
}
