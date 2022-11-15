import { ValidationError } from "../../../shared/domain/errors/validation.error";
import { Category } from "./category";

describe("Category :: Integration Test", () => {
  describe("Created method", () => {
    it("should throw when an invalid category is created using the name field", () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: ["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"]
      });
      expect(() => new Category({ name: undefined })).containsErrorMessages({
        name: ["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"]
      });
      expect(() => new Category({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"]
      });
      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: ["name must be a string", "name must be shorter than or equal to 255 characters"]
      });
      expect(() => new Category({ name: "t".repeat(256) })).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"]
      });
    });
    it("should thrown when an invalid category is created using the description field", () => {
      expect(() => new Category({ name: null, description: 5 as any })).containsErrorMessages({
        description: ["description must be a string"]
      });
    });
    it("should thrown when an invalid category is created using the isActive field", () => {
      expect(() => new Category({ name: null, isActive: 5 as any })).containsErrorMessages({
        isActive: ["isActive must be a boolean value"]
      });
    });
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
    });
  });
  describe("Update method", () => {
    it("should throw when an invalid category is update using the name field", () => {
      const category = new Category({ name: 'valid_name' });
      expect(() => category.update(null, null)).containsErrorMessages({
        name: ["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"]
      });
      expect(() => category.update(undefined, null)).containsErrorMessages({
        name: ["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"]
      });
      expect(() => category.update("", null)).containsErrorMessages({
        name: ["name should not be empty"]
      });
      expect(() => category.update(5 as any, null)).containsErrorMessages({
        name: ["name must be a string", "name must be shorter than or equal to 255 characters"]
      });
      expect(() => category.update("t".repeat(256), null)).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"]
      });
    });
    it("should throw when an invalid category is update using the description field", () => {
      const category = new Category({ name: 'valid_name' });
      expect(() => category.update('valid_name', 5 as any)).containsErrorMessages({
        description: ["description must be a string"]
      });
    });
    it("should not throw when a valid category is update using the name field", () => {
      const category = new Category({ name: 'valid_name' });
      expect(() => category.update('valid_name', null)).not.toThrow();
    });
    it("should not throw when a valid category is update using the description field", () => {
      const category = new Category({ name: 'valid_name' });
      expect(() => category.update('valid_name', 'valid_description')).not.toThrow();
    });
  });
});