import Entity from '../../../shared/domain/entity/entity';
import UniqueEntityId from '../../../shared/domain/value-objects/unique-entity-id.vo';

export type CategoryProperties = {
  name: string,
  isActive?: boolean,
  description?: string,
  createdAt?: Date,
}

export class Category extends Entity<CategoryProperties>{
  constructor(public readonly props: CategoryProperties, uniqueEntityId?: UniqueEntityId) {
    super(props, uniqueEntityId)
    this.description = this.props.description;
    this.isActive = this.props.isActive;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name() { return this.props.name }
  get isActive() { return this.props.isActive }
  get description() { return this.props.description }
  get createdAt() { return this.props.createdAt }

  private set description(value: string){
    this.props.description = value ?? null;
  }
  private set isActive(value: boolean){
    this.props.isActive = value ?? true;
  }
  update(name: string, description: string) {
    this.props.name = name || this.name; // doesn't make sense having name null
    this.props.description = description;
  }
  active() {
    this.props.isActive = true;
  }
  deactive() {
    this.props.isActive = false;
  }
}