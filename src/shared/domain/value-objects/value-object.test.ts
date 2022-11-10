import ValueObject from "./value-object";

class StubValueObject extends ValueObject{

}

describe("ValueObject :: Unit Test", () => {
  describe("General Behavior", () => {
    it("Should set value", () => {
      let vo = new StubValueObject('Fake value');
      expect(vo.value).toEqual("Fake value");
      vo = new StubValueObject({ prop1: 'Value1' });
      expect(vo.value).toStrictEqual({ prop1: 'Value1' });

    })
  });
});