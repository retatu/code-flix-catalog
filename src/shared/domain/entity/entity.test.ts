
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";

type Props = {
  prop1: string
  prop2: number
}
class StubEntity extends Entity<Props>{

}
describe("Entity :: Unit Test", () => {
  describe("General Behavior", () => {
    it('Should set props and id', () => {
      const arrange = { prop1: 'teste', prop2: 10 }
      const entity = new StubEntity(arrange);
      expect(entity.props).toEqual(arrange);
      expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
      expect(entity.props).not.toBe(null);
    })
    it('Should accept a valid uuid', () => {
      const arrange = { prop1: 'teste', prop2: 10 }
      let entity = new StubEntity(arrange);
      expect(entity.props).toEqual(arrange);
      expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
      
      const uniqueEntityId = new UniqueEntityId();
      entity = new StubEntity(arrange, uniqueEntityId);
      expect(entity.props).toEqual(arrange);
      expect(entity.id).toEqual(uniqueEntityId.value);
      expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    })
    it('Should convert an entity to a JSON', () => {
      const arrange = { prop1: 'teste', prop2: 10 }    
      const uniqueEntityId = new UniqueEntityId();
      const entity = new StubEntity(arrange, uniqueEntityId);
      expect(entity.toJSON()).toStrictEqual({
        id: entity.id,
        ...arrange,
      });
    })
  });
});