import ValidationError from "../../../shared/errors/validation.error";
import { Category } from "./category";

describe("Category :: Integration Test", () => {
  describe("Created method", () => {
    it("should throw when an invalid category is created using the name field", () => {
      expect(() => new Category({ name: null })).toThrow(new ValidationError('The name is required'));
      expect(() => new Category({ name: undefined })).toThrow(new ValidationError('The name is required'));
      expect(() => new Category({ name: "" })).toThrow(new ValidationError('The name is required'));
      expect(() => new Category({ name: 5 as any })).toThrow(new ValidationError('The name is not a string'));
      expect(() => new Category({ name: "t".repeat(256) })).toThrow(new ValidationError('The name must be less or equal than 255 characters'));
    })
    it("should thrown when an invalid category is created using the description field", () => {
      expect(() => new Category({ name: 'valid_name', description: 5 as any })).toThrow(new ValidationError('The description is not a string'));
    })
    it("should thrown when an invalid category is created using the isActive field", () => {
      expect(() => new Category({ name: 'valid_name', isActive: 5 as any })).toThrow(new ValidationError('The isActive is not a boolean'));
    })
    it('should not throw when a valid category is created using the name field', () => {
      expect(() => new Category({ name: 'valid_name' })).not.toThrow();
      expect(() => new Category({ name: 'valid_name', description: null })).not.toThrow();
      expect(() => new Category({ name: 'valid_name', description: undefined })).not.toThrow();
      expect(() => new Category({ name: 'valid_name', description: "" })).not.toThrow();
      expect(() => new Category({ name: 'valid_name', description: "valid_description" })).not.toThrow();
      expect(() => new Category({ name: 'valid_name', isActive: null })).not.toThrow();
      expect(() => new Category({ name: 'valid_name', isActive: undefined })).not.toThrow();
      expect(() => new Category({ name: 'valid_name', isActive: true })).not.toThrow();
      expect(() => new Category({ name: 'valid_name', isActive: false })).not.toThrow();
      expect(() => new Category({ name: "t".repeat(255) })).not.toThrow();
    })
  })
  describe("Update method", () => {
    it("should throw when an invalid category is update using the name field", () => {
      const category = new Category({ name: 'valid_name' });
      expect(() => category.update(null, null)).toThrow(new ValidationError('The name is required'));
      expect(() => category.update(undefined, null)).toThrow(new ValidationError('The name is required'));
      expect(() => category.update("", null)).toThrow(new ValidationError('The name is required'));
      expect(() => category.update(5 as any, null)).toThrow(new ValidationError('The name is not a string'));
      expect(() => category.update("t".repeat(256), null)).toThrow(new ValidationError('The name must be less or equal than 255 characters'));
    })
    it("should throw when an invalid category is update using the description field", () => {
      const category = new Category({ name: 'valid_name' });
      expect(() => category.update('valid_name', 5 as any)).toThrow(new ValidationError('The description is not a string'));
    })
    it("should not throw when a valid category is update using the name field", () => {
      const category = new Category({ name: 'valid_name' });
      expect(() => category.update('valid_name', null)).not.toThrow();
    })
    it("should not throw when a valid category is update using the description field", () => {
      const category = new Category({ name: 'valid_name' });
      expect(() => category.update('valid_name', 'valid_description')).not.toThrow();
    })
  })
})