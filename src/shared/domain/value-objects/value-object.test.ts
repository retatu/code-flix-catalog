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
    test("The method toString should return the values correctly", () => {
      const date = new Date();
      const arrange = [
        { received: { prop1: 'value' }, expected: JSON.stringify({ prop1: 'value' }) },
        { received: date, expected: date.toString() },
        { received: 'Fake value', expected: 'Fake value' },
        { received: null, expected: 'null' },
        { received: undefined, expected: 'undefined' },
        { received: 5, expected: '5' },
        { received: true, expected: 'true' },
        { received: false, expected: 'false' },
        { received: Number(7), expected: '7' },
      ];
      arrange.forEach((value) => {
        let vo = new StubValueObject(value.received);
        expect(`${vo}`).toEqual(value.expected);
      })
    })
  });
});