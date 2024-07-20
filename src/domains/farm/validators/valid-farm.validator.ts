import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { FarmService } from '../farm.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class ValidFarmConstraint implements ValidatorConstraintInterface {
  constructor(private readonly farmsService: FarmService) {}

  async validate(value: number) {
    return !!(await this.farmsService.findOneOrFail(value));
  }

  defaultMessage() {
    return 'Farm not found';
  }
}

export function ValidFarm(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidFarmConstraint,
    });
  };
}
