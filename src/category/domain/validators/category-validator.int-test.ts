import CategoryValidatorFactory, { CategoryRules, CategoryValidator } from './category-validator';

describe("Category :: Integration Test", () => {
  let validator: CategoryValidator;
  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });
  describe("General behavior", () => {
    test("Invalid cases for name field", () => {
      expect({ validator, data: null }).containsErrorMessages({
        name: ["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"]
      });
      expect({ validator, data: { name: '' } }).containsErrorMessages({
        name: ["name should not be empty"]
      });
      expect({ validator, data: { name: 'a'.repeat(256) } }).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"]
      });
      expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
        name: ["name must be a string", "name must be shorter than or equal to 255 characters"]
      });
    });
    test("Invalid cases for description field", () => {
      expect({ validator, data: { description: 5 } }).containsErrorMessages({
        description: ["description must be a string"]
      });
    });
    test("Invalid cases for isActive field", () => {
      expect({ validator, data: { isActive: 0 } }).containsErrorMessages({
        isActive: ["isActive must be a boolean value"]
      });
      expect({ validator, data: { isActive: 1 } }).containsErrorMessages({
        isActive: ["isActive must be a boolean value"]
      });
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
    });
  });
});