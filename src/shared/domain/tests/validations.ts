import { EntityValidationError } from '../errors/validation.error';
import ClassValidatorFields from '../validators/class-validator-fields';
import { FieldErrors } from '../validators/validator-fields-interface';

type Expected = { validator: ClassValidatorFields<any>, data: any; } | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldErrors) {
    if (typeof expected === 'function') {
      try {
        expected();
        return dataValid();
      } catch (ex) {
        const error = ex as EntityValidationError;
        return assertContainsErrorsMessages(received, error.error);
      }
    } else {
      const { validator, data } = expected;
      const isValid = validator.validate(data);
      if (isValid) {
        return dataValid();
      }
      return assertContainsErrorsMessages(received, validator.errors);
    }
  }
});

function success() {
  return { pass: true, message: '' };
}

function dataValid() {
  return {
    pass: false,
    message: () => "Data is valid",
  };
}

function assertContainsErrorsMessages(received: FieldErrors, expected: FieldErrors) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);
  return isMatch ?
    success() :
    { pass: false, message: () => `The validator errors doesn't contain ${JSON.stringify(received)}. Current: ${JSON.stringify(expected)}` };
}