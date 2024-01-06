import validator from 'validator';
import { EmailValidate } from '../../../presentation/protocols';

export class EmailValidatorAdapter implements EmailValidate {
  execute(email: string): boolean {
    return validator.isEmail(email);
  }
}
