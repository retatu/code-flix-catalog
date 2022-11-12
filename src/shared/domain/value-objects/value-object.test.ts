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
    it('Should be immutable objects', () => {
      const obj = { prop1: 'PROP1', deep: { prop2: 'PROP2', prop3: new Date() }};
      const vo = new StubValueObject(obj);
      expect(() => {
        vo.value.prop1 = 'erro';
      }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'")
      expect(() => {
        vo.value.deep.prop2 = 'erro';
      }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'")
      expect(vo.value.deep.prop3).toBeInstanceOf(Date)
    })
  });
});