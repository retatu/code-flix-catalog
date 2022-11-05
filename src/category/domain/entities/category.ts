export type CategoryProperties = {
  name: string,
  isActive: boolean,
  description?: string,
  createdAt?: Date,
}

export class Category {
  constructor(public readonly props: CategoryProperties) { }

  get name() { return this.props.name }
  get isActive() { return this.props.isActive }
  get description() { return this.props.description }
  get createdAt() { return this.props.createdAt }
}