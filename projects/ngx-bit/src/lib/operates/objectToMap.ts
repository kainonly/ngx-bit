export function objectToMap<T>(object: T): Map<string, any> | boolean {
  const mapList: Map<any, any> = new Map();
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      mapList.set(key, object[key]);
    }
  }
  return mapList;
}
