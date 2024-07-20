import { Injectable } from '@nestjs/common';
import { isCPFOrCNPJ } from 'brazilian-values';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class ValidDocumentConstraint implements ValidatorConstraintInterface {
  private message = 'Invalid document. Please provide a valid CPF or CNPJ';
  async validate(value: string) {
    const isCPF = /^\d{11}$/.test(value);
    const isCNPJ = /^\d{14}$/.test(value);

    if (!isCPF && !isCNPJ) {
      this.message =
        'Invalid document. Please provide a valid CPF or CNPJ with only numbers with 11 or 14 digits';
      return false;
    }

    return isCPFOrCNPJ(value);
  }

  defaultMessage() {
    return this.message;
  }
}

export function ValidCpfOrCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidDocumentConstraint,
    });
  };
}
