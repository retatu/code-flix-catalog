export function deepFreeze<T>(obj: T){
  const propertyNames = Object.getOwnPropertyNames(obj);
  for (const name of propertyNames) {
    const value = obj[name as keyof T];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}