import ValidationError from "../errors/validation.error";
import ValidatorRules from "./validator-rules";

type Values = {
  value: any,
  property: string,
}

type ExpectedRules = {
  value: any,
  property: string,
  rule: keyof ValidatorRules,
  error: ValidationError
  args?: any[]
}

function assertInvalid(expectedRules: ExpectedRules) {
  expect(() => {
    rulRule(expectedRules);
  }).toThrow(
    expectedRules.error
  );
}
function assertValid(expectedRules: ExpectedRules) {
  expect(() => {
    rulRule(expectedRules);
  }).not.toThrow(
    expectedRules.error
  );
}

function rulRule({ value, property, rule, args = [] }: Omit<ExpectedRules, "error">) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule];
  method.apply(validator, args);
}

describe("ValidatorRules :: Unit Test", () => {
  describe("General Behavior", () => {
    test("Values Method", () => {
      const validatorRule = ValidatorRules.values('value', 'field');
      expect(validatorRule['value']).toBe('value')
      expect(validatorRule['property']).toBe('field')
    })
    test("Method required", () => {
      const error = new ValidationError('The field is required');
      let arrange: Values[] = [
        { value: '', property: 'field' },
        { value: undefined, property: 'field' },
        { value: null, property: 'field' }
      ]
      arrange.forEach((item) => {
        assertInvalid({ value: item.value, property: item.property, rule: 'required', error })
      })
      arrange = [
        { value: 'valid_field', property: 'field' },
        { value: 5, property: 'field' },
        { value: true, property: 'field' }
      ]
      arrange.forEach((item) => {
        assertValid({ value: item.value, property: item.property, rule: 'required', error })
      });
    })
    test("Method string", () => {
      const error = new ValidationError('The field is not a string');
      let arrange: Values[] = [
        { value: {}, property: 'field' },
        { value: 5, property: 'field' },
        { value: false, property: 'field' }
      ]
      arrange.forEach((item) => {
        assertInvalid({ value: item.value, property: item.property, rule: 'string', error })
      })
      arrange = [
        { value: 'valid_field', property: 'field' },
        { value: '', property: 'field' },
        { value: null, property: 'field' },
        { value: undefined, property: 'field' }
      ]
      arrange.forEach((item) => {
        assertValid({ value: item.value, property: item.property, rule: 'string', error })
      });
    });
    test("Method boolean", () => {
      const error = new ValidationError('The field is not a boolean');
      let arrange: Values[] = [
        { value: {}, property: 'field' },
        { value: 5, property: 'field' },
        { value: '', property: 'field' },
        { value: 'false', property: 'field' },
        { value: 'true', property: 'field' }
      ]
      arrange.forEach((item) => {
        assertInvalid({ value: item.value, property: item.property, rule: 'boolean', error })
      })
      arrange = [
        { value: true, property: 'field' },
        { value: false, property: 'field' },
        { value: null, property: 'field' },
        { value: undefined, property: 'field' }
      ]
      arrange.forEach((item) => {
        assertValid({ value: item.value, property: item.property, rule: 'boolean', error })
      });
    });
    test("Method maxLength", () => {
      const error = new ValidationError('The field must be less or equal than 5 characters');
      let arrange: Values[] = [
        { value: 'aaaaaa', property: 'field' }
      ]
      arrange.forEach((item) => {
        assertInvalid({ value: item.value, property: item.property, rule: 'maxLength', error, args: [5] })
      })
      arrange = [
        { value: 'aaaaa', property: 'field' },
        { value: null, property: 'field' },
        { value: undefined, property: 'field' }
      ]
      arrange.forEach((item) => {
        assertValid({ value: item.value, property: item.property, rule: 'maxLength', error, args: [5] })
      });
    });
    it('Should throw a validation error when combine two or more validation rules', () => {
      let validator = ValidatorRules.values(null, 'field')
      expect(() => validator.required().string().maxLength(1)).toThrow(
        new ValidationError('The field is required')
      )

      validator = ValidatorRules.values(5, 'field')
      expect(() => validator.required().string()).toThrow(
        new ValidationError('The field is not a string')
      )

      validator = ValidatorRules.values('aaaaaa', 'field')
      expect(() => validator.required().string().maxLength(5)).toThrow(
        new ValidationError('The field must be less or equal than 5 characters')
      )

      validator = ValidatorRules.values('null', 'field')
      expect(() => validator.required().boolean()).toThrow(
        new ValidationError('The field is not a boolean')
      )
    })
    it('Should valid when combine two or more validation rules', () => {
      expect.assertions(0);
      ValidatorRules.values(null, 'field').string().maxLength(1);
      ValidatorRules.values(undefined, 'field').string().maxLength(1);
      ValidatorRules.values('valid', 'field').required().string().maxLength(10);

      ValidatorRules.values(null, 'field').boolean();
      ValidatorRules.values(undefined, 'field').boolean();
      ValidatorRules.values(true, 'field').required().boolean();
      ValidatorRules.values(false, 'field').required().boolean();
    })
  });
});