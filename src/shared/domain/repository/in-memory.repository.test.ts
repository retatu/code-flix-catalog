
import Entity from '../entity/entity';
import NotFoundError from '../errors/not-found.error';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import InMemoryRepository from './in-memory.repository';

type Props = {
  prop1: string;
  prop2: number;
};
class StubEntity extends Entity<Props>{ }
class StubInMemoryRepository extends InMemoryRepository<StubEntity>{ }
describe("InMemory :: Unit Test", () => {
  let entity: StubEntity;
  let repository: StubInMemoryRepository;
  beforeEach(() => {
    entity = new StubEntity({ prop1: 'Valid', prop2: 1 });
    repository = new StubInMemoryRepository();
  });
  describe("General Behavior", () => {
    it("Should insert a new entity", async () => {
      await repository.insert(entity);
      expect(repository.items[0].toJSON()).toStrictEqual(entity.toJSON());
    });
    it("Should throw when an id is not found on findById", async () => {
      expect(() => repository.findById('invalid_id')).rejects.toThrow(
        new NotFoundError('Entity not found using id invalid_id')
      );
      expect(() => repository.findById(new UniqueEntityId('97daa8ee-eb4f-46e6-b1ed-5be25b71d7a8'))).rejects.toThrow(
        new NotFoundError('Entity not found using id 97daa8ee-eb4f-46e6-b1ed-5be25b71d7a8')
      );
    });
    it("Should find when a correct id is provided", async () => {
      await repository.insert(entity);
      const foundEntity = await repository.findById(entity.id);
      expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());
      expect(foundEntity.id).toStrictEqual(entity.id);
    });
    it("Should return all entities", async () => {
      await repository.insert(entity);
      const entities = await repository.findAll();
      expect(entities).toStrictEqual([entity]);
    });
    it("Should throw when the entity doesn't exist on update", async () => {
      await repository.insert(entity);
      const otherEntity = new StubEntity({ prop1: 'Valid', prop2: 1 });
      expect(() => repository.update(otherEntity)).rejects.toThrow(
        new NotFoundError(`Entity not found using id ${otherEntity.id}`)
      );
    });
    it("Should update the entity exists", async () => {
      await repository.insert(entity);
      entity.props.prop1 = "ChangedValue";
      await repository.update(entity);

      expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });
    it("Should throw when an id is not found on delete", async () => {
      expect(() => repository.delete('invalid_id')).rejects.toThrow(
        new NotFoundError('Entity not found using id invalid_id')
      );
      expect(() => repository.delete(new UniqueEntityId('97daa8ee-eb4f-46e6-b1ed-5be25b71d7a8'))).rejects.toThrow(
        new NotFoundError('Entity not found using id 97daa8ee-eb4f-46e6-b1ed-5be25b71d7a8')
      );
    });
    it("Should delete when id is found", async () => {
      await repository.insert(entity);
      await repository.delete(entity.id);
      expect(repository.items).toHaveLength(0);

      await repository.insert(entity);
      await repository.delete(entity.uniqueEntityId);
      expect(repository.items).toHaveLength(0);
    });
  });
});