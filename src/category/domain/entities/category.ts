import ValidatorRules from '../../../shared/validators/validator-rules';
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
    Category.validate(props);
    super(props, uniqueEntityId)
    this.description = this.props.description;
    this.isActive = this.props.isActive;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  static validate(props: Omit<CategoryProperties, 'id' | 'createdAt'>) {
    ValidatorRules.values(props.name, 'name').required().string()
    ValidatorRules.values(props.isActive, 'isActive').boolean()
    ValidatorRules.values(props.description, 'description').string()
  }

  update(name: string, description: string) {
    Category.validate({ name, description });
    this.props.name = name
    this.props.description = description;
  }
  active() {
    this.props.isActive = true;
  }
  deactive() {
    this.props.isActive = false;
  }

  get name() { return this.props.name }
  get isActive() { return this.props.isActive }
  get description() { return this.props.description }
  get createdAt() { return this.props.createdAt }

  private set description(value: string) {
    this.props.description = value ?? null;
  }
  private set isActive(value: boolean) {
    this.props.isActive = value ?? true;
  }
}