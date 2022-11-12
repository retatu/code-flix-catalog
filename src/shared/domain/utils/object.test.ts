import { deepFreeze } from "./object";

describe("Object :: Unit Test", () => {
  describe("General Behavior", () => {
    it('Should be immutable object', () => {
      const str = deepFreeze('');
      expect(typeof str).toBe('string')
    })
    it('Should not freeze scalar values', () => {
      const str = deepFreeze('');
      expect(typeof str).toBe('string')

      const booleanFalse = deepFreeze(false);
      expect(typeof booleanFalse).toBe('boolean')
      expect(booleanFalse).toBe(false)
      const booleanTrue = deepFreeze(true);
      expect(typeof booleanTrue).toBe('boolean')
      expect(booleanTrue).toBe(true)

      const number = deepFreeze(5);
      expect(typeof number).toBe('number')
      expect(number).toBe(5)
    })
    it('Should freeze objects', () => {
      const obj = deepFreeze({ prop1: 'PROP1', deep: { prop2: 'PROP2', prop3: new Date() }});
      expect(() => {
        (obj as any).prop1 = 'erro';
      }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'")
      expect(() => {
        (obj as any).deep.prop2 = 'erro';
      }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'")
      expect(obj.deep.prop3).toBeInstanceOf(Date)
    })
  });
});