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
export class ValidFarmerConstraint implements ValidatorConstraintInterface {
  constructor(private readonly farmerService: FarmerService) {}

  async validate(value: number) {
    return !!(await this.farmerService.findOneOrFail(value));
  }

  defaultMessage() {
    return 'Farmer not found';
  }
}

export function ValidFarmer(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidFarmerConstraint,
    });
  };
}
