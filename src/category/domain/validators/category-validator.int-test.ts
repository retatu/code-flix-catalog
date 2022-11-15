import CategoryValidatorFactory, { CategoryRules, CategoryValidator } from './category-validator'

describe("Category :: Integration Test", () => {
  let validator: CategoryValidator;
  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  })
  describe("General behavior", () => {
    test("Invalid cases for name field", () => {
      let isValid = validator.validate(null);
      expect(isValid).toBeFalsy();
      expect(validator.errors.name).toStrictEqual(["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"]);

      isValid = validator.validate({ name: '' });
      expect(isValid).toBeFalsy();
      expect(validator.errors.name).toStrictEqual(["name should not be empty"]);

      isValid = validator.validate({ name: 5 as any });
      expect(isValid).toBeFalsy();
      expect(validator.errors.name).toStrictEqual(["name must be a string", "name must be shorter than or equal to 255 characters"]);

      isValid = validator.validate({ name: ' '.repeat(256) });
      expect(isValid).toBeFalsy();
      expect(validator.errors.name).toStrictEqual(["name must be shorter than or equal to 255 characters"]);
    });
    test('valid cases field', () => {
      const arrange = [
        { name: "valid" },
        { name: 'valid', description: "" },
        { name: 'valid', description: null },
        { name: 'valid', description: undefined },
        { name: 'valid', description: "value" },
        { name: 'valid', isActive: true },
        { name: 'valid', isActive: false }
      ];
      arrange.forEach(item => {
        let isValid = validator.validate(item);
        expect(isValid).toBeTruthy();
        expect(validator.validatedData).toStrictEqual(new CategoryRules(item));
      });
    })
  });
});