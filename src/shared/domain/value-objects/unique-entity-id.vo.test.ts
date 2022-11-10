import InvalidUuidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

function spyOnValidate(){
  return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
}

describe("UniqueEntityId :: Unit Test", () => {
  describe("General Behavior", () => {
    const validadeSpy = spyOnValidate();
    // beforeEach(() => {
    //   jest.clearAllMocks();
    // });
    afterEach(() => {
      expect(validadeSpy).toHaveBeenCalled();
      expect(validadeSpy).toHaveBeenCalledTimes(1);
    })
    it("Should throw an error when uuid is invalid", () => {
      expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    });
    it("Should accept a uuid passed in constructor", () => {
      const uuid = "e8d6e33e-f3e1-4fb4-9173-ce3c9febc552";
      const uniqueEntityId = new UniqueEntityId(uuid);
      expect(uniqueEntityId.value).toBe(uuid);
    })
    it("Should accept a uuid passed in constructor", () => {
      const uniqueEntityId = new UniqueEntityId();
      expect(uuidValidate(uniqueEntityId.value)).toBeTruthy();
    })
  });
});