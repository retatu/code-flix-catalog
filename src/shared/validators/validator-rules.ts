import ValidationError from "shared/errors/validation.error";

export default class ValidatorRules {
  private constructor(private value: any, private property: string) {}
  
  static values(value: any, property: string): ValidatorRules {
    return new ValidatorRules(value, property);
  }

  required(): this{
    if ([null, undefined, ''].includes(this.value)) {
      throw new ValidationError(`The ${this.property} is required`);
    }
    return this;
  }

  string(): this{
    if (typeof this.value !== "string") {
      throw new ValidationError(`The ${this.property} is not a string`);
    }
    return this;
  }

  maxLength(max: number): this{
    if (this.value.length > max) {
      throw new ValidationError(`The ${this.property} must be less or equal than ${max} characters`);
    }
    return this;
  }
}