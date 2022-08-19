import { MissingParamError } from '../../errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('Required Field Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field');
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('any_field'));
  });

  test('should return void if validation succeeds', () => {
    const sut = new RequiredFieldValidation('field');
    const error = sut.validate({ field: 'any_name' });
    expect(error).toBeFalsy();
  });
});
