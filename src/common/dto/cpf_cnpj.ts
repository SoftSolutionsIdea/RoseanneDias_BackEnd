import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: false })
class IsCPFOrCNPJConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return cpf.isValid(value) || cnpj.isValid(value);
  }

  defaultMessage() {
    return 'Invalid CPF or CNPJ';
  }
}

export function IsCPFOrCNPJ(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFOrCNPJConstraint,
    });
  };
}




