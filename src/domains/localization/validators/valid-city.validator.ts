import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { CityService } from '../city.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class ValidCityConstraint implements ValidatorConstraintInterface {
  constructor(private readonly cityService: CityService) {}

  async validate(value: number) {
    return !!(await this.cityService.findOneOrFail(value));
  }

  defaultMessage() {
    return 'City not found';
  }
}

export function ValidCity(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidCityConstraint,
    });
  };
}
