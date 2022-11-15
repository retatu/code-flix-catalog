import Entity from '../entity/entity';
import NotFoundError from '../errors/not-found.error';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import { RepositoryInterface } from './repository-contracts';

export default abstract class InMemoryRepository<G extends Entity> implements RepositoryInterface<G> {
  items: G[] = [];

  async insert(entity: G): Promise<void> {
    this.items.push(entity);
  }
  async findById(id: string | UniqueEntityId): Promise<G> {
    const _id = `${id}`;
    return this._get(_id);
  }
  async findAll(): Promise<G[]> {
    return this.items;
  }
  async update(entity: G): Promise<void> {
    await this._get(entity.id);
    const indexFound = this.items.findIndex((item) => item.id === entity.id);
    this.items[indexFound] = entity;
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const indexFound = this.items.findIndex((item) => item.id === _id);
    this.items.splice(indexFound, 1);
  }

  protected async _get(id: string): Promise<G> {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundError(`Entity not found using id ${id}`);
    }
    return item;
  }

} 