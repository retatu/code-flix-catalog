import UniqueEntityId from '../../../shared/domain/unique-entity-id.vo';

export type CategoryProperties = {
  name: string,
  isActive?: boolean,
  description?: string,
  createdAt?: Date,
}

export class Category {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(public readonly props: CategoryProperties, uniqueEntityId?: UniqueEntityId) {
    this.uniqueEntityId = uniqueEntityId || new UniqueEntityId();
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
}