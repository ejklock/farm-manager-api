import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { FarmerService } from '../farmer.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class ValidUniqueDocumentConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly farmerService: FarmerService) {}

  async validate(value: string) {
    return !(await this.farmerService.findByCpfOrCnpj(value));
  }

  defaultMessage() {
    return 'Farmer with this document already exists';
  }
}

export function UniqueDocument(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidUniqueDocumentConstraint,
    });
  };
}
