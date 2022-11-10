export default abstract class ValueObject<Value = any>{
  protected _value: Value;

  constructor(value: Value) {
    this._value = value;
  }
  get value() : Value{
    return this._value;
  }
  toString = () => {
    if (this._value === null || this._value === undefined) {
      return ""+this._value;
    } else if (typeof this._value === "object" && this._value.toString() === '[object Object]') {
      return JSON.stringify(this._value);
    }
    
    return this._value.toString();
  };
}