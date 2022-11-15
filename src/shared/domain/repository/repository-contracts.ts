import Entity from '../entity/entity';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';

export interface RepositoryInterface<G extends Entity> {
  insert(entity: G): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<G>;
  findAll(): Promise<G[]>;
  update(entity: G): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}