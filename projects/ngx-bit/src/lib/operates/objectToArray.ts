export function objectToArray<T>(object: T): any[] {
  const array = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      array.push({
        key: key,
        rows: object[key]
      });
    }
  }
  return array;
}
