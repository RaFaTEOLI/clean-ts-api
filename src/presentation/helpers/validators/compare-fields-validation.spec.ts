import { InvalidParamError } from '../../errors';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare');
};

describe('Compare Fields Validation', () => {
  test('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'other_value',
    });
    expect(error).toEqual(new InvalidParamError('fieldToCompare'));
  });
});
