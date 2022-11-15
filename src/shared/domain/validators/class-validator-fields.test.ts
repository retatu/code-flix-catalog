import ClassValidatorFields from './class-validator-fields';
import * as libClassValidator from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }> {

}
describe("ClassValidatorFields :: Unit Test", () => {
  describe("General Behavior", () => {
    it("should initialize errors and validatedData as null", () => {
      const validator = new StubClassValidatorFields();
      expect(validator.errors).toBeNull();
      expect(validator.validatedData).toBeNull();
    })
    it("should validate with errors", () => {
      const spy = jest.spyOn(libClassValidator, 'validateSync')
      spy.mockReturnValue([
        { property: 'field', constraints: { isRequired: 'error' } },
      ]);
      const validator = new StubClassValidatorFields();
      expect(validator.validate(null)).toBeFalsy();
      expect(validator.validatedData).toBeNull();
      expect(validator.errors).toStrictEqual({ field: ['error'] });
      expect(spy).toHaveBeenCalledTimes(1);
    })
    it("should validate without errors", () => {
      const spy = jest.spyOn(libClassValidator, 'validateSync')
      spy.mockReturnValue([]);
      const validator = new StubClassValidatorFields();
      expect(validator.validate({ field: 'value' })).toBeTruthy();
      expect(validator.validatedData).toStrictEqual({ field: 'value' });
      expect(validator.errors).toBeNull();
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });
})